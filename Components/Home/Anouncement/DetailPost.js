import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DetailPost = ({ route }) => {
  const { item } = route.params;
  const navigate = useNavigation()

  return (
    <ScrollView style={styles.containerOne}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <Text numberOfLines={1} style={styles.titleText}>
            {item.title}
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              navigate.navigate("other-profile-page", { profile: item.user })
            }
          >
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: item.user.image }}
              />
              <View style={{marginLeft:10}}>

              <Text style={styles.profileNameText}>
                {item.user.user.username}
              </Text>
              {item.user.authority && <Text>{item.user.authority}</Text>}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Text style={{ color: "purple" }}>
        Comment and Replay Are Under development !1
      </Text>
    </ScrollView>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  containerOne: {
    marginTop: 15,
  },
  container: {
    backgroundColor: "white",
    marginHorizontal: 5,
    marginTop: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileNameText: {
    marginLeft: 10,
  },
  descriptionText: {
    marginLeft: 30,
    marginHorizontal: 30,
    fontSize: 13,
  },
  titleText: {
    // fontWeight:2
  },
});
