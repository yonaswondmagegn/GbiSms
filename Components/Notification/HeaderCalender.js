import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DarkModeContext from "../Context/DarkModeContext";

export const ethiopianMonths = {
  1: "መስከረም",
  2: "ጥቅምት",
  3: "ኅዳር",
  4: "ታኅሣሥ",
  5: "ጥር",
  6: "የካቲት",
  7: "መጋቢት",
  8: "ሚያዝያ",
  9: "ግንቦት",
  10: "ሰኔ",
  11: "ኃምሌ",
  12: "ነሐሴ",
  13: "ጳጉሜ", // Pagumē
};

const HeaderCalender = ({ year, month, setMonth, setYear }) => {
  const { darkMode } = useContext(DarkModeContext);

  const nextHandler = () => {
    setMonth((prev) => {
      if (prev == 13) {
        setYear((yearprev) => yearprev + 1);
        return 1;
      } else {
        return prev + 1;
      }
    });
  };

  const beforeHandler = () => {
    setMonth((prev) => {
      if (prev == 1) {
        setYear((yearprev) => yearprev - 1);
        return 13;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={beforeHandler}>
        <MaterialIcons
          name="navigate-before"
          size={50}
          color={darkMode ? "white" : "black"}
        />
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <Text style={{ color: darkMode ? "white" : "black" }}>
          {ethiopianMonths[month]} {year}
        </Text>
      </View>
      <TouchableOpacity onPress={nextHandler}>
        <MaterialIcons
          name="navigate-next"
          size={50}
          color={darkMode ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCalender;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
