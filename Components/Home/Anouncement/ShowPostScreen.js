import { StyleSheet, Text, View,FlatList,Button,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import EachPost from './EachPost'
import { baseUrl } from '../../../config'
import axios from 'axios'
import SeeMoreButton from '../../../AppComponents/SeeMoreButton'

const ShowPostScreen = ({url}) => {
  const [messages,setMessages] = useState([])
  const [fechUrl,setFechUrl] = useState()

  useEffect(()=>{
    if(url){
      setFechUrl(url)
    }else{
      setFechUrl(`${baseUrl}/anouncementPost/`)
    }
  },[])

  useEffect(()=>{
    if(!fechUrl)return; 
    axios.get(fechUrl)
    .then(res=>{
      if(messages?.results?.length >0){
        let mesData = [...messages?.results,...res.data.results]
        let setData = res.data
        setData.results = mesData
        setMessages(setData)
        return
      }
      setMessages(res.data)
    })
    .catch(err=>console.log(err))
  },[fechUrl])

  const seeMoreHandler = ()=>{
    if(!messages?.next)return;
    setFechUrl(messages.next)
  }


  return (
      <>
        <FlatList
          data={messages?.results}
          renderItem={({item}) =><EachPost  item={item} url = {url?url:null} />}
          
          keyExtractor={item=>item?.id?.toString()}
          key={item=>item?.id}
        />
        <SeeMoreButton onPress={seeMoreHandler} />
     
      </>
  )
}

export default ShowPostScreen

const styles = StyleSheet.create({
  seemoreBtn:{
    width:20,
    backgroundColor:'red'
  }
})