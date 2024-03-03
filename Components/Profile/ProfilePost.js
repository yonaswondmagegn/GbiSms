import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableWithoutFeedback,TouchableOpacity,RefreshControl} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl,color } from '../../config'
import EachPost from '../Home/Post/EachPost'
import DarkModeContext from '../Context/DarkModeContext'
import { createStackNavigator } from '@react-navigation/stack'
import ErrorText from '../../AppComponents/ErrorText'
import * as SecureStorage from 'expo-secure-store'
import TryAgainButton from '../Auth/TryAgainButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'

 const ProfilePost = ({footerFragemnt,profile})=>{
  const [post,setPost] = useState()
  const [error,setError] = useState()
  const [onLoad,setOnLoad] = useState(false)
  const [uri,setUri] = useState(`${baseUrl}/post/?author=${profile?.user?.id}&ordering=-id/`)
  const {darkMode} = useContext(DarkModeContext)
  const [auth,setAuth]  = useState()
  const [refresh,setRefresh] = useState(false)

  useEffect(()=>{
    console.log(profile,'profile')
  },[])

  const FechPost = async (fromRefresh)=>{
    // if(!profile)return;
    setOnLoad(true)
    let headers=  {
      'Authorization':`JWT ${auth?.access}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.get(fromRefresh?`${baseUrl}/post/?ordering=-id`:uri,{headers})
    
      if(!post || post?.results.length == 0 || fromRefresh){
        setPost(response.data)
        setOnLoad(false)
        setRefresh(false)
        return;
      }
      let newData = [...post?.results,...response.data.results]
      let updatedPost = response.data
      updatedPost.results = newData
      setPost(response.data)
      setRefresh(false)
      setError(false)
      setOnLoad(false)
      
      
    } catch (error) {
      setRefresh(false)
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
  },[auth,profile])

  const seeMoreHandler = ()=>{
    if (post?.next){
      setUri(post?.next)
    }
  }

  const onRefreshHandler = ()=>{
    setRefresh(true)
    FechPost("fromRefresh")
    setRefresh(false)
  }


  return(
    <View style = {{backgroundColor:darkMode?color.darkBackground:'white',}}>
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
          // refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>console.log('working')}/>}
          refreshing={refresh}
          onRefresh={onRefreshHandler}
          onEndReached={seeMoreHandler}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={footerFragemnt}
          ListFooterComponent={()=>(
            <>
             {onLoad && <ActivityIndicator size={50} color={color.activeGolden} />}
             {post?.next &&<TouchableWithoutFeedback onPress={seeMoreHandler}><Text style={{color:darkMode?'white':'black'}}>see More</Text></TouchableWithoutFeedback>}
            </>
          )}
        />

       
    </View>
   
   </View>
  )
}

const styles = StyleSheet.create({
  addIcon:{
    position:'absolute',
    bottom:0,
    right:0,
    margin:10
  }
})

export default ProfilePost