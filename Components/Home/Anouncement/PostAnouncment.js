import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import api from "../../../api/api";
import TryAgainButton from "../../../AppComponents/TryAgainButton";
import AuthContext from "../../Context/AuthContext";
import { color } from "../../../config";

const PostAnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [success, setSuccess] = useState(false);
  const { profile } = useContext(AuthContext);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      const result = await api.get("group/");
      setGroups(result.data);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const postHandler = async () => {
    const data = {
      user: profile?.id,
      title,
      description,
      target_group:
        selectedGroup && selectedGroup.label !== "All"
          ? [selectedGroup.id]
          : groups.map((gr) => gr.id),
    };

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      const result = await api.post("anouncementPost/", data);
      setIsLoading(false);
      setSuccess(true);
      console.log("Result:", result.data);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <ActivityIndicator color={color.darkGolden} size={50} />}
      {success && <Text style={styles.successText}>Posted Successfully</Text>}
      <Text style={styles.label}>Title</Text>
      <TextInput
        multiline
        style={styles.inputText}
        onChangeText={(val) => setTitle(val)}
      />
      <Text style={styles.label}>Group</Text>
      {isLoading && <Text>Loading Group List...</Text>}
      {error && <TryAgainButton title="Try Again" onPressHandler={fetchGroups} />}
      <Picker
        selectedValue={selectedGroup}
        onValueChange={(value) => setSelectedGroup(value)}
        style={styles.picker}
      >
        <Picker.Item label="All" value={null} />
        {groups.map((gr) => (
          <Picker.Item key={gr.id} label={gr.name} value={gr} />
        ))}
      </Picker>
      <Text style={styles.label}>Description</Text>
      <TextInput
        multiline
        style={styles.inputText}
        onChangeText={(val) => setDescription(val)}
      />
      <TouchableOpacity onPress={postHandler}>
        <Text style={styles.postButton}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostAnouncement;



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    color: color.darkGolden,
    marginTop: 10,
  },
  inputText: {
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: color.darkGolden,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: "#fff",
    borderColor: color.darkGolden,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 20,
  },
  postButton: {
    backgroundColor: color.darkGolden,
    color: "#fff",
    alignSelf: "flex-end",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
  successText: {
    color: "green",
    fontSize: 18,
    marginBottom: 20,
  },
});

