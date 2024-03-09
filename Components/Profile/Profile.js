import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../../Screen";
import DarkModeSwitch from "../Settings/DarkModeSwitch";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../Context/AuthContext";
import { baseUrl, color } from "../../config";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ProfilePost from "./ProfilePost";

const Profile = () => {
  const [isEnabled, setisEnabled] = useState(false);
  const [profileData, setProfileData] = useState();
  const [profileError, setError] = useState(false);
  const { auth } = useContext(AuthContext);
  const [acadamic_year, setAcadamicYear] = useState();

  const fechProfile = async () => {
    try {
      const profile = await axios.get(`${baseUrl}/profile/${auth.id}/`);
      if (profile) {
        try {
          console.log(profile.data, "profile data");
          await AsyncStorage.setItem("profile", JSON.stringify(profile.data));
        } catch (error) {
          console.log("eror,found prfile");
          return error;
        }
      }
    } catch (error) {
      console.log("profile error found");
      setError(true);
      return error;
    }
  };

  const getProflieFromLocalStorage = async () => {
    try {
      const profile = await AsyncStorage.getItem("profile");
      if (profile) {
        console.log("runed");
        console.log(JSON.parse(profile));
        setProfileData(JSON.parse(profile));
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getProflieFromLocalStorage();
    fechProfile();
  }, []);

  useEffect(() => {
    if (!profileData) return;

    console.log(profileData, "profile");
    const AC_YEAR = {
      FR: "FRESH MAN",
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

      <View style={styles.profileDiscContainer}>
        <Text style={styles.usernameText}>
          {profileData?.user?.username} {profileData?.user?.last_name}
        </Text>
        <Text style={styles.profileAutority}>{profileData?.authority}</Text>
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
