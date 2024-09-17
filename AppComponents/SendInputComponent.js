import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import React, { forwardRef } from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { color } from "./../config";

const SendInputComponent = ({
  placeholder,
  icon,
  style,
  sendOnPress,
  ...other
}) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons
        color="#696969"
        style={styles.icon}
        name={icon}
        size={24}
      />
      <TextInput
        multiline
        style={[styles.textarea]}
        placeholder={placeholder}
        {...other}
      />
      <TouchableWithoutFeedback onPress={sendOnPress}>
        <FontAwesome name="send" size={24} style={styles.sendIcon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SendInputComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textarea: {
    fontSize: 16,
    margin: 4,
    flex: 1,
  },
  icon: {
    marginLeft: 15,
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  sendIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 6,
    // backgroundColor: "#bbb",
    // padding: 8,
    // borderRadius: 24
  },
});
