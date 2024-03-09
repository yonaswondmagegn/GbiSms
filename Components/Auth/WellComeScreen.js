import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import { color } from "../../config";
import React, { useEffect, useRef } from "react";
import AppButton from "../../AppComponents/AppButton";
import { useNavigation } from "@react-navigation/native";
import * as Notification from "expo-notifications";

const WellComeScreen = ({ navigation }) => {
  // const navigation  = useNavigation()
  const notificationResponse = useRef();

  useEffect(() => {
    notificationResponse.current =
      Notification.addNotificationResponseReceivedListener((response) =>
        navigation.navigate("main-page-container", {
          screen: "mainHome",
          params: {
            screen: "main-post-page",
            params: {
              screen: "anouncement",
            },
          },
        })
      );
    return () => {
      Notification.removeNotificationSubscription(notificationResponse.current);
    };
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/lal.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.topCont}>
          <Image
            style={styles.logoImage}
            source={require("../../assets/wedeGubaie.png")}
          />
          <Text style={styles.davidMoto}>
            ወደ አግዚአብሄር ቤት አንሂድ ባሉኝ ጊዜ ደስ አለኝ።
          </Text>
          <Text style={styles.davidNum}>መዝ __፡__</Text>
        </View>
        <AppButton
          title="Sign Up"
          bgColor={color.smoke}
          onPress={() => navigation.navigate("main-page-container")}
        />
        <AppButton
          title="Login"
          bgColor={color.smoke}
          onPress={() =>
            navigation.navigate("auth-main-screen", {
              screen: "auth-toptab-login",
            })
          }
        />
      </ImageBackground>
      {false && <StatusBar />}
    </View>
  );
};

export default WellComeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  logoImage: {
    alignSelf: "center",
    marginTop: 100,
    width: 210,
    height: 200,
  },
  davidMoto: {
    alignSelf: "center",
    textAlign: "center",
    margin: 20,
    // color:color.darkGolden,
    color: "white",
    fontSize: 20,
  },
  davidNum: {
    alignSelf: "flex-end",
    marginRight: 30,
    // color:color.darkGolden,
    color: "white",
  },
  topCont: {
    flex: 1,
  },
});
