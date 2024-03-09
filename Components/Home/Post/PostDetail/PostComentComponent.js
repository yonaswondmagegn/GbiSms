import { StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import SendInputComponent from "../../../../AppComponents/SendInputComponent";
import axios from "axios";
import ErrorText from "../../../../AppComponents/ErrorText";
import AuthContext from "../../../Context/AuthContext";
import { baseUrl, color } from "../../../../config";

const PostComentComponent = ({ post, setComments }) => {
  const [commentText, setCommentText] = useState();
  const [onProgress, setOnProgress] = useState(false);
  const [error, setError] = useState(false);
  const { auth } = useContext(AuthContext);
  const [commentInputValue, setCommentInputValue] = useState("");

  const onSendHandler = async () => {
    if (!commentText) return;
    setError(false);
    setOnProgress(true);
    try {
      const result = await axios.post(`${baseUrl}/postcomment/`, {
        text: commentText,
        user: auth.id,
        post: post.id,
      });
      setComments((prev) => ({
        ...prev,
        results: [result.data, ...prev.results],
      }));
      setOnProgress(false);
      setCommentInputValue("");
    } catch (error) {
      setError(true);
      console.log(error);
      setOnProgress(false);
    }
  };

  return (
    <View style={styles.postCommentContainer}>
      <SendInputComponent
        name="comment"
        icon="comment"
        placeholder="Type Your Comment..."
        onChangeText={(value) => {
          setCommentInputValue(value);
          setCommentText(commentInputValue);
        }}
        sendOnPress={onSendHandler}
        value={commentInputValue}
      />
      {onProgress && <ActivityIndicator color={color.darkGolden} />}
      {error && <ErrorText error="SomeThing Went Wrong Try Again..." />}
    </View>
  );
};

export default PostComentComponent;

const styles = StyleSheet.create({
  postCommentContainer: {
    // borderTopColor: "#ccc",
    // borderTopWidth: 1,
    // marginVertical: 5,
    backgroundColor: "transparent",
  },
});
