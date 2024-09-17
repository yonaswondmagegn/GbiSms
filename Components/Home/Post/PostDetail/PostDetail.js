import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, color } from "../../../../config";
import DetailPostFooterComponent from "./DetailPostFooterComponent";
import DarkModeContext from "../../../Context/DarkModeContext";
import ErrorText from "../../../../AppComponents/ErrorText";
import TryAgainButton from "../../../Auth/TryAgainButton";
import CommentListComponent from "./CommentListComponent";
import PostComentComponent from "./PostComentComponent";

const EachFragment = ({ fragment }) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <View
      style={{ backgroundColor: darkMode ? color.darkBackground : "white" }}
    >
      {fragment.title && (
        <Text
          style={[
            styles.fragmentTitleText,
            { color: darkMode ? "white" : color.dark },
          ]}
        >
          {fragment.title}
        </Text>
      )}
      <Text
        style={[styles.contentText, { color: darkMode ? "white" : color.dark }]}
      >
        {fragment.content}
      </Text>
    </View>
  );
};

const PostDetail = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [fragments, setFragments] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const [post, setPost] = useState(route.params.post);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [comments, setComments] = useState();
  const [commentUrl, setcommentUrl] = useState(
    `${baseUrl}/postcomment/?ordering=-date&post=${post?.id}`
  );

  const fechCommentsHandler = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await axios.get(commentUrl);
      if (comments) {
        setComments((prev) => {
          let newComent = result.data;
          newComent.results = [...prev?.results, ...newComent.results];
          return newComent;
        });
      } else {
        setComments(result.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "coomnet error");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fechCommentsHandler();
    console.log(comments?.next, "next url");
  }, [commentUrl]);

  const fechFragment = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.get(`${baseUrl}/post/${post.id}/fragments/`);
      setFragments(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fechFragment();
  }, []);

  return (
    <View
      style={{
        backgroundColor: darkMode ? color.darkBackground : "white",
        flex: 1,
      }}
    >
      <View style={styles.postDetailsContainer}>
        <FlatList
          data={fragments}
          renderItem={({ item }) => <EachFragment fragment={item} />}
          keyExtractor={(item) => item?.id?.toString()}
          ListHeaderComponent={() => (
            <View style={styles.postDetailsHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View>
                  <Ionicons
                    name="arrow-back"
                    color={darkMode ? "white" : color.dark}
                    size={30}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  styles.postDetailTitle,
                  { color: darkMode ? "white" : color.dark },
                ]}
              >
                {post.title}
              </Text>
              {loading && (
                <ActivityIndicator size={50} color={color.darkGolden} />
              )}
              {error && (
                <>
                  <ErrorText error="Something Went Wrong Try Again..." />
                  <TryAgainButton fun={fechFragment} />
                </>
              )}
            </View>
          )}
          ListFooterComponent={() => (
            <>
              <DetailPostFooterComponent post={post} setPost={setPost} />
              <CommentListComponent post={post} setPost={setPost} />
            </>
          )}
        />
      </View>
      <PostComentComponent post={post} setComments={setComments} />
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  postDetailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  postDetailsHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  postDetailTitle: {
    fontSize: 24,
    fontWeight: 900,
  },
  contentText: {
    marginHorizontal: 6,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  },
  fragmentTitleText: {
    fontSize: 20,
    fontWeight: "900",
    marginTop: 24,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: color.darkGolden,
    paddingLeft: 8,
    marginLeft: 4,
  },
});
