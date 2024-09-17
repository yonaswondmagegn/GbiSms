import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { baseUrl, color } from "../../../../config";
import DarkModeContext from "../../../Context/DarkModeContext";

import EachCommentComponent from "./EachCommentComponent";

const CommentListComponent = ({ post }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [comments, setComments] = useState();
  const [commentUrl, setcommentUrl] = useState(
    `${baseUrl}/postcomment/?ordering=-date&post=${post?.id}`
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const seeMoreHandler = () => {
    if (comments?.next) {
      setcommentUrl(comments?.next);
      console.log(commentUrl, "from click");
    }
  };

  useEffect(() => {
    fechCommentsHandler();
    console.log(comments?.next, "next url");
  }, [commentUrl]);

  return (
    <View>
      <FlatList
        data={comments?.results}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => <EachCommentComponent comment={item} />}
        ListHeaderComponent={() => (
          <>
            <Text
              style={{ color: darkMode ? "white" : "black", paddingBottom: 12 }}
            >
              Comments
            </Text>
          </>
        )}
        ListFooterComponent={() => (
          <>
            {comments?.next && (
              <TouchableOpacity
                style={styles.commentSeeMore}
                onPress={seeMoreHandler}
              >
                <Text style={[{ color: darkMode ? "white" : "black" }]}>
                  See More
                </Text>
              </TouchableOpacity>
            )}
            {loading && (
              <ActivityIndicator size={50} color={color.darkGolden} />
            )}
          </>
        )}
      />
    </View>
  );
};

export default CommentListComponent;

const styles = StyleSheet.create({
  commentSeeMore: {
    marginLeft: 12,
    marginVertical: 12,
  },
});
