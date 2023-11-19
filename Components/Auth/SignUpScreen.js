import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import AppTextInput from "../../AppComponents/AppTextInput";
import AppButton from "../../AppComponents/AppButton";
import ErrorText from "../../AppComponents/ErrorText";
import { color } from "../../config";
import { Form, Formik } from "formik";
import {object,string,number,required,label} from 'yup'
import useAuth from "./useAuth";
import * as SecureStorage from 'expo-secure-store'
import { useEffect } from "react";
import{ jwtDecode} from "jwt-decode";


const validSchema = object({
  idCard:number().required().label("Id Number").test('len',"Id Number Must be 4 Characters ",val=>val.toString().length ===4),
  idYear: number().required().label("Id Year").test('len',"Id Year Must be 2 Characters",val=>val.toString().length === 2),
  first_name: string().required().max(225).min(2).label("First Name"),
  last_name: string().required().min(2).label("Last Name"),
  phonenumber: number().required().label("PhoneNumber").test('len',"Only 10 Characters Allowed",val=>val.toString().length === 9),
  password: string().min(8).required().label("PassWord"),
});




const SignUpScreen = ({ navigation }) => {
  const {signup,error} = useAuth()

  const getAuthTooken = async ()=>{
    const result = await SecureStorage.getItemAsync('auth')
    if(result){
        let a = JSON.parse(result).access
        const tooken = jwtDecode(a)
        console.log(tooken)
      // console.log(jwtDecode(JSON.parse(result)).access)
    }
  }

  useEffect(()=>{
    getAuthTooken()
  },[])

  return (
    <>
    {error && <ErrorText error="something Wrong Try again" />}
    <Formik
      initialValues={{
        idCard: "",
        idYear: "",
        first_name: "",
        last_name: "",
        phonenumber: "",
        password: "",
      }}
      onSubmit={(values) => {
        signup(`${values.idCard}${values.idYear}`,values.password,values.first_name,values.last_name,values.phonenumber)
      }
      }
      validationSchema={validSchema}
      >
      {({ handleChange, handleBlur,setFieldTouched, handleSubmit, values, errors,touched }) => (

      <View style={styles.container}>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <AppTextInput
            icon="idcard"
            name="idCard"
            onChangeText={handleChange("idCard")}
            onBlur = {()=>setFieldTouched('idCard')}
            placeholder="idcard"
            ant="ant"
            keyboardType="numeric"
            style={{ paddingRight: 9, flex: 2 }}
          />
          <Text style={{ alignSelf: "center" }}>/</Text>
          <AppTextInput
            placeholder="id Year"
            name = "idYear"
            onChangeText={handleChange("idYear")}
            onBlur = {()=>setFieldTouched('idYear')}
            ant="ant"
            keyboardType="numeric"
            style={{ paddingRight: 9, flex: 1 }}
          />
        </View>
        {(touched.idCard || touched.idYear) && (
          <ErrorText error={errors.idCard ? errors.idCard : errors.idYear} />
          )}
        <AppTextInput 
          placeholder="First Name" 
          onChangeText={handleChange("first_name")}
          onBlur = {()=>setFieldTouched('first_name')}
          name="first_name" 
          style={{ paddingRight: 9 }} />
        {touched.first_name && <ErrorText error={errors.first_name} />}
        <AppTextInput 
          placeholder="Last Name" 
          name="last_name" 
          onChangeText={handleChange("last_name")}
          onBlur = {()=>setFieldTouched('last_name')}
          style={{ paddingRight: 9 }} 
          />
        {touched.last_name && <ErrorText error={errors.last_name} />}
        <AppTextInput
          icon="phone"
          name = "phonenumber"
          placeholder="PhoneNumber"
          onChangeText={handleChange("phonenumber")}
          onBlur = {()=>setFieldTouched('phonenumber')}
          keyboardType="numeric"
          style={{ paddingRight: 9 }}
        />
        {touched.phonenumber && <ErrorText error={errors.phonenumber} />}

        <AppTextInput
          icon="key"
          color=""
          name = "password"
          onChangeText={handleChange("password")}
          onBlur = {()=>setFieldTouched('password')}
          placeholder="password"
          style={{ paddingRight: 9 }}
          secureTextEntry
          
        />
        {touched.password && <ErrorText error={errors.password} />}

        <AppButton
          title="Sign Up"
          bgColor={color.smoke}
          onPress={handleSubmit}
          />
      </View>
      )}
    </Formik>
  </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
