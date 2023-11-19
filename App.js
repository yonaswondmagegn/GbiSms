import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Notification from './Components/Notification/Notification';
import { color } from './config';
import WellComeScreen from './Components/Auth/WellComeScreen';
import LoginScreen from './Components/Auth/LoginScreen';
import SignUpScreen from './Components/Auth/SignUpScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import  {MaterialCommunityIcons,Ionicons, MaterialIcons}from '@expo/vector-icons'



const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const TopTab = createMaterialTopTabNavigator()


const MainPageScreens = ()=>{
  return(
    <Tab.Navigator screenOptions={{tabBarShowLabel:false,headerShown:false}}>
    <Tab.Screen name = "mainHome" component = {Home} 
      options = {{
        tabBarIcon:({focused})=><MaterialCommunityIcons name='church' color={focused?color.activeGolden:color.darkGolden} size = {focused?30:20}  />,
  
        }} />
    <Tab.Screen name = "mainNotification" component = {Notification} 
    options = {{
        tabBarIcon:({focused})=><MaterialCommunityIcons name='bell' color={focused?color.activeGolden:color.darkGolden} size = {focused?30:20}  />,
        tabBarBadge:3

        }}  />
    <Tab.Screen name = "mainProfile" component = {Profile} 
     options = {{
        tabBarIcon:({focused})=><Ionicons name='person-sharp' color={focused?color.activeGolden:color.darkGolden} size = {focused?30:20}  />,
  
        }}  />
  </Tab.Navigator>
  )
}

const AuthTopNav = ()=>{
  return(
    <TopTab.Navigator style={{marginTop:24}} screenOptions={{tabBarLabelStyle:{color:color.darkGolden},tabBarIndicatorStyle:{backgroundColor:color.darkGolden}}}>
      <TopTab.Screen name = 'auth-toptab-signup' component={SignUpScreen} options={{title:"SignUp"}} />
      <TopTab.Screen name = 'auth-toptab-login' component={LoginScreen} options={{title:"LogIn"}} />
    </TopTab.Navigator>
  )
}

const AuthSceens = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name = 'wellcomeSceen' component={WellComeScreen} />
      <Stack.Screen name = 'auth-main-screen' component={AuthTopNav} />
    </Stack.Navigator>
  )
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = 'wellcome-main-container' component={AuthSceens} />
        <Stack.Screen name = 'main-page-container' component={MainPageScreens}  />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
