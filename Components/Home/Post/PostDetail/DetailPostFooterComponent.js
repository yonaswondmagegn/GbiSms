import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import PostProfileComponent from "../PostProfileComponent";
import { AntDesign } from "@expo/vector-icons";
import { color, baseUrl } from "../../../../config";
import DarkModeContext from "../../../Context/DarkModeContext";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import AuthContext from "../../../Context/AuthContext";

const DetailPostFooterComponent = ({ post, setPost }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [likeError, setLikeError] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getAuth = async () => {
      try {
        const authTokens = await SecureStorage.getItemAsync("auth");
        if (authTokens) {
          let headers = {
            Authorization: `JWT ${JSON.parse(authTokens).access}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          const currentUserInfo = await axios.get(`${baseUrl}/auth/users/me/`, {
            headers,
          });
          setUser(currentUserInfo.data);
        }
      } catch (error) {
        setLikeError(error);
      }
    };
    getAuth();
  }, []);

  const FechLike = async (auth) => {
    let headers = {
      Authorization: `JWT ${auth?.access}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (!post.liked) {
      try {
        const result = await axios.post(
          `${baseUrl}/postlike/`,
          {
            post: post.id,
            user: user.id,
          },
          { headers }
        );
        setPost((prev) => ({
          ...prev,
          liked: !prev.liked,
          number_of_likes: prev.number_of_likes + 1,
        }));
      } catch (error) {
        setLikeError(error);
      }
    } else {
      try {
        const result = await axios.get(
          `${baseUrl}/postlike/?ordering=-date&user=${user.id}&post=${post.id}`
        );
        if (result) {
          try {
            axios.put(
              `${baseUrl}/postlike/${result.data[0].id}/`,
              {
                un_liked: true,
                user: result.data[0].user,
                post: result.data[0].post,
              },
              { headers }
            );
            setPost((prev) => ({
              ...prev,
              liked: !prev.liked,
              number_of_likes: prev.number_of_likes - 1,
            }));
          } catch (error) {
            setLikeError(error);
          }
        }
      } catch (error) {
        setLikeError(error);
      }
    }
  };

  const likeClickHandler = async () => {
    try {
      const getauth = await SecureStorage.getItemAsync("auth");
      if (getauth) {
        let auth = JSON.parse(getauth);
        FechLike(auth);
      }
    } catch (error) {
      setLikeError(error);
    }
  };

  return (
    <View
      style={[
        styles.postFooterContainer,
        { backgroundColor: darkMode ? color.darkBackground : "white" },
      ]}
    >
      <PostProfileComponent profile={post.profile} />
      <View style={styles.iconContainer}>
        <View>
          <TouchableHighlight
            activeOpacity={0.3}
            underlayColor="rgba(255, 19, 0, 0.65)"
            onPress={likeClickHandler}
          >
            <>
              {post.liked ? (
                <AntDesign name="heart" color={color.activeGolden} size={20} />
              ) : (
                <AntDesign
                  name="hearto"
                  color={darkMode ? "white" : "black"}
                  size={20}
                />
              )}
            </>
          </TouchableHighlight>
          <Text
            style={[styles.textStyle, { color: darkMode ? "white" : "black" }]}
          >
            {post.number_of_likes}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DetailPostFooterComponent;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    gap: 15,
    marginRight: 50,
    alignSelf: "flex-end",
  },
  postFooterContainer: {
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-between",
    marginVertical: 10,
    borderTopColor: color.darkGolden,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  textStyle: {
    fontSize: 10,
    alignSelf: "center",
  },
});
