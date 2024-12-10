import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const PlaneButton = ({title,onPressHandler}) => {
  return (
    <TouchableOpacity onPress={onPressHandler}>
        <Text style={styles.btn}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PlaneButton

const styles = StyleSheet.create({
    btn:{
        alignSelf:'flex-end',
        marginRight:'25%',
        borderWidth:1,
        paddingHorizontal:5,
        borderRadius:4,
    }
})