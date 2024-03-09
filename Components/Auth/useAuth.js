import React, { useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import NotificationContext from "../Context/NotificationContext";

const useAuth = () => {
  const [error, setError] = useState();
  const [signUpLaoding, setSignUpLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const navigation = useNavigation();
  const notficationToken = useContext(NotificationContext);
  console.log(notficationToken, "from authsoon");

  const logIn = async (username, password) => {
    if (!username || !password) return;
    setLoginLoading(true);
    setError(false);
    try {
      const result = await axios.post(`${baseUrl}/auth/jwt/create/`, {
        username,
        password,
      });

      try {
        await SecureStorage.deleteItemAsync("auth");

        const auths = await SecureStorage.setItemAsync(
          "auth",
          JSON.stringify(result.data)
        );
        console.log(result.data.access, "acess data");
        navigation.navigate("main-page-container");
        setLoginLoading(false);
        setSignUpLoading(false);
      } catch (error) {
        setError(error);
        setLoginLoading(false);
        setSignUpLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoginLoading(false);
      console.log(error, "error occured");
    }
  };

  const signup = async (
    username,
    password,
    first_name,
    last_name,
    phonenumber
  ) => {
    setSignUpLoading(true);
    setError(false);

    try {
      const result = await axios.post(`${baseUrl}/auth/users/`, {
        username,
        first_name,
        last_name,
        phonenumber: phonenumber.substring(1),
        password,
        deviceToken: notficationToken?.data,
      });
      if (result) {
        logIn(username, password);
      }
    } catch (err) {
      setError(err);
      setSignUpLoading(false);
    }
  };

  const getToken = async () => {
    const token = null;
    try {
      const result = await SecureStorage.getItemAsync("auth");
      if (result) {
        token = JSON.parse(result);
        return token.access;
      } else {
        return null;
      }
    } catch (error) {
      setError(error);
    }
  };

  return { logIn, signup, getToken, error, signUpLaoding, loginLoading };
};

export default useAuth;
