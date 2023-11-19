import { StyleSheet, Text, View,TouchableHighlight } from 'react-native'
import React from 'react'

const SeeMoreButton = ({onPress}) => {
  return (
    <TouchableHighlight onPress={onPress}  >
      <Text style= {styles.seemoreBtn}>see more</Text>
    </TouchableHighlight>
  )
}

export default SeeMoreButton

const styles = StyleSheet.create({
    seemoreBtn:{
        color:'blue',
        marginLeft:'60%'
    }
})