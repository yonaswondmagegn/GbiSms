import { StyleSheet, Text, View } from "react-native";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import * as SecureStorage from "expo-secure-store";
import * as Device from "expo-device";
import * as Notification from "expo-notifications";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import AppNotification from "./Components/Notification/Notification";
import { baseUrl, color } from "./config";
import WellComeScreen from "./Components/Auth/WellComeScreen";
import LoginScreen from "./Components/Auth/LoginScreen";
import SignUpScreen from "./Components/Auth/SignUpScreen";
import ClearStackNavigation from "./ClearStackNavigation";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import NotificationContext from "./Components/Context/NotificationContext";

import DarkModeContext from "./Components/Context/DarkModeContext";
import AuthContext from "./Components/Context/AuthContext";
import axios from "axios";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const MainPageScreens = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? color.darkBackground : "white",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="mainHome"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="church"
              color={focused ? color.activeGolden : color.darkGolden}
              size={focused ? 30 : 20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="mainNotification"
        component={AppNotification}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bell"
              color={focused ? color.activeGolden : color.darkGolden}
              size={focused ? 30 : 20}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="mainProfile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-sharp"
              color={focused ? color.activeGolden : color.darkGolden}
              size={focused ? 30 : 20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthTopNav = () => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <TopTab.Navigator
      style={{ marginTop: 24 }}
      screenOptions={{
        tabBarLabelStyle: { color: color.darkGolden },
        tabBarIndicatorStyle: { backgroundColor: color.darkGolden },
      }}
    >
      <TopTab.Screen
        name="auth-toptab-signup"
        component={SignUpScreen}
        options={{ title: "SignUp" }}
      />
      <TopTab.Screen
        name="auth-toptab-login"
        component={LoginScreen}
        options={{ title: "LogIn" }}
      />
    </TopTab.Navigator>
  );
};

const AuthSceens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="wellcomeSceen" component={WellComeScreen} />
      <Stack.Screen name="auth-main-screen" component={AuthTopNav} />
    </Stack.Navigator>
  );
};

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
  const [authTookns, setAuthTookns] = useState(null);
  const [notificationToken, setNotificationToken] = useState();
  const notificationResponse = useRef();

  const getAuth = async () => {
    console.log("getaout runing on teh terminla [....");
    try {
      const authToken = await SecureStorage.getItemAsync("auth");
      if (authToken) {
        setAuthTookns(JSON.parse(authToken));
        let headers = {
          Authorization: `JWT ${JSON.parse(authToken).access}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const currentUserInfo = await axios.get(`${baseUrl}/auth/users/me/`, {
          headers,
        });
        setAuth(currentUserInfo.data);
        console.log(
          currentUserInfo.data,
          "statusdone done done done done done done *********"
        );
      }
    } catch (error) {
      console.log(error, "error authhhhhhhhhhhhhh");
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
    getAuth();
  }, []);

  useEffect(() => {
    console.log(notificationToken, authTookns);
  }, [notificationToken, auth]);

  return (
    <NavigationContainer>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <AuthContext.Provider value={{ auth, authTookns }}>
          <NotificationContext.Provider value={notificationToken}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="wellcome-main-container"
                component={AuthSceens}
              />
              <Stack.Screen
                name="main-page-container"
                component={MainPageScreens}
              />
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
