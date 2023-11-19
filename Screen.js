import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Screen = (props) => {
  return (
    <View style = {styles.container}>
      {props.children}
    </View>
  )
}

export default Screen

const styles = StyleSheet.create({
    container:{
        marginTop:100
    }
})