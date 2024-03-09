import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { ethiopianMonths } from "./HeaderCalender";
import { color } from "../../config";
import AuthContext from "../Context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// {"day": {"ethiopiandate": [2016, 4, 3], "gregoria
// nDate": [2023, 12, 13], "schedule": [[Object]]}, "
// dayName": "ረቡዕ"}

function EachSchedule({ item }) {
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: "rgba(114, 206, 99, 0.51)",
        borderRadius: 10,
      }}
    >
      <Text>{item.discriptionText}</Text>
    </View>
  );
}

const DetailCalanderScreen = () => {
  const route = useRoute();
  const [lists, setLists] = useState([]);
  const date = route.params.day;
  const navigation = useNavigation();
  const { auth, authTookns } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const scheduleRenderHandler = () => {
    if (!date?.schedule) return;
    console.log(date.schedule, "scheduerl");
    let listsData = date.schedule.map((sch, index) => (
      <EachSchedule item={sch} key={index} />
    ));
    setLists(listsData);
  };

  useEffect(() => {
    console.log(route.params);
    scheduleRenderHandler();
  }, [route.params]);

  const handleRefresh = () => {
    setRefresh(true);
    console.log("geting it man");
    setRefresh(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
      }
    >
      <View>
        <View
          style={{
            backgroundColor: color.darkGolden,
            alignItems: "center",
            gap: 15,
            justifyContent: "space-around",
            paddingVertical: 50,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>
            {ethiopianMonths[parseInt(date.ethiopiandate[1])]}{" "}
            {date.ethiopiandate[2]} {date.ethiopiandate[0]}
          </Text>
          <Text style={{ color: "white", fontSize: 20 }}>
            {route.params.dayName}
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("clear-stack-navigation", {
              screen: "post-calender-screen",
              params: {
                date,
                auth: authTookns,
              },
            })
          }
        >
          <AntDesign
            name="plus"
            size={30}
            style={{ alignSelf: "flex-end", marginHorizontal: 20 }}
          />
        </TouchableWithoutFeedback>

        {lists}
      </View>
    </ScrollView>
  );
};

export default DetailCalanderScreen;

const styles = StyleSheet.create({});
