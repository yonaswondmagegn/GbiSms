import { StyleSheet, Text, View,TouchableWithoutFeedback} from 'react-native'
import React, { useState } from 'react'
import AddToGroupComponent from './AddToGroupComponent';
import MessageSender from './MessageSender';
import { color,baseUrl } from '../../../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import * as Network from 'expo-network'

const DetailGroupScreen = ({route}) => {
    const {group }= route.params;
    const [netwrokError,setNetworkError] = useState()
    const [network,setNetwork] = useState()
    const [showAdd,setShowAdd] = useState()
    const [phoneNumbers,setPhoneNumbers] = useState()
    const [error,setError] = useState()

    // geting network status set networkerror if something Wrong happened
  
    const NetworkStatus  = async()=>{
      try {
        const result = await Network.getNetworkStateAsync()
        return result
      }
        catch (error) {
        setNetworkError(error)
      }
    }
  
  const setStorage = async (key,value)=>{
    try {
      value = JSON.stringify(value)
      AsyncStorage.setItem(key,value)
    } catch (error) {
      setError(error)
    }
  }

  const fechPhoneNumbers = async ()=>{
    try {
      const result = await axios.get(`${baseUrl}/phonenumber/?group=1`)
      if(result){
        if(result.data.length === 0)return;
        console.log(result.data,'result ')
        setStorage(`phoneNumber-group-${group.id}`,result.data) 
        setPhoneNumbers(result.data)
      }
    } catch (error) {
      setError(error)
    }
  }

  const loadPhoneNumbers = async()=>{
    const result = await NetworkStatus()
    const inStorage = await AsyncStorage.getItem(`phoneNumber-group-${group.id}`)
    console.log(result)
    console.log(JSON.parse(inStorage),'storage')

    if(!result.isInternetReachable)return;
    if(inStorage)return;
    fechPhoneNumbers()
  }
  

  useEffect(()=>{
    loadPhoneNumbers()
  },[])

  return (
    <View style={styles.container}>
      <View style = {styles.groupInfoContainer}>
        <Text>{group.name}</Text>
        <View style = {{flexDirection:'row',marginLeft:20,gap:5}}>
          <Text>{group.numberOfMembers} members</Text>
          <TouchableWithoutFeedback>
            <Text style = {styles.listUpdateText}>1 to update</Text>
          </TouchableWithoutFeedback>
        </View>
          <Text>{group.description}</Text>
      </View>
        <TouchableWithoutFeedback onPress={()=>setShowAdd(prev=>!prev)}>
          <Text style = {{alignSelf:'flex-end',color:'blue',marginRight:10}}>{showAdd?"hide":"Add PhoneNumber"}</Text>
        </TouchableWithoutFeedback>
      {showAdd && <AddToGroupComponent />}
      <View style = {styles.messagesContainer}>
       
      </View>
      <MessageSender />


      
      
    </View>
  )
}

export default DetailGroupScreen

const styles = StyleSheet.create({
  container:{
    marginTop:50,
    flex:1,
  },listUpdateText:{
    backgroundColor:color.opasGolden,
    color:'blue',
    borderRadius:10,
    padding:2
  },messagesContainer:{
    flex:1,
    backgroundColor:'white'
    // height:100,
  }
})