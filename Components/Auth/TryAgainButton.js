import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { color } from '../../config'

const TryAgainButton = ({fun}) => {
  return (
    <TouchableOpacity onPress={fun}>
        <View style = {styles.container}>
            <Text style = {{color:'white',alignSelf:'center'}}>
                TryAgain
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default TryAgainButton

const styles = StyleSheet.create({
    container:{
        backgroundColor:color.darkGolden,
        padding:8,
        width:150,
        borderRadius:20,


    }
})