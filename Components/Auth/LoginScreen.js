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
  idCard:number().required().label("Id Number").test('len',"Id Number Must be 4 Characters ",val=>val.toString().length ===4),
  idYear: number().required().label("Id Year").test('len',"Id Year Must be 2 Characters",val=>val.toString().length === 2),
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
          idCard: "",
          idYear: "",
          password: "",
        }}
        onSubmit={(values) => logIn(`${values.idCard}${values.idYear}`,values.password)}
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
