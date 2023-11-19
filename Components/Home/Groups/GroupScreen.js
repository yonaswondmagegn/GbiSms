import { StyleSheet, Text, View } from 'react-native'
import ListOfGroupsScreen from './ListOfGroupsScreen'
import DetailGroupScreen from './DetailGroupScreen'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
const GroupScreen = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name = 'group-main-list-view' component={ListOfGroupsScreen} options={{headerShown:false}}/>
      <Stack.Screen name='group-detail-text-page' component={DetailGroupScreen}  options={{title:'',headerStyle:{height:0}}}  />
    </Stack.Navigator>
  )
}

export default GroupScreen

const styles = StyleSheet.create({
  
})