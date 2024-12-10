import { StyleSheet, Text, View,TextInput} from 'react-native'
import React,{forwardRef} from 'react'
import { MaterialCommunityIcons,AntDesign,FontAwesome5 } from '@expo/vector-icons'
import {color} from './../config'

const RefAppTextInput = ({placeholder,icon,ant,style,chair,setAuthorityText,value,...other}) => {
  return (
    <View style = {[styles.container,style]} >
      {ant ?
        <AntDesign color="#696969" style ={styles.icon} name = {icon} size={24}/>:
        <MaterialCommunityIcons color="#696969" style ={styles.icon} name = {icon} size={24}/>
      }
      {chair && <FontAwesome5 color="#696969" style ={styles.icon} name = {chair} size={24} />}
      <TextInput
       onChangeText={value =>setAuthorityText(value)}
         style ={styles.textarea} placeholder={placeholder} value={value} {...other} />
    </View>
  )
}

export default RefAppTextInput

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
        flex:1
    },icon:{
        alignSelf:'center',
        marginLeft:15,
        
    }
})