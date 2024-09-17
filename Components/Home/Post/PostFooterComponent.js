import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useAnimatedValue,
} from "react-native";
import React, { useContext } from "react";
import PostProfileComponent from "./PostProfileComponent";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { color } from "../../../config";
import DarkModeContext from "../../Context/DarkModeContext";
import { useNavigation } from "@react-navigation/native";

const PostFooterComponent = ({ post }) => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
  console.log(post.fragments[0].content);

  return (
    <View style={styles.postFooterContainer}>
      <PostProfileComponent profile={post.profile} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("clear-stack-navigation", {
            screen: "detail-post-page",
            params: { post },
          })
        }
      >
        <View style={styles.iconContainer}>
          <View style={styles.userResponse}>
            {post.liked ? (
              <AntDesign name="heart" color={color.activeGolden} size={20} />
            ) : (
              <AntDesign
                name="hearto"
                color={darkMode ? "white" : "black"}
                size={20}
              />
            )}
            <Text
              style={[
                styles.textStyle,
                { color: darkMode ? "white" : "black" },
              ]}
            >
              {post.number_of_likes}
            </Text>
          </View>
          <View style={styles.userResponse}>
            <Ionicons name="chatbubble" size={20} color={color.darkGolden} />
            <Text
              style={[
                styles.textStyle,
                { color: darkMode ? "white" : "black" },
              ]}
            >
              {post.number_of_comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostFooterComponent;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  postFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "100",
  },
  userResponse: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
