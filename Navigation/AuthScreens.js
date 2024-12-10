import { Stack } from "./coreNavigator";
import WellComeScreen from "../Components/Auth/WellComeScreen";
import AuthTopNav from "./AuthTopNav";

const AuthSceens = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="wellcomeSceen" component={WellComeScreen} />
        <Stack.Screen name="auth-main-screen" component={AuthTopNav} />
      </Stack.Navigator>
    );
  };



export default AuthSceens;