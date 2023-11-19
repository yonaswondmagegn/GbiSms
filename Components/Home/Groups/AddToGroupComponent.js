import { StyleSheet, Text, View,Button ,TouchableHighlight} from 'react-native'
import React from 'react'
import AppTextInput from '../../../AppComponents/AppTextInput'
import { color } from '../../../config'

const AddToGroupComponent = () => {
  return (
    <View style = {styles.container} >
      <AppTextInput icon = 'phone' placeholder = "PhoneNumber ..." style={{flex:1}} keyboardType = 'numeric' />
      <TouchableHighlight style = {styles.btnContainer}>
        <>
        <Text style= {styles.addBtnText}>Add</Text>
        </>
      </TouchableHighlight>
    </View>
  )
}

export default AddToGroupComponent

const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  },
  btnContainer:{
    alignSelf:'center',
    marginRight:10,
    padding:7,
    backgroundColor:color.darkGolden,
    borderRadius:10,
  },addBtnText:{
    color:'white'
  }

})