import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import DarkModeContext from "../Context/DarkModeContext";
import { color } from "../../config";
import { Feather, Entypo } from "@expo/vector-icons";

const DarkModeSwitch = () => {
  const [isEnabled, setEnable] = useState();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toogleHandler = () => {
    setEnable((prev) => !prev);
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    console.log(darkMode);
  }, [darkMode]);

  return (
    <TouchableOpacity onPress={toogleHandler}>
      {darkMode ? (
        <Entypo name="moon" color={color.darkGolden} size={30} />
      ) : (
        <Feather name="sun" color={color.darkGolden} size={30} />
      )}
    </TouchableOpacity>
  );
};

export default DarkModeSwitch;

const styles = StyleSheet.create({});
