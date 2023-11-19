import React,{useState} from "react";
import axios from "axios";
import { baseUrl } from "../../config";
import * as SecureStorage from 'expo-secure-store'
import { useNavigation } from "@react-navigation/native";


const useAuth = ()=>{
    const [error,setError] = useState()
    const navigation = useNavigation()

    const logIn = async (username,password)=>{
        if(!username || !password)return;
        try {
            const result = await axios.post(`${baseUrl}/auth/jwt/create/`,{
                username,
                password
            })
            console.log(result.data,'data')
            navigation.navigate('main-page-container')
            const auths = await SecureStorage.setItemAsync('auth',JSON.stringify(result.data))
        } catch (error) {
            setError(error)
            console.log(error,'error occured')

        }
    }

    const signup = async (username,password,first_name,last_name ,phonenumber)=>{
        try{
            const result = await axios.post(`${baseUrl}/auth/users/`,{
                username,
                first_name,
                last_name,
                phonenumber,
                password,
            },)
            
            if(result){
                console.log(result)
                logIn(username,password)
            }
            
        }catch(err){
            setError(err) 
            console.log(err)   
        }
   
    }

    const getTooken = async ()=>{
        const tookn = null
        // try {    
        //     const result = await SecureStorage.getItemAsync('auth')
        //     if(result){
        //         tookn = a
        //     }else{
        //         return null
        //     }
        // } catch (error) {
        //     setError(error)
        // }
        return 'tooken recived'
    }

    return {logIn,signup,getTooken,error}
}

export default useAuth