import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import PostDetail from './Components/Home/Post/PostDetail/PostDetail'
import DarkModeContext from './Components/Context/DarkModeContext'
import { color } from './config'
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons'
import AddPost from './Components/Home/Post/PostDetail/AddPost/AddPost'

const Stack = createStackNavigator()

const ClearStackNavigation = () => {
  const {darkMode} = useContext(DarkModeContext)

  return (
    <Stack.Navigator> 
      <Stack.Screen name = "detail-post-page" component={PostDetail}
       options={{title:null,headerShown:false}} />
      <Stack.Screen name='addpost' component={AddPost} 
      options={{headerStyle:{
        height:30
      },title:'መተየቢያ.'}}
       />

    </Stack.Navigator>

   
  )
}

export default ClearStackNavigation

const styles = StyleSheet.create({})