import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import AppTextInput from '../../AppComponents/AppTextInput'
import AppButton from '../../AppComponents/AppButton'
import React from 'react'
import { color } from '../../config'
import { Formik } from 'formik'
import {object,string,number,required,label} from 'yup'
import ErrorText from '../../AppComponents/ErrorText'
import useAuth from './useAuth'

const validSchema = object({
  phonenumber:number().required().label("phonenumber").test('len',"PhoneNumber Must be 9 Characters ",val=>val.toString().length ==9),
  password: string().min(8).required().label("PassWord"),
});

const LoginScreen = () => {
  const {logIn,error,loginLoading} = useAuth()

  return (
    <>
      {error && <ErrorText error="Something Went Wrong Try Again..." />}
      {loginLoading && <ActivityIndicator size={50} color={color.darkGolden}/>}
      <Formik
        initialValues={{
          phonenumber: "",
          password: "",
        }}
        onSubmit={(values) => logIn(values.phonenumber,values.password)}
        validationSchema={validSchema}
      >
        {({ handleChange, handleBlur,setFieldTouched, handleSubmit, values, errors,touched }) => (

        <View style={styles.container}>
            <AppTextInput
              icon="phone"
              name="phonenumber"
              onChangeText={handleChange("phonenumber")}
              onBlur = {()=>setFieldTouched('phonenumber')}
              placeholder="phonenumber"
              ant="ant"
              // style={{ paddingRight: 9, flex: 2 }}
              />
            {/* <Text style={{ alignSelf: "center" }}>/</Text> */}
           
          { (touched.phonenumber && errors.phonenumber) && (
            <ErrorText error={errors.phonenumber} />
          )}
        
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
            title="Log In"
            bgColor={color.smoke}
            onPress={handleSubmit}
            />
        </View>
        )}
      </Formik>
    </>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    marginTop:60
  }
})
