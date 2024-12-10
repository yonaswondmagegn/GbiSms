import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../../Screen";
import DarkModeSwitch from "../Settings/DarkModeSwitch";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import { baseUrl, color } from "../../config";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ProfilePost from "./ProfilePost";
import { useNavigation } from "@react-navigation/native";
import * as SecureStorage from "expo-secure-store";
import LogOutButton from "../../AppComponents/LogOutButton";
import AppButton from "../../AppComponents/AppButton";
import PlaneButton from "../../AppComponents/PlaneButton";

const Profile = () => {
  const [isEnabled, setisEnabled] = useState(false);
  const [profileError, setError] = useState(false);
  const { profile: profileData, setIsAuthenticated } = useContext(AuthContext);
  const [acadamic_year, setAcadamicYear] = useState();
  const [logOutError, setLogOutError] = useState();
  const navigate = useNavigation();

  const LogOutHandler = async () => {
    try {
      await SecureStorage.deleteItemAsync("auth");
      setIsAuthenticated(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    {
      console.log(profileData, "profil");
    }
    if (!profileData) return;

    console.log(profileData, "profile");
    const AC_YEAR = {
      FM: "FRESH MAN",
      SY: "SECOND YEAR",
      TY: "THERED YEAR",
      FY: "FOURTH YEAR",
      GC: "GC(FIVTH YEAR)",
    };
    const profileAcadamicYear = profileData?.acadamic_year;
    if (profileData?.acadamic_year != "ND") {
      setAcadamicYear(AC_YEAR[profileAcadamicYear]);
    }
  }, [profileData]);

  const footerFragemnt = (
    <View>
      <ImageBackground source={require("../../assets/pcback.jpg")}>
        <View style={{ height: 200 }}>
          <Image
            style={styles.profileImage}
            source={{ uri: profileData?.image }}
          />
        </View>
      </ImageBackground>

      <LogOutButton onPressHandler={LogOutHandler} />
      <PlaneButton
        onPressHandler={() =>
          navigate.navigate("clear-stack-navigation", {
            screen: "edit-profile-screen",
          })
        }
        title="Edit"
      />

      <View style={styles.profileDiscContainer}>
        <Text style={styles.usernameText}>
          {profileData?.user?.first_name} {profileData?.user?.last_name}
        </Text>
        <Text style={[styles.profileAutority,]}>{profileData?.authority}</Text>
        <View style = {[styles.acadamicStatusContainer,{marginBottom:10}]}>

          <Text style={{ color: color.darkGolden}}>Bio</Text>
          <Text style={{color:'white',marginLeft:15}}>{profileData.bio}</Text>
        </View>
        <View style={styles.acadamicStatusContainer}>
          <View style={styles.academicInfoCont}>
            <Ionicons name="school" color={color.darkGolden} size={24} />
            <Text style={{ color: color.darkGolden }}>የትምህርት ደረጃ</Text>
          </View>
          <Text style={{ color: "whitesmoke", marginLeft: 25 }}>
            {acadamic_year ? acadamic_year : "AcademicYear Not Found"}
          </Text>
          <Text style={{ color: "whitesmoke", marginLeft: 55 }}>
            {profileData?.major?.title
              ? profileData?.major?.title
              : "Department Not Found"}
          </Text>
        </View>
        <View style={styles.kiflatContainer}>
          <View style={{ flexDirection: "row", gap: 7 }}>
            <MaterialIcons color={color.darkGolden} size={24} name="groups" />
            <Text style={{ color: color.darkGolden }}>ክፍላት</Text>
          </View>
          {profileData?.groupNames?.length > 0 ? (
            profileData?.groupNames.map((name) => (
              <Text style={{ color: "whitesmoke", marginLeft: 30 }} key={name}>
                {" "}
                #{name}
              </Text>
            ))
          ) : (
            <Text style={{ color: "whitesmoke", marginLeft: 30 }}>
              # ክፍላት ዉስጥ አልተገኘም ።
            </Text>
          )}
        </View>
      </View>
    </View>
  );
  return (
    <>
      {profileData && (
        <ProfilePost footerFragemnt={footerFragemnt} profile={profileData} />
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 150,
    position: "absolute",
    borderWidth: 2,
    alignSelf: "flex-end",
    borderColor: color.darkGolden,
  },
  usernameText: {
    color: color.darkGolden,
    fontSize: 20,
  },
  profileDiscContainer: {
    marginLeft: 10,
  },
  profileAutority: {
    marginLeft: 20,
  },
  acadamicStatusContainer: {
    backgroundColor: "#3E3E3E",
    shadowOpacity: 10,
    width: "90%",
    padding: 10,
    borderRadius: 10,
  },
  academicInfoCont: {
    flexDirection: "row",
    gap: 6,
  },
  kiflatContainer: {
    backgroundColor: "#3E3E3E",
    shadowOpacity: 10,
    width: "90%",
    padding: 10,
    borderRadius: 10,
    marginTop: 7,
  },
});
