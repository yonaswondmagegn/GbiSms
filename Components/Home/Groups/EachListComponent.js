import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { color } from "../../../config";
import { useNavigation } from "@react-navigation/native";

const EachListComponent = ({ group }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("group-detail-text-page", { group })}
    >
      <View style={styles.container}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.memberContainer}>
          <Text>{group.numberOfMembers} members</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EachListComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: color.darkSmoke,
    margin: 2,
    fontSize: 2,
  },
  groupName: {
    fontSize: 40,
    color: "white",
  },
  memberContainer: {
    alignSelf: "flex-end",
  },
});
