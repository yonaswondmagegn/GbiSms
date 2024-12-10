import { useContext } from "react";
import DarkModeContext from "../Components/Context/DarkModeContext";
import { TopTab } from "./coreNavigator";
import SignUpScreen from "../Components/Auth/SignUpScreen";
import LoginScreen from "../Components/Auth/LoginScreen";
import {color} from '../config'

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

  export default AuthTopNav