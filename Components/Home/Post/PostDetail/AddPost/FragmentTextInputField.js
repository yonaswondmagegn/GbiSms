import { StyleSheet, Text, View,TextInput } from 'react-native'
import React, { forwardRef } from 'react'

const FragmentTextInputField = forwardRef((props,ref) => {
  return (
        <TextInput 
        placeholder='write hear..'
        multiline
        style = {styles.inputText}
        {...props}
        ref = {ref}
        />
  )
})

export default FragmentTextInputField

const styles = StyleSheet.create({
    inputText:{
        backgroundColor:'whitesmoke',
        fontSize:16,
        // paddingVertical:10
        paddingHorizontal:10
    }
})