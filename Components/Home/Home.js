import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useContext } from 'react'

import ShowPostScreen from './Anouncement/ShowPostScreen'
import GroupScreen from './Groups/GroupScreen'
import Navigation from '../Navigation/Navigation'
import {  color } from '../../config'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Ionicons,MaterialIcons,FontAwesome6} from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import OthersProfile from './Anouncement/OthersProfile'
import Post from './Post/Post'



import DarkModeContext from '../Context/DarkModeContext'

const TopNav = createMaterialTopTabNavigator()
const Stack  = createStackNavigator()

const HomeTabNavigatorComponent = ()=>{
  const {darkMode} = useContext(DarkModeContext)
  return(
    <TopNav.Navigator screenOptions={{tabBarShowLabel:false,
      tabBarStyle:{backgroundColor:darkMode?color.darkBackground:'white'},tabBarIndicatorStyle:{backgroundColor:'#8B1A10'}}}>
      <TopNav.Screen name = 'showPostScreen' component={Post} 
        options={{
          tabBarIcon:({focused})=><FontAwesome6 name="newspaper" size={24} color={focused?color.darkGolden:(darkMode?color.smoke:"black")} />}} />
      <TopNav.Screen name='anouncement' component={ShowPostScreen} 
        options={{
          tabBarIcon:({focused})=>focused ?
          <Image style={{width:24,height:24}} source ={require("../../assets/announcement.png")}/>:
          (darkMode? <Image style={{width:24,height:24}} source ={require("../../assets/smokeanouncement.png")}/>: <Image style={{width:24,height:24}} source ={require("../../assets/blackanouncement.png")}/>)
         }}/>
      <TopNav.Screen name='groups' component={GroupScreen} 
        options={{
          tabBarIcon:({focused})=><MaterialIcons name="groups" size={24} color={focused?color.darkGolden:(darkMode?color.smoke:"black")} />}}/>
   </TopNav.Navigator>
   
  )
}

const Home = () => {
  return (
    <>
    <Navigation />
    <Stack.Navigator>
      <Stack.Screen name='main-post-page' component={HomeTabNavigatorComponent} options={{headerShown:false}} />
      <Stack.Screen name = 'other-profile-page' component={OthersProfile} options={{ title:'',headerStyle:{height:0,backgroundColor:'red'}}}/>
    </Stack.Navigator>
     
    </>

  )
}

export default Home

const styles = StyleSheet.create({

})