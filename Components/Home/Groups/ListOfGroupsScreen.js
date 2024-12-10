import { StyleSheet, Text, View,FlatList } from 'react-native'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../../config'
import EachListComponent from './EachListComponent'


const ListOfGroupsScreen = () => {
    const [group,setGroup] = useState()
    const [error,setError] = useState()

    const getGroupsHandler = async ()=>{
     
        try {
            const result = await axios.get(`${baseUrl}/group/`)
            if(result){
                setGroup(result.data)
            }
        } catch (error) {
            setError(error)
        }
    }

    useEffect(()=>{
      getGroupsHandler()
      
    },[])
  return (
       <FlatList 
       data={group}
       renderItem={({item})=><EachListComponent group={item} />}
       keyExtractor={item =>item?.id?.toString()}
       key = {item=>item?.id}
       />
  )
}

export default ListOfGroupsScreen

const styles = StyleSheet.create({})