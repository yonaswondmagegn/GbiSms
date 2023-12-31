import { StyleSheet, Text, View,TouchableWithoutFeedback,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect,useState } from 'react'


const EachPost = ({item,url}) => {
    const [formattedDate,setFormatedData] = useState()
    const navigation = useNavigation()

    useEffect(()=>{
        const date = new Date(item.date)
        const fDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
        }).format(date);
        setFormatedData(fDate)
    },[])
  return (
        <View style={[styles.container,{marginTop:url?20:5}]}>
            <Text  style={styles.titleText}>{item.title}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
            {!url && <TouchableWithoutFeedback onPress={()=>navigation.navigate('other-profile-page',{profile:item.user})}>

                <View style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={{uri:item.user.image}} />
                    <View style={styles.profileNameTextCont}>
                        <Text style ={styles.profileNameText} >{item.user.user.username}</Text>
                        {item.user.authority &&<Text style ={styles.profileNameText}>{item.user.authority}</Text>}
                    </View>
                </View>
            </TouchableWithoutFeedback>}
        </View>
  )
}

export default EachPost

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        marginHorizontal:5,
        marginTop:5,
        borderRadius:10

    },
    postImage:{
        width:'100%',
        height:200,
    },profileImage:{
        width:40,
        height:40,
        borderRadius:24,
    },profileContainer:{
        flexDirection:'row',
        alignItems:'center',
    },profileNameTextCont:{
        marginLeft:10,
        fontSize:10
    },profileNameText:{
        fontSize:10
    },
    descriptionText:{
        marginLeft:5,
        fontSize:13
    },titleText:{
        // fontWeight:2 
        fontWeight:'800'
    },date:{
        alignSelf:'flex-end',
        margin:10,
        fontSize:14,
        fontStyle:'italic',
        fontWeight:'100'
    }
})
