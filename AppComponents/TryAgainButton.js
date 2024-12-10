import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { color } from "../config";
import React from "react";

const TryAgainButton = ({ title, onpressHandler }) => {
  return (
    <TouchableOpacity onPress={onpressHandler}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TryAgainButton;

const styles = StyleSheet.create({
  text: {
    color: "white",
    backgroundColor: color.darkGolden,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    borderRadius: 5,
  },
});
