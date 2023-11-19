import { StyleSheet, Text, View,TouchableHighlight,TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import {color} from '../config'

const AppButton = ({title,bgColor,onPress}) => {
  return (
    <TouchableWithoutFeedback  onPress={onPress}>
      <View style ={[styles.container,{backgroundColor:bgColor}]}>

      <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default AppButton

const styles = StyleSheet.create({
  container:{
    margin:20,
    fontSize:25,
    padding:5,
    borderRadius:30
  },title:{
    color:color.darkGolden,
    fontSize:20,
    alignSelf:'center'
  }
})