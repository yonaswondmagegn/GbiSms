import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ShowPostScreen from './Anouncement/ShowPostScreen'
import GroupScreen from './Groups/GroupScreen'
import Navigation from '../Navigation/Navigation'
import {  color } from '../../config'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialCommunityIcons,Ionicons,MaterialIcons} from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import DetailPost from './Anouncement/DetailPost'
import OthersProfile from './Anouncement/OthersProfile'

const TopNav = createMaterialTopTabNavigator()
const Stack  = createStackNavigator()

const HomeTabNavigatorComponent = ()=>{
  return(
    <TopNav.Navigator screenOptions={{tabBarShowLabel:false,tabBarStyle:{backgroundColor:'#fff'},tabBarIndicatorStyle:{backgroundColor:'#8B1A10'}}}>
      <TopNav.Screen name = 'showPostScreen' component={ShowPostScreen} 
        options={{
          tabBarIcon:({focused})=><Ionicons name="md-newspaper-outline" size={24} color={focused?color.darkGolden:'black'} />}} />
      <TopNav.Screen name='groups' component={GroupScreen} 
        options={{
          tabBarIcon:({focused})=><MaterialIcons name="groups" size={24} color={focused?color.darkGolden:'black'} />}}/>
   </TopNav.Navigator>
   
  )
}

const Home = () => {
  return (
    <>
    <Navigation />
    <Stack.Navigator>
      <Stack.Screen name='main-post-page' component={HomeTabNavigatorComponent} options={{headerShown:false}} />
      <Stack.Screen name='main-detail-page' component={DetailPost} options={{ title:'',headerStyle:{height:0,backgroundColor:'red'}}}/>
      <Stack.Screen name = 'other-profile-page' component={OthersProfile} options={{ title:'',headerStyle:{height:0,backgroundColor:'red'}}}/>
    </Stack.Navigator>
     
    </>

  )
}

export default Home

const styles = StyleSheet.create({

})