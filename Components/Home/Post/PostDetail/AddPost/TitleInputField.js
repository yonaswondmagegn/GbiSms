import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { forwardRef } from "react";
import AppTextInput from "../../../../../AppComponents/AppTextInput";

const TitleInputField = forwardRef((props, ref) => {
  return (
    <TextInput
      placeholder="Untitled"
      style={styles.textInput}
      multiline
      maxLength={100}
      {...props}
      ref={ref}
    />
  );
});

export default TitleInputField;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 30,
    backgroundColor: "white",
    padding: 10,
  },
});
