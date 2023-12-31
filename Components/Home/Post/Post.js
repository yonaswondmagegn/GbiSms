import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableWithoutFeedback,TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl, color } from '../../../config'
import EachPost from './EachPost'
import DarkModeContext from '../../Context/DarkModeContext'
import { createStackNavigator } from '@react-navigation/stack'
import AuthContext from '../../Context/AuthContext'
import ErrorText from '../../../AppComponents/ErrorText'
import * as SecureStorage from 'expo-secure-store'
import TryAgainButton from '../../Auth/TryAgainButton'
import AddPost from './PostDetail/AddPost/AddPost'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const MainPostScreen = ({navigation})=>{
  const [post,setPost] = useState()
  const [error,setError] = useState()
  const [onLoad,setOnLoad] = useState(false)
  const [uri,setUri] = useState(`${baseUrl}/post/?ordering=-id`)
  const {darkMode} = useContext(DarkModeContext)
  const [auth,setAuth]  = useState()

  const FechPost = async ()=>{
    setOnLoad(true)
    let headers=  {
      'Authorization':`JWT ${auth?.access}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.get(uri,{headers})
      if(!post || post?.results.length == 0){
        setPost(response.data)
        setOnLoad(false)
        return;
      }
      let newData = [...post?.results,...response.data.results]
      let updatedPost = response.data
      updatedPost.results = newData
      setPost(response.data)
      setError(false)
      setOnLoad(false)
      
      
    } catch (error) {
      setError('error message from the post')   
      setOnLoad(false)   
    }
  }


  const getAuthTooken = async ()=>{
    setError(false)
    try {
      const autha = await SecureStorage.getItemAsync('auth')
      if(autha){
        setAuth(JSON.parse(autha))
      }else{
        console.log('blue ring')
      }
    } catch (error) {
      setError(error)
      console.log('Dude Error')
    }
  }

  useEffect(()=>{
    getAuthTooken()
  },[uri])

  useEffect(()=>{
    if(auth){
      FechPost()
    }
  },[auth])

  const seeMoreHandler = ()=>{
    if (post?.next){
      setUri(post?.next)
    }
  }
  return(
    <View style = {{backgroundColor:darkMode?color.darkBackground:'white',flex:1}}>
      {error &&
      <>
      <TryAgainButton fun={getAuthTooken} />
       <ErrorText error="Something Went Wrong Try Again..." />
      </>
       }
      <View style={[{backgroundColor:darkMode?color.darkBackground:'#E7E7E7'},styles.mainContainer]} >
        <FlatList
          data={post?.results}
          renderItem={({ item }) => <EachPost post={item} />}
          keyExtractor={item => item?.id?.toString()}
        />

        {onLoad && <ActivityIndicator size={50} color={color.activeGolden} />}
        {post?.next &&<TouchableWithoutFeedback onPress={seeMoreHandler}><Text style={{color:darkMode?'white':'black'}}>see More</Text></TouchableWithoutFeedback>}
    </View>
    <TouchableOpacity
    style = {styles.addIcon} 
    onPress={()=>navigation.navigate('clear-stack-navigation',{screen:'addpost'})}>
        <MaterialCommunityIcons
         
          name='feather' size={50} 
          color={color.darkGolden} />
    </TouchableOpacity>
   </View>
  )
}

const Stack = createStackNavigator()


const Post = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name = "main-post-page" component={MainPostScreen} />
    </Stack.Navigator>
  )
}

export default Post

const styles = StyleSheet.create({
  addIcon:{
    position:'absolute',
    bottom:0,
    right:0,
    margin:10
  }
})