import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const Navigation = () => {
  return (
    <View style = {styles.container}>
        <Image source={require('../../assets/wedeGubaie.png')} style = {styles.logo} />
      <Text style = {styles.text}>ወደ ጉባኤ</Text>
    </View>
  )
}

export default Navigation

const styles = StyleSheet.create({
    container:{
        marginTop:30,
        paddingLeft:20,
        flexDirection:'row',
        alignItems:'center'

    },
    text:{
        fontSize:15,
        marginLeft:20,
    },
    logo:{
        width:30,
        height:30,
    }
})