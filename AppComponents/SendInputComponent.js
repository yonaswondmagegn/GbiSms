import { StyleSheet, Text, View,TextInput,ScrollView,TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons,AntDesign,FontAwesome } from '@expo/vector-icons'
import {color} from './../config'

const SendInputComponent = ({placeholder,icon,style,sendOnPress,...other}) => {
  return (

    <View style = {[styles.container,style]} >
        <MaterialCommunityIcons color="#696969" style ={styles.icon} name = {icon} size={24}/>
        <ScrollView style = {{}}>
            <TextInput 
            multiline  
            style ={[styles.textarea]} 
            placeholder={placeholder} {...other} />
        </ScrollView>
        <TouchableWithoutFeedback onPress={sendOnPress}>

            <FontAwesome name='send' size={24} style = {styles.sendIcon} />
        </TouchableWithoutFeedback>


    </View>
  )
}

export default SendInputComponent

const styles = StyleSheet.create({
    container:{
        backgroundColor:color.smoke,
        flexDirection:'row',
        margin:4,
        marginHorizontal:10,
        borderRadius:20
    },textarea:{
        fontSize:16,
        margin:4,
        flex:1,
        textAlignVertical:'top'
    },icon:{
        marginLeft:15,
        alignSelf:'flex-end',
        marginBottom:5
        
    },sendIcon:{
        alignSelf:'flex-end',
        marginRight:10,
        marginBottom:5
    }
})