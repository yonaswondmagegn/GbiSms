import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { toEthiopian, toGregorian } from "ethiopian-date";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl, color } from "../../config";
import * as Network from "expo-network";
import DaysCalender from "./DaysCalender";
import HeaderCalender from "./HeaderCalender";
import DarkModeContext from "../Context/DarkModeContext";

const Calender = () => {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [count, setCount] = useState(0);
  const [listOfDays, setListOfDays] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const fechSchedules = async () => {
    try {
      const result = await axios.get(`${baseUrl}/calenderschedule/`);
      if (result) {
        setSchedules(result.data);
        console.log(result.data, "schedule form fech ");
        try {
          await AsyncStorage.setItem("schedule", JSON.stringify(result.data));
        } catch (error) {
          setError("storage_set_error");
          console.log(4);
        }

        return result.data;
      }
    } catch (error) {
      setError("fech_error");
    }
  };

  const getFromStorage = async () => {
    try {
      const storageResult = await AsyncStorage.getItem("schedule");
      if (storageResult) {
        setSchedules(JSON.parse(storageResult));
        return JSON.parse(storageResult);
      }
    } catch (error) {
      setError("storage_get_error");
      console.log(2);
    }
  };

  const getScheduleData = async () => {
    getFromStorage();

    try {
      const netwrok = await Network.getNetworkStateAsync();
      console.log(netwrok.isConnected == true, "zomawa");
      if (netwrok.isConnected) {
        const result = await fechSchedules();
        return result;
      } else {
        if (schedules.length == 0) {
          console.log("error");
          const result = await getFromStorage();
          return result;
        }
      }
    } catch (error) {
      setError("get_schedule_fun");
      console.log(1);
    }
  };

  const listDaysInMonth = (year, month) => {
    if (!year || !month) return;
    let listofDaysInAmonth = [];
    for (i = 1; i <= 30; i++) {
      if (month == 13 && i > 6) break;
      let gregorianDate = toGregorian(year, month, i);
      let savedSchedule = schedules.filter(
        (schedule) => schedule.sh_date == `${year}-${month}-${i}`
      );
      if (savedSchedule.length > 0) {
        listofDaysInAmonth.push({
          ethiopiandate: [year, month, i],
          gregorianDate,
          schedule: savedSchedule,
        });
        console.log(savedSchedule, "saved schedule");
      } else {
        listofDaysInAmonth.push({
          ethiopiandate: [year, month, i],
          gregorianDate,
        });
      }
    }
    return listofDaysInAmonth;
  };

  useEffect(() => {
    const date = moment(new Date()).format("YYYY MM DD");

    let y = parseInt(date.slice(0, 5));
    let m = parseInt(date.slice(5, 7));

    let ethiopianDate = toEthiopian(y, m, 2);
    setYear(parseInt(ethiopianDate[0]));
    setMonth(parseInt(ethiopianDate[1]));

    console.log(year, month);

    getScheduleData();
    const getDataInterval = setInterval(() => {
      fechSchedules();
      console.log("helal");
    }, 60000);

    return () => {
      clearInterval(getDataInterval);
    };
  }, []);

  useEffect(() => {
    const ls = listDaysInMonth(year, month);
    setListOfDays(ls);
  }, [schedules, year, month]);

  const refreshHandler = () => {
    setRefreshing(true);
    getScheduleData();
    setRefreshing(false);
  };

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        backgroundColor: darkMode ? color.darkBackground : "red",
        padding: 1,
      }}
    >
      {listOfDays && (
        <FlatList
          data={listOfDays}
          numColumns={7}
          renderItem={({ item }) => <DaysCalender item={item} />}
          keyExtractor={(item) => item.ethiopiandate}
          refreshing={refreshing}
          style={{
            backgroundColor: darkMode ? color.darkBackground : "white",
            margin: 0,
          }}
          onRefresh={refreshHandler}
          ListHeaderComponent={() => (
            <>
              <HeaderCalender
                year={year}
                month={month}
                setMonth={setMonth}
                setYear={setYear}
              />
            </>
          )}
        />
      )}
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});
