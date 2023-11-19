import { StyleSheet, Text, View,Image,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {color} from '../../../config'
import { Ionicons,MaterialIcons } from '@expo/vector-icons'
import ShowPostScreen from './ShowPostScreen'
import { baseUrl } from '../../../config'

const OthersProfile = ({route}) => {
    const {profile} = route.params
    const [acadamic_year,setAcadamicYear] = useState()

    useEffect(()=>{
        const AC_YEAR = {
            "FR":"FRESH MAN",
            "SY":"SECOND YEAR",
            "TY":"THERED YEAR",
            "FY":"FOURTH YEAR",
            "GC":"GC(FIVTH YEAR)"
        }
        const profileAcadamicYear = profile.acadamic_year
        if(profile.acadamic_year != "ND"){
            setAcadamicYear(AC_YEAR[profileAcadamicYear])
        }
    },[profile])

  return (
    <ScrollView>
        <View style ={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{uri:profile.image}} />
        </View>
        <View style = {styles.profileDiscContainer}>

            <Text style = {styles.usernameText}>{profile.user.username} {profile.user.last_name}</Text>
            <Text style={styles.profileAutority}>{profile.authority}</Text>
            <View style = {styles.acadamicStatusContainer}>
                <View style={styles.academicInfoCont}>
                    <Ionicons name='school' color={color.darkGolden} size={24} />
                    <Text style = {{color:color.darkGolden}}>የትምህርት ደረጃ</Text>
                </View>
                {acadamic_year && <Text style={{color:'whitesmoke',marginLeft:25}}>{acadamic_year}</Text>}
                {profile.major?.title && <Text style={{color:'whitesmoke',marginLeft:55}}>{profile.major.title}</Text>}
            </View>
            <View style = {styles.kiflatContainer}>
                <View style={{flexDirection:'row',gap:7}}>
                    <MaterialIcons color={color.darkGolden} size={24} name='groups' />
                    <Text style={{color:color.darkGolden,}}>ክፍላት</Text>
                </View>
                {profile.groupNames.length >0 ? profile.groupNames.map(name=><Text style={{color:'whitesmoke',marginLeft:30}} key={name}> #{name}</Text>):<Text style={{color:'whitesmoke',marginLeft:30}}># ክፍላት ዉስጥ አልተገኘም ።</Text>}
            </View>
        </View>
        <Text style ={{color:color.activeGolden,fontSize:20}}>Posts By {profile.user.username}</Text>
        <ShowPostScreen url = {`${baseUrl}/anouncementPost/`} />
    </ScrollView>
  )
}

export default OthersProfile

const styles = StyleSheet.create({
    profileImageContainer:{
        alignItems:'center',
    },
    profileImage:{
        width:200,
        height:200,
        borderRadius:100,
        marginTop:70
    },
    usernameText:{
        color:color.darkGolden,
        fontSize:20
    },
    profileDiscContainer:{
        marginLeft:10
    },profileAutority:{
    marginLeft:20
    },acadamicStatusContainer:{
        backgroundColor:'#3E3E3E',
        shadowOpacity:10,
        width:'90%',
        padding:10,
        borderRadius:10
    },academicInfoCont:{
        flexDirection:'row',
        gap:6
    },kiflatContainer:{
        backgroundColor:'#3E3E3E',
        shadowOpacity:10,
        width:'90%',
        padding:10,
        borderRadius:10,
        marginTop:7

    }
})