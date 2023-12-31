import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation,useRoute} from '@react-navigation/native'
import React, {useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl, color } from '../../../../config'
import DetailPostFooterComponent from './DetailPostFooterComponent'
import DarkModeContext from '../../../Context/DarkModeContext'
import ErrorText from '../../../../AppComponents/ErrorText'
import TryAgainButton from '../../../Auth/TryAgainButton'
import CommentListComponent from './CommentListComponent'


const EachFragment = ({fragment})=>{
    const {darkMode}= useContext(DarkModeContext)
    return(
        <View style = {{backgroundColor:darkMode?color.darkBackground:'white'}}>
            {fragment.title && <Text style = {[styles.fragmentTitleText,{color:darkMode?'white':color.dark}]}>{fragment.title}</Text>}
            <Text style = {[styles.contentText,{color:darkMode?'white':color.dark}]}>{fragment.content}</Text>
        </View>
    )
}


const PostDetail = () => {
    const {darkMode} = useContext(DarkModeContext)
    const [fragments,setFragments] = useState([])
    const navigation   = useNavigation()
    const route = useRoute()
    const [post,setPost] = useState(route.params.post)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const fechFragment = async ()=>{
        setLoading(true)
        setError(false)
        
        try {        
            const response = await axios.get(`${baseUrl}/post/${post.id}/fragments/`)
            setFragments(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(true)
            setLoading(false)
        }
    }
    useEffect(()=>{
        fechFragment()
    },[])

  return (

    <View style = {{backgroundColor:darkMode?color.darkBackground:'white',flex:1}}>
        <FlatList
            data={fragments}
            renderItem={({item})=><EachFragment fragment = {item} />}
            keyExtractor={item=>item?.id?.toString()}
            ListHeaderComponent={()=>(
                <>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <View style = {{margin:10}}>
                            <Ionicons name='arrow-back' color={darkMode?'white':color.dark} size={30} />
                        </View>
                    </TouchableOpacity>
                    <Text style={[{fontSize:16,fontWeight:'900',marginBottom:20},{color:darkMode?'white':color.dark}]}>{post.title}</Text>
                    {loading && <ActivityIndicator size={50} color={color.darkGolden} />}
                    {error && <>
                        <ErrorText error="Something Went Wrong Try Again..." />
                        <TryAgainButton fun={fechFragment} />
                             </>
                    }
                </>
                )}
                ListFooterComponent={()=>(
                    <>
                        <DetailPostFooterComponent post = {post} setPost={setPost}  />
                        <CommentListComponent post={post} setPost={setPost}/>
                    </>
                )}
    
            />
    </View>
  )
}

export default PostDetail

const styles = StyleSheet.create({
    contentText:{
        marginHorizontal:6,
        fontWeight:"100",
    
    },
    fragmentTitleText:{
        fontSize:16,
        fontWeight:'800',
        marginHorizontal:4,
        textDecorationLine:"underline",
        marginVertical:20,
        textDecorationColor:'red'
    }
})