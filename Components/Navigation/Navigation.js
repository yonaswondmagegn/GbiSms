import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React, { useContext, useEffect } from "react";
import { color } from "../../config";
import DarkModeContext from "../Context/DarkModeContext";
import DarkModeSwitch from "../Settings/DarkModeSwitch";

const Navigation = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    console.log(darkMode);
  }, [darkMode]);

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: darkMode ? color.darkBackground : "white" },
      ]}
    >
      <View style={[styles.container]}>
        <Image
          source={require("../../assets/wedeGubaie.png")}
          style={[styles.logo]}
        />
        <Text style={[styles.text, { color: darkMode ? "white" : "black" }]}>
          ወደ ጉባኤ
        </Text>
      </View>
      <DarkModeSwitch />
      <StatusBar
        backgroundColor={darkMode ? color.darkBackground : "white"}
        barStyle={darkMode ? "light-content" : "dark-content"}
      />
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 0,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    marginLeft: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
});
