import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { color } from "./../config";

const AppTextInput = ({ placeholder, icon, ant, style, ...other }) => {
  return (
    <View style={[styles.container, style]}>
      {ant ? (
        <AntDesign color="#696969" style={styles.icon} name={icon} size={24} />
      ) : (
        <MaterialCommunityIcons
          color="#696969"
          style={styles.icon}
          name={icon}
          size={24}
        />
      )}
      <TextInput style={styles.textarea} placeholder={placeholder} {...other} />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.smoke,
    flexDirection: "row",
    margin: 4,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  textarea: {
    fontSize: 16,
    margin: 4,
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 15,
  },
});
