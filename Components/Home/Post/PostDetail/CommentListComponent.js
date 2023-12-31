import { StyleSheet, Text, View,FlatList, TouchableOpacity,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl, color } from '../../../../config'

import EachCommentComponent from './EachCommentComponent'
import PostComentComponent from './PostComentComponent'

const CommentListComponent = ({post}) => {
    const [comments,setComments] = useState()
    const [commentUrl,setcommentUrl] = useState(`${baseUrl}/postcomment/?ordering=-date&post=${post?.id}`)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const fechCommentsHandler = async ()=>{
        try {
            setLoading(true)
            setError(false)
            const result = await axios.get(commentUrl)
            if(comments){
                setComments(prev=>{
                    let newComent = result.data
                    newComent.results = [...prev?.results,...newComent.results]
                    return newComent
                })

            }else{
                setComments(result.data)
            }
            setLoading(false)
        } catch (error) {
            console.log(error,'coomnet error')
            setError(true)
            setLoading(false)
        }
    }

    const seeMoreHandler = ()=>{
        if(comments?.next){
            setcommentUrl(comments?.next)
            console.log(commentUrl,'from click')
            
        }
    }

    useEffect(()=>{
        fechCommentsHandler()
        console.log(comments?.next,'next url')
    },[commentUrl])


  return (
    <View>
      <FlatList 
        data={comments?.results}
        keyExtractor={item =>item?.id?.toString()}
        renderItem={({item})=><EachCommentComponent comment={item} />}
        ListHeaderComponent={()=>(
            <>
              <PostComentComponent post={post} setComments = {setComments} />
            </>
        )}
        ListFooterComponent={()=>(
            <>
                {comments?.next &&
                    <TouchableOpacity onPress={seeMoreHandler}>
                        <Text>seeMore</Text>
                    </TouchableOpacity>
                }
                {loading && <ActivityIndicator size={50} color={color.darkGolden} />}
            </>
        )}
      />
    </View>
  )
}

export default CommentListComponent

const styles = StyleSheet.create({})