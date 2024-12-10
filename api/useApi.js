import { requestRemindersPermissionsAsync } from 'expo-calendar'
import api from './api'
import { useState,useEffect } from 'react'

export  const useFechapi = ({url})=>{
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        FechData()
    },[])
    
    const FechData = async ()=>{
        if(!url){
            return error('Url is Rquaeried')
        }
        try {
            setIsLoading(true)
            const result = await api.get(url)
            if(result){
                setIsLoading(false)
                setData(result.data)
            }
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }

    }
    return {data,isLoading,error,FechData:refech}
}


export const usePostApi = ({url,pdata})=>{
    const [data,setData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    useEffect(()=>{
        postData()
    },[])
    
    const postData = async ()=>{
        if(!url ){
            return error('Url is Rquaeried')
        }else if(!pdata){
            return error('data is Requried')

        }
        try {
            setIsLoading(true)
            const result = await api.get(url,pdata)
            if(result){
                setIsLoading(false)
                setData(result.data)
            }
        } catch (error) {
            setIsLoading(false)
            setError(error)
        }
        
    }
    
    return {data,isLoading,error,postData}
}


