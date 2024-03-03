import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../../config'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export const daysInAmharic = {
    Sun: 'እሑድ',
    Mon: 'ሰኞ',
    Tue: 'ማክሰኞ',
    Wed: 'ረቡዕ',
    Thu: 'ሐሙስ',
    Fri: 'አርብ',
    Sat: 'ቅዳሜ',
  };
  
const DaysCalender = ({item}) => {
    const [dayName,setDayName] = useState() 
    const navigation = useNavigation()

    useEffect(()=>{
        let date = item.gregorianDate
        const dateArray = date;
        const dateString = dateArray.join('-');
        const dayOfWeek = new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
        setDayName(daysInAmharic[dayOfWeek.toString().slice(0,3)])
    },[])
  return (

        <TouchableOpacity style = {[styles.container,{backgroundColor:(item?.schedule)?color.darkGolden:'white'}]}
        onPress={()=>navigation.navigate("clear-stack-navigation",{screen:'detail-calender-screen',params:{
            day:item,
            dayName,
       
            
        }})}
        >
            <>
            <Text>{item.ethiopiandate[2]}</Text>
            <Text style={{fontSize:7,fontWeight:'200'}}>{dayName}</Text>
            </>
        </TouchableOpacity>
  )
}

export default DaysCalender

const styles = StyleSheet.create({
    container:{
        width:'13.3%',
        height:55,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        margin:2
    }
})