import { StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native'
import { useContext } from 'react'
import DarkModeContext from '../../Context/DarkModeContext'
import {color} from '../../../config'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'


const EachListComponent = ({group}) => {
    const navigation  = useNavigation()
    const {darkMode} = useContext(DarkModeContext)

  return (
    // <TouchableWithoutFeedback onPress={()=>navigation.navigate('group-detail-text-page',{group})}>
        <View style = {styles.container}>
            <View style = {styles.memberContainer}>
                <MaterialIcons name = 'groups' size={50} color={color.darkGolden}/>
                <Text>
                    {group.numberOfMembers} አባላት
                </Text>
            </View>
            <View style = {styles.NameCont}>
                <Text style = {styles.groupName} numberOfLines={1}>{group.name}</Text>
                <Text style = {styles.groupDescription} numberOfLines={2}>{group.description}</Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableWithoutFeedback>
                    <Text>ተቀላቀል</Text>
                </TouchableWithoutFeedback>
            </View>

        </View>
  )
}

export default EachListComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingHorizontal:4,
        paddingVertical:15,
        borderBottomColor:'black',
        borderBottomWidth :2,
        marginBottom:4,
        // backgroundColor:'rgba(111, 21, 13, 0.57)',
        marginHorizontal:5,
        borderRadius:4,
    },NameCont:{
        maxWidth:"60%"
    },
    groupName:{
     fontSize:25,

    },
    memberContainer:{
        // alignSelf:'flex-end'
        // backgroundColor:'white'
    },
    btnContainer:{
        alignSelf:'center',
        borderWidth:1,
        padding:5,
        borderRadius:5,
            }
})