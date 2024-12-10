import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { color } from '../../../../config'
import DarkModeContext from '../../../Context/DarkModeContext'


const EachCommentComponent = ({comment}) => {
    const [showAll,setShowAll] = useState(false)
    const [numberOfLine,setNumberOfLine]  = useState(null)
    const {darkMode} = useContext(DarkModeContext)

    const numberOfLineHandler = ()=>{
        if(comment?.text?.length < 50) return;
        setNumberOfLine(6)
    }

    const showChangeHandler = ()=>{
        if(showAll){
            setNumberOfLine(6)
        }else{
            setNumberOfLine(null)
        }
        setShowAll(prev=>!prev)
        
    }

    useEffect(()=>{
        numberOfLineHandler()
    },[])
  return (
    <View style = {styles.container}>
      <View>
        <Image style = {styles.image} source={{uri:comment?.profile?.image} } />
      </View>
      <View style = {styles.textContainer}>
        <Text style ={styles.username}>{comment?.profile?.user?.username}</Text>
        <Text numberOfLines={numberOfLine} style = {{color:darkMode?'white':'black'}}>{comment?.text}</Text>
        {comment?.text.length >50 && (
            <TouchableOpacity onPress={showChangeHandler}>
                {showAll?
                <Text style = {[styles.btnText,{color:'red'}]}>ShowLess</Text>:
                <Text style = {[styles.btnText]}>ShowMore</Text>}
            </TouchableOpacity>
        )}
        
      </View>
    </View>
  )
}

export default EachCommentComponent

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginLeft:20,
        
    },
    image:{
        width:40,
        height:40,
        borderRadius:25,
        marginRight:10
    },
    username:{
        fontSize:10,
    },
    textContainer:{
    borderWidth:1,
    flex:1,
    marginRight:10,
    borderColor:'#CECECE',
    borderRadius:2,
    padding:10
    },
    btnText:{
        color:color.darkGolden
    }
    
    })