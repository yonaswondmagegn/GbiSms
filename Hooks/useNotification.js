import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Notification from 'expo-notifications'
import * as Device from 'expo-device'
import Constants  from 'expo-constants'


const useNotification = async () => {

    let token;
    if(Device.isDevice){
        const {status:existingStatus} = await Notification.getPermissionsAsync()
        let finalStatus = existingStatus
        if(finalStatus !== "granted"){
            const {status} =  await Notification.requestPermissionsAsync()
            finalStatus = status
        }
        if(finalStatus !== "granted"){
            return
        }
        token = await Notification.getExpoPushTokenAsync({
            projectId:Constants.expoConfig.extra.eas.projectId,
        })
        return token.data
    }else{
        return "Error Not Device"
    }
    
}

export default useNotification

const styles = StyleSheet.create({})