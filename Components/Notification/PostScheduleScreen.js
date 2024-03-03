import { StyleSheet, Text, View,TextInput,TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useInsertionEffect, useState } from 'react'
import { useRoute, useScrollToTop } from '@react-navigation/native'
import { color,baseUrl } from '../../config'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import ErrorText from '../../AppComponents/ErrorText'



const PostScheduleScreen = () => {
    const {params } = useRoute()
    const [inputValue,setInputValue] = useState()
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)


    const fechSchedules = async ()=>{
        if(!inputValue)return;
       
        let etDate = params.date.ethiopiandate
        const fechData = {
            sh_date:`${etDate[0]}-${etDate[1]}-${etDate[2]}`,
            discriptionText:inputValue,
        }


        let headers=  {
            'Authorization':`JWT ${params?.auth?.access}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }

        try {
            setError(false)
            setSuccess(false)
            setLoading(true)
            const result = await axios.post(`${baseUrl}/calenderschedule/`,fechData,{headers})
            setSuccess(true)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
            console.log('error')
        }
    }

  return (
    <View>
        {error && <ErrorText error='SomeThing Went Wrong Try Again...' />}
        {success && <Text style={{color:'green',fontSize:16}}>Scheduled successfully </Text>}
        {loading && <ActivityIndicator color={color.darkGolden} size={40} />}
        <TouchableOpacity
        onPress={fechSchedules}
         style={{
            padding:10,
            backgroundColor:color.darkGolden,
            width:100,
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            alignSelf:'flex-end'
        }}>
            <Text style = {{color:'white'}}>Add</Text>
        </TouchableOpacity>

      <TextInput 
      onChangeText={value=>setInputValue(value)}
      multiline  style={styles.input} />
    </View>
  )
}

export default PostScheduleScreen

const styles = StyleSheet.create({
    input:{
        backgroundColor:'white',
        margin:10,
        padding:5,
        fontSize:16,
        borderWidth:1,
        borderRadius:9
        

    }
})