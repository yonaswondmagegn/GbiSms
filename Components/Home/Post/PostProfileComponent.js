import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useContext } from "react";
import DarkModeContext from "../../Context/DarkModeContext";
import { useNavigation } from "@react-navigation/native";

const PostProfileComponent = ({ profile }) => {
  const { darkMode } = useContext(DarkModeContext);
  const navigator = useNavigation();

  return (
    <TouchableHighlight
      onPress={() =>
        navigator.navigate("other-profile-page", { profile: profile })
      }
    >
      <View style={styles.profile_container}>
        {/* <Image style={{width:30,height:30,borderRadius:25,alignSelf:'center'}} source={{uri:`${profile.image}`}} /> */}
        <Text
          style={[styles.textStyle, { color: darkMode ? "white" : "black" }]}
        >
          By{" "}
        </Text>
        <View style={styles.profile_disc}>
          <Text
            style={[styles.textStyle, { color: darkMode ? "white" : "black" }]}
          >
            {profile.user.first_name
              ? profile.user.first_name
              : profile.user.username}
          </Text>
          {profile.authority && (
            <Text style={{ fontSize: 12, color: darkMode ? "white" : "black" }}>
              {profile.authority}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default PostProfileComponent;

const styles = StyleSheet.create({
  profile_container: {
    flexDirection: "row",
    // gap:5,
    alignItems: "center",
  },
  profile_disc: {
    flexDirection: "column",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "100",
  },
});

// "profile": {
//     "id": 18,
//     "major": null,
//     "user": {
//         "username": "yonas",
//         "first_name": "",
//         "last_name": "",
//         "phonenumber": "9999"
//     },
//     "authority": null,
//     "image": "/media/profile.jpg",
//     "aastu_id_main": null,
//     "aastu_id_year": null,
//     "acadamic_year": "NR",
//     "bio": "",
//     "date": "2023-12-09T19:03:36Z",
//     "group": [
//         1
//     ],
//     "groupNames": [
//         "batch"
//     ]
// }
