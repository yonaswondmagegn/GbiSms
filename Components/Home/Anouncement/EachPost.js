import { StyleSheet, Text, View,TouchableWithoutFeedback,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'


const EachPost = ({item,url}) => {
    const navigate = useNavigation()
  return (
    <TouchableWithoutFeedback onPress={()=>navigate.navigate('main-detail-page',{item})}>
        <View style={[styles.container,{marginTop:url?20:5}]}>
            {console.log(item,'teh first one')}
            <Image source={{uri:item.image}} style={styles.postImage}/>
            <Text numberOfLines={1} style={styles.titleText}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.descriptionText}>{item.description}</Text>
            {!url && <TouchableWithoutFeedback onPress={()=>navigate.navigate('other-profile-page',{profile:item.user})}>

                <View style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={{uri:item.user.image}} />
                    <View style={styles.profileNameTextCont}>
                        <Text style ={styles.profileNameText} >{item.user.user.username}</Text>
                        {item.user.authority &&<Text style ={styles.profileNameText}>{item.user.authority}</Text>}
                    </View>
                </View>
            </TouchableWithoutFeedback>}
        </View>
    </TouchableWithoutFeedback>
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
    }
})
// {
//     "id": 1,
//     "user": {
//         "id": 1,
//         "major": null,
//         "user": {
//             "username": "SignalTest",
//             "first_name": "",
//             "last_name": "",
//             "phonenumber": "0987787"
//         },
//         "authority": null,
//         "image": "http://127.0.0.1:8000/profile.jpg",
//         "aastu_id_main": null,
//         "aastu_id_year": null,
//         "acadamic_year": "NR",
//         "bio": "",
//         "date": "2023-11-08T12:59:09Z",
//         "group": [
//             1
//         ]
//     },
//     "title": "First tesest post",
//     "image": "http://127.0.0.1:8000/anouncement_images/jack.jpg",
//     "description": "descriptoin for the first post",
//     "date": "2023-11-09T08:40:45Z",
//     "target_group": [
//         1
//     ]
// }