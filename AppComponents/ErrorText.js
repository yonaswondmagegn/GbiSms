import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ErrorText = ({error}) => {
  return (
      <Text style = {{color:'red'}}>{error}</Text>
  )
}

export default ErrorText
