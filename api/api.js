import axios from "axios";
// import { baseUrl } from "../config";
import * as SecureSotrage from 'expo-secure-store'
import { baseUrl } from "../config";


const api = axios.create({
    baseURL:baseUrl,
   
}

)
                

api.interceptors.request.use(
     async (config)=>{
        const tokens = await SecureSotrage.getItemAsync('auth')
        if(tokens){
            config.headers.Authorization = `JWT ${JSON.parse(tokens).access}`
        }
        return config;
        
    }
)

export default api;