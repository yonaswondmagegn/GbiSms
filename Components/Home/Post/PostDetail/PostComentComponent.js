import { StyleSheet, Text, View,KeyboardAvoidingView,ActivityIndicator} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import DarkModeContext from '../../../Context/DarkModeContext'
import SendInputComponent from '../../../../AppComponents/SendInputComponent'
import AppTextInput from '../../../../AppComponents/AppTextInput'
import axios from 'axios'
import ErrorText from '../../../../AppComponents/ErrorText'
import AuthContext from '../../../Context/AuthContext'
import { baseUrl, color } from '../../../../config'
import api from '../../../../api/api'


const PostComentComponent = ({post,setComments}) => {
    const {darkMode} = useContext(DarkModeContext)
    const [commentText,setCommentText] = useState()
    const [onProgress,setOnProgress] = useState(false)
    const [error,setError] = useState(false)
    const {profile} = useContext(AuthContext)

    const onSendHandler = async ()=>{
      
      if(!commentText)return;
      setError(false)
      setOnProgress(true)
      try {
        const result = await api.post('postcomment/',{
          text:commentText,
          user:profile?.user?.id,
          post:post.id
        })
        setComments(prev=>({...prev,results:[result.data,...prev.results]}))
        setOnProgress(false)

      } catch (error) {
        setError(true)
        console.log(error,profile)

        setOnProgress(false)
      }
    }

  return (
    <View>
      <Text style={{color:darkMode?'white':'black'}} >Comments</Text>
            <SendInputComponent
            name = "comment"
            icon = "comment"
            placeholder=
            "Type Your Comment..."
            onChangeText = {value =>setCommentText(value)}
            sendOnPress={onSendHandler}
            />
          {onProgress && <ActivityIndicator color={color.darkGolden} />}
          {error && <ErrorText error="SomeThing Went Wrong Try Again..." />}
        
       
    </View>
  )
}

export default PostComentComponent

const styles = StyleSheet.create({})