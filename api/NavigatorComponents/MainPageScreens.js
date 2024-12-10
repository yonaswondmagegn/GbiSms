import { StyleSheet, Text, View } from "react-native";
import Home from "../Components/Home/Home";
import AppNotification from "../Components/Notification/Notification";
import Profile from "../Components/Profile/Profile";

import React from "react";

const MainPageScreens = () => {
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

export default MainPageScreens;
