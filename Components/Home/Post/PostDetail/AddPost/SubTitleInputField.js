import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { forwardRef } from "react";

const SubTitleInputField = forwardRef((props, ref) => {
  return (
    <TextInput
      placeholder="Sub Title ..."
      style={styles.textInput}
      multiline
      {...props}
      ref={ref}
    />
  );
});

export default SubTitleInputField;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    backgroundColor: "whitesmoke",
    fontWeight: "900",
  },
});
