import { StyleSheet, Text, View,Switch} from 'react-native'
import React, { useState } from 'react'
import Screen from '../../Screen'
import DarkModeSwitch from '../Settings/DarkModeSwitch'

const Profile = () => {
  const [isEnabled,setisEnabled] = useState(false)
  return (
    <Screen>
      
      <Text>Profile</Text>
      <DarkModeSwitch />
    </Screen>
  )
}

export default Profile

const styles = StyleSheet.create({})