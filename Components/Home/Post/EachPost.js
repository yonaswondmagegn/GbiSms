import { StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PostFooterComponent from './PostFooterComponent'
import DarkModeContext from '../../Context/DarkModeContext'
import { color } from '../../../config'
import { useNavigation } from '@react-navigation/native'

const EachPost = ({post}) => {
  const {darkMode} = useContext(DarkModeContext)
  const [formattedDate,setFormatedData] = useState()
  const navigation = useNavigation()

  useEffect(()=>{
    const date = new Date(post.date)
    const fDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
    setFormatedData(fDate)
  },[])

    
  return (
    <TouchableWithoutFeedback onPress={()=>navigation.navigate("clear-stack-navigation",{screen:"detail-post-page",params:{post}})}>
      <View style = {[styles.container,{backgroundColor:darkMode?'rgba(31, 31, 31, 1)':"white"}]} >
        <Text numberOfLines={3} style={[styles.titleText,{color:darkMode?"white":'black'}]}>{post.title}</Text>
        <Text style={{color:darkMode?"white":'black',alignSelf:"flex-end",marginTop:20,fontSize:10}}>{formattedDate}</Text>
        <PostFooterComponent post={post} />
      </View>
      
    </TouchableWithoutFeedback>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.24)',
        padding:20,
        borderRadius:10,
        marginVertical:2,
        marginHorizontal:10,
    },titleText:{
        marginRight:60,
        marginLeft:10,
        fontWeight:'bold',

    }
})

// console.log(post.title,"title")
    // {
    //     "id": 1,
    //     "number_of_likes": 0,
    //     "liked": false,
    //     "number_of_comment": 1,
    //     "profile": "null",
    //     "title": "first post",
    //     "view": 0,
    //     "date": "2023-12-07T20:27:14.504247Z",
    //     "updated": "2023-12-07T20:27:14.504247Z",
    //     "author": 1,
    //     "fragments": [
    //         1