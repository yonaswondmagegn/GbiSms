import { StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import PostFooterComponent from './PostFooterComponent'
import DarkModeContext from '../../Context/DarkModeContext'
import { useNavigation } from '@react-navigation/native'
import { color } from '../../../config'


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
      <View style = {[styles.container,{backgroundColor:darkMode?color.darkBackground :"#fff"}]} >
          <View style={styles.postContainerHeader}>
              <Text numberOfLines={3} style={[styles.titleText,{color:darkMode?"white":'black'}]}>{post.title}</Text>
              <Text style={{color:darkMode?"white":'black',fontSize:10, fontWeight: "100"}}>{formattedDate}</Text>
          </View>
          <Text numberOfLines={3} style={[styles.postExerpt, {color: darkMode ? "#ccc" : "#333"}]}>{post.fragments[0].content}</Text>
          <PostFooterComponent post={post} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container:{
        padding: 12,
        borderRadius:10,
        marginVertical: 6,
        marginHorizontal:10,
        gap: 12,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }, postContainerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }, titleText:{
        fontWeight:'bold',
    }, postExerpt: {
      fontWeight: "100"
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
