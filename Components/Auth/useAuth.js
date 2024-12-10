import React, {  useState,useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { baseUrl } from "../../config";
import * as SecureStorage from "expo-secure-store";
import NotificationContext from "../Context/NotificationContext";


const useAuth = () => {
  const [error, setError] = useState();
  const [signUpLaoding, setSignUpLoading] = useState(false);
  const [loginLoading,setLoginLoading] = useState(false)
  const notficationToken = useContext(NotificationContext)
  const {setIsAuthenticated} = useContext(AuthContext)

 

  const logIn = async (phonenumber, password) => {

    if (!phonenumber || !password) return;
    let  string_phonenuymber = phonenumber.toString()
    console.log(string_phonenuymber)
    if(string_phonenuymber[0] == "0"){
      string_phonenuymber = string_phonenuymber.slice(1)
    }
    setLoginLoading(true)
    setError(false)
    try {
      const result = await axios.post(`${baseUrl}/auth/jwt/create/`, {
        phonenumber:parseInt(string_phonenuymber),
        password,
      });
      try {
         await SecureStorage.deleteItemAsync('auth')

          await SecureStorage.setItemAsync(
            "auth",
            JSON.stringify(result.data)
            );
            console.log(result.data.access,'acess data')
            setLoginLoading(false)
            setSignUpLoading(false)
            setIsAuthenticated(true)
      } catch (error) {
        setError(error)
        setLoginLoading(false)
        setSignUpLoading(false)
      }
    } catch (error) {
      setError(error);
      setLoginLoading(false)
      console.log(error, "error occured");
    }
  };

  // SignUp Logic
  const signup = async (
    username,
    password,
    first_name,
    last_name,
    phonenumber
  ) => {
    setSignUpLoading(true)
    setError(false)

    try {
      let string_phonenumber = phonenumber.toString()
      if(string_phonenumber[0] == "0"){
        string_phonenumber = string_phonenumber.slice(1)
      }
      const result = await axios.post(`${baseUrl}/auth/users/`, {
        username,
        first_name,
        last_name,
        phonenumber:parseInt(string_phonenumber),
        password,
        deviceToken:notficationToken?.data,
      });
      if (result) {
        logIn(phonenumber, password);
        setSignUpLoading(false)
      }
    } catch (err) {
      setError(err);
      setSignUpLoading(false);
    }
  };



  return { logIn, signup, error, signUpLaoding,loginLoading };
};

export default useAuth;
