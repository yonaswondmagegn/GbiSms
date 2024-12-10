import { StyleSheet, View, Text} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import * as SecureStorage from "expo-secure-store";
import * as Device from "expo-device";
import * as Notification from "expo-notifications";
import Constants from "expo-constants";
import { jwtDecode } from "jwt-decode";
import { decode,encode } from "base-64";
global.atob = decode
import api from "./api/api";

import { Tab, Stack, TopTab } from "./Navigation/coreNavigator";

import MainPageScreens from "./Navigation/MainPageScreens";
import AuthSceens from "./Navigation/AuthScreens";
import CustomLoadingScreen from "./AppComponents/CustomLoadingScreen";
import ClearStackNavigation from "./ClearStackNavigation";

import { NavigationContainer } from "@react-navigation/native";
import NotificationContext from "./Components/Context/NotificationContext";

import DarkModeContext from "./Components/Context/DarkModeContext";
import AuthContext from "./Components/Context/AuthContext";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState({ADF:'HELLOW MAN'});
  const [authTookns, setAuthTookns] = useState(null);
  const [notificationToken, setNotificationToken] = useState();
  const notificationResponse = useRef();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error, setError] = useState();
  const [isAdmin,setIsAdmin] = useState(false)

  const getProfile = async (acepted_access_token) => {
    let acess_token;
    if(acepted_access_token){
      acess_token = acepted_access_token
    }else{
      const token  = await SecureStorage.getItemAsync('auth')
      acess_token = JSON.parse(token).access;
    }
    
    const decodedJwt = jwtDecode(acess_token);
    const id = decodedJwt.user_id;
    try {
      const result = await api.get(`profile/?user=${id}`);
      setProfile(result.data[0]);
      console.log(result.data,'first profile')
    } catch (error) {
      setError(error);
      console.log(error,'proifle error')
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  ////////////////////////////////////////////////////////////////////////
  //////////////     refreshing the token   if THe Access Token Expired   //////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const refreshToken = async () => {
    const tokens = await SecureStorage.getItemAsync("auth");
    let parse_tokens = JSON.parse(tokens);
    const decoded_refresh_token = jwtDecode(parse_tokens.refresh);
    const current_date = Date.now() / 1000;
    if (decoded_refresh_token.exp > current_date) {
      try {
        const result_tokens = await api.post("auth/jwt/refresh/", {
          refresh: parse_tokens.refresh,
        });

        if (result_tokens) {
          parse_tokens.access = result_tokens.data.access;
          await SecureStorage.setItemAsync(
            "auth",
            JSON.stringify(parse_tokens)
          );
          const decoded_access_token = jwtDecode(parse_tokens)
          if(decoded_access_token.is_admin){
            setIsAdmin(true)
          }
          getProfile(result_tokens.data.access)
          setAuthTookns(parse_tokens);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }else{
      setIsAuthenticated(false)
    }
  };
  ////////////////////////////////////////////////////////////////////////
  //////////////     Cheking if The User iS AUTHENTICATED OR NOT          //////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  const checkAuthentication = async () => {
    try {
      const tokens = await SecureStorage.getItemAsync("auth");
      if (!tokens) {
        setIsAuthenticated(false)
        return;
      }
      const access_token = JSON.parse(tokens).access;
      console.log(access_token,'acessToken')
      const decoded_token = jwtDecode(access_token);
      const current_date = Date.now() / 1000;
      console.log(decoded_token.exp >current_date,'this is the result')
      if (decoded_token.exp > current_date) {
        if(decoded_token.is_admin){
          setIsAdmin(true)
        }
        getProfile(access_token)
        setIsAuthenticated(true);
      } else {
        refreshToken(access_token);
      }
    } catch (error) {
      console.log(error,'error')
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const notfi = async () => {
      let token;
      if (Device.isDevice) {
        try {
          const { status: existingStatus } =
            await Notification.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (finalStatus !== "granted") {
            const { status } = await Notification.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            return;
          }
          token = await Notification.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
          });
          setNotificationToken(token);
          return token;
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        return "Error Not Device";
      }
    };
    notfi();
  }, []);

  return (
    <NavigationContainer>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <AuthContext.Provider value={{ authTookns, profile,getProfile,setIsAuthenticated,isAdmin}}>
          <NotificationContext.Provider value={notificationToken}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isAuthenticated == null && <Stack.Screen
                name="load_authenticated_screen"
                component={CustomLoadingScreen}
              />}

              { isAuthenticated == false && <Stack.Screen
                name="wellcome-main-container"
                component={AuthSceens}
              />}

             {isAuthenticated == true && <Stack.Screen
                name="main-page-container"
                component={MainPageScreens}
              />}

              <Stack.Screen
                name="clear-stack-navigation"
                component={ClearStackNavigation}
              />
            </Stack.Navigator>
          </NotificationContext.Provider>
        </AuthContext.Provider>
      </DarkModeContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
