import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import PostDetail from "./Components/Home/Post/PostDetail/PostDetail";
import DarkModeContext from "./Components/Context/DarkModeContext";
import { color } from "./config";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AddPost from "./Components/Home/Post/PostDetail/AddPost/AddPost";
import DetailCalanderScreen from "./Components/Notification/DetailCalanderScreen";
import PostScheduleScreen from "./Components/Notification/PostScheduleScreen";

const Stack = createStackNavigator();

const ClearStackNavigation = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="detail-post-page"
        component={PostDetail}
        options={{ title: null, headerShown: false }}
      />
      <Stack.Screen
        name="addpost"
        component={AddPost}
        options={{
          headerStyle: {
            height: 30,
          },
          title: "መተየቢያ.",
        }}
      />
      <Stack.Screen
        name="detail-calender-screen"
        component={DetailCalanderScreen}
        options={{ title: "መርሐግብራት", headerTitleStyle: { fontSize: 16 } }}
      />
      <Stack.Screen
        name="post-calender-screen"
        component={PostScheduleScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default ClearStackNavigation;

const styles = StyleSheet.create({});
