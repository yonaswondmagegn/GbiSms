import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";

const SunMoonSwitch = () => {
  const [isSun, setIsSun] = useState(true);
  const rotation = new Animated.Value(isSun ? 0 : 180);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const handleToggle = () => {
    Animated.timing(rotation, {
      toValue: isSun ? 180 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => setIsSun(!isSun));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ rotate: rotateInterpolation }] },
          ]}
        >
          <Text style={styles.text}>{isSun ? "☀️" : "🌙"}</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={styles.text}>{isSun ? "Sun" : "Moon"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default SunMoonSwitch;
