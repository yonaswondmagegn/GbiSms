import { StyleSheet, Text, View,Image} from 'react-native'
import { color } from '../../config'
import React from 'react'
import AppButton from '../../AppComponents/AppButton'
import { useNavigation } from '@react-navigation/native'


const WellComeScreen = ({navigation}) => {
  const navigate = useNavigation()
  return (
    <View style= {styles.container}>
      <View style = {styles.topCont}>
        <Image style={styles.logoImage} source={require('../../assets/wedeGubaie.png')}/>
        <Text style={styles.davidMoto}>ወደ አግዚአብሄር ቤት አንሂድ ባሉኝ ጊዜ ደስ አለኝ።</Text>
        <Text style = {styles.davidNum}>መዝ __፡__</Text>
      </View>
      <AppButton title = 'Sign Up' bgColor={color.smoke} onPress={()=>navigation.navigate('main-page-container')} />
      <AppButton title = 'Login' bgColor= {color.smoke} onPress={()=>navigation.navigate('auth-main-screen',{screen:'auth-toptab-login'})}/>
    </View>
  )
}

export default WellComeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    logoImage:{
      alignSelf:'center',
      marginTop:100,
      width:210,
      height:200,
    },
    davidMoto:{
      alignSelf:'center',
      textAlign:'center',
      margin:20,
      color:color.darkGolden,
      fontSize:20,
    },
    davidNum:{
      alignSelf:'flex-end',
      marginRight:30,
      color:color.darkGolden,
    },
    topCont:{
      flex:1
    }
})