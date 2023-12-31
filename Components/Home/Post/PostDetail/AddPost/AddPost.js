import { 
  StyleSheet, 
  Text, 
  View,
   TouchableWithoutFeedback,
   TouchableOpacity ,
   ScrollView,
   ActivityIndicator
} from "react-native";
import React, { cloneElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import TitleInputField from "./TitleInputField";
import FragmentTextInputField from "./FragmentTextInputField";
import SubTitleInputField from "./SubTitleInputField";
import  uuid from 'react-native-uuid'
import { baseUrl, color } from "../../../../../config";
import axios from "axios";
import AuthContext from "../../../../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ErrorText from "../../../../../AppComponents/ErrorText";


const AddPost = () => {
  const [focusedFieldIndex, setFocusedFieldIndex] = useState(null);
  const [cursorPosition,setCursorPosition] = useState(0)
  const [cancelClicked,setsCancelClicke] = useState(false)
  const fieldRefs = useRef([])
  const titleFieldRef = useRef()
  const [rerenderKey, setReRenderKey] = useState(1);
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const navigtion = useNavigation()
  const {auth,authTookns} = useContext(AuthContext)
  const [titlText,setTitleText] = useState('')

  let FragmentFieldObject = (key)=>({
    field: (
      <FragmentTextInputField
        onFocus={() => onFocusHandler(0)}
        onBlur={onBlurHandler}
        key={key}
        onChangeText={(value) => onTextChangeHandler(value, 0)}
        ref={el=>fieldRefs.current[0] = el}
        onSelectionChange={handleSelectionChange}
        onKeyPress = {()=>{
          setReRenderKey(prev=>prev+2)
          console.log(focusedFieldIndex,'index on the perss')
        }}
      />
    ),
    value: "",
    type: "FT",
    order:0
  })
  let subtitleFieldObject =(key)=>({
    field: (
      <SubTitleInputField
        onFocus={() => onFocusHandler(1)}
        onBlur={ onBlurHandler}
        onChangeText={(value) => onTextChangeHandler(value, 1)}
        key={key}
        ref = {ref=>fieldRefs.current[1] = ref}
        onSelectionChange={handleSelectionChange}
        onKeyPress = {handleKeyPress}
        />
        ),
        value: "",
        type: "STI",
        order:1
      })

    



  useEffect(()=>{
    const result = correctFragmentIndex(fragmetns)
    setFragmetns(result)
  },[focusedFieldIndex])

 
  const onFocusHandler = (index)=>{
    
    setFocusedFieldIndex(prev=>{
      return index
    })
  }

  const onBlurHandler = ()=>{
  }
  const handleSelectionChange = (event)=>{
    let curPos = event.nativeEvent.selection.start
    setCursorPosition(curPos)
  }

  const handleKeyPress = ({nativeEvent})=>{
    if(nativeEvent.key == 'Escape' || nativeEvent.key == 'Backspace'){
      if(fragmetns[focusedFieldIndex]?.value?.length != 0)return;
      if(fragmetns.length ==1)return;
      if(focusedFieldIndex == fragmetns.length-1 && fragmetns[focusedFieldIndex-1]?.type !='FT')return;
      let newFragment = [...fragmetns];
      newFragment.splice(focusedFieldIndex,1)
      newFragment = correctFragmentIndex(newFragment)
      console.log('canceled by cancel button ')
      setFragmetns(newFragment)
      setsCancelClicke(true)
    }
  }

  let firstFragmetn  = FragmentFieldObject(uuid.v4())
  const [fragmetns, setFragmetns] = useState([firstFragmetn]);

  const mergeFtFragments = (unMergeFragments)=>{

    let resultList = [...unMergeFragments]
    console.log(resultList[0].value)
    let mergeFragmentsList = unMergeFragments.filter((fragment,index)=>{
      if((index-1>=0 && fragment.type == 'FT') && resultList[index-1].type == 'FT'){
        resultList[index-1].value = resultList[index-1].value+fragment.value
        resultList.splice(index,1)
        fieldRefs?.current[index-1]?.focus()
        return false
      }else{
        return true
      }
    })

    console.log(mergeFragmentsList,'list')

    return resultList
  }

  const correctFragmentIndex = (propFragmetns)=>{
    let testMerge;
    if(propFragmetns){
      console.log('mergin started[.....')
      testMerge = mergeFtFragments(propFragmetns)
      console.log(testMerge.length,'test merge')
    }
    const correctedFragments = testMerge.map((fragment,index)=>{
      const fragmentElement = cloneElement(fragment.field,{
        onChangeText:(value) => onTextChangeHandler(value, index),
        ref:el=>fieldRefs.current[index] = el,
        onFocus:() => onFocusHandler(index),
        onKeyPress:handleKeyPress,
        value:fragment.value
      })
      fragment.field = fragmentElement

      fragment.order = index
      return fragment
      
    })
    return correctedFragments
   }


  const onTextChangeHandler = (value, index) => {
    setFragmetns((prev) => {
      let newFragment = prev;
      newFragment[index].value = value;

      let loopIndex = index;
      while (true) {
        let fragmetnLength = newFragment[loopIndex]?.value?.length
        if (fragmetnLength == 0) {
          if (newFragment.length == 1)break;
          if(newFragment.length-1 == index && newFragment[index-1]?.type !="FT")break;
          console.log(newFragment.length-1 == index,newFragment[index-1]?.type !="FT")
          newFragment.splice(loopIndex, 1);
          setReRenderKey((prev) => prev + 1);
        
          loopIndex -= 1;
        } else break;
        
      }
      newFragment = correctFragmentIndex(newFragment)
      return newFragment;
    });
  
  };
  useEffect(() => {
    console.log(fragmetns.length,'lentgth from the use Effect')
  }, [fragmetns]);
  
  const seprateTextHandler = (index,separetIndex)=>{
    let beginingTextValue = fragmetns[index]?.value?.slice(0,separetIndex)
    let endTextValue = fragmetns[index]?.value?.slice(separetIndex)

    let beginingField = FragmentFieldObject(uuid.v4())
    let endTextField = FragmentFieldObject(uuid.v4())
    let subtitleField = subtitleFieldObject(uuid.v4())

    beginingField.value = beginingTextValue
    endTextField.value = endTextValue

    let newFragment = [...fragmetns]
    newFragment.splice(index,1,subtitleField)

    newFragment.splice(index,0,beginingField)
    newFragment.splice(index+2,0,endTextField)
    newFragment.map(frag=>console.log(frag.type,'c',frag.value))
    newFragment = correctFragmentIndex(newFragment)
    setFragmetns(newFragment)
  }

  const addSubTitleHandler = () => {
    if(focusedFieldIndex== null)return;
    const valueLengthOfFocusedField = fragmetns[focusedFieldIndex]?.value?.length; 

    if((fragmetns[focusedFieldIndex]?.type == 'FT' && cursorPosition != 0 )&& valueLengthOfFocusedField != cursorPosition){
      seprateTextHandler(focusedFieldIndex,cursorPosition)
      setReRenderKey(key=>key+1)
      console.log('separetro , found ....******',fragmetns.length)
      return;
    }
   
    let nextIndex;
    if(focusedFieldIndex !=null){
      if(cursorPosition == 0 ){
        nextIndex = focusedFieldIndex
      }else{
        nextIndex = focusedFieldIndex+1
      }
    }else{
      nextIndex = fragmetns.length+1
      console.log(nextIndex,focusedFieldIndex,'done........++++++')
    }

    setFragmetns((prev) => {
      let newFragment = prev;
      while (true) {
        if (fragmetns[fragmetns?.length - 1]?.value?.length == 0) {
          newFragment.pop();
        } else {
          break;
        }
      }

      let lastIndex = newFragment.length
      let spliceFragmentFirstComponenet = FragmentFieldObject(uuid.v4())
      let spliceFragmentSubtitleComponenet = subtitleFieldObject(uuid.v4())

      let spliceFragments = [spliceFragmentSubtitleComponenet,spliceFragmentFirstComponenet];


      newFragment.splice(nextIndex,0,...spliceFragments)
      newFragment.map((frag,index)=>console.log(frag.value,index,'spliced value'))

      newFragment = correctFragmentIndex(newFragment)

      return newFragment;
    });
  };

  const postToApiHandler = async()=>{
    console.log(titlText,'title text')
    console.log(auth,'user')
    console.log(authTookns,'tookn ')
    let  dataArr = []
    let position = 0;
    fragmetns.forEach((fragment,index) => {
      if(fragment.type == 'STI'){
        let fragData;
        if(fragmetns[index+1] && fragmetns[index+1].type == 'FT'){
          fragData = {
            title:fragment.value,
            position:position,
            content:fragmetns[index+1].value,
            type:'N'
          }
        
        }else{
          fragData = {
            title:fragment.value,
            position:position,
            type:'N'
          }
        }
        dataArr.push(fragData)
        position+=1
      }else if(index ==0){
        let fragData = {
          position:position,
          content:fragment.value,
          type:'N'
        }
        dataArr.push(fragData)
        position+=1
      }
    });
      
    if(titleFieldRef?.current?.value?.length == 0 || !titleFieldRef.current){
      setError('TitleError')
      return;
    }

    let postFullData = {
      title:titlText,
      view: 0,
      author: auth?.id,
      fragments: dataArr
  }
  console.log(postFullData,'full data')
  let headers=  {
    'Authorization':`JWT ${authTookns.access}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    setError(false)
    setLoading(true)
    const result = await axios.post(`${baseUrl}/post/`,postFullData,{headers})

    if(result){
      setLoading(false)
      navigtion.navigate("clear-stack-navigation",
      {screen:"detail-post-page",params:{post:result.data}})
    }
  } catch (error) {
    setError("ServerError")
    setLoading(false)
    console.log(error)


  }
  

  }

  return (
    <TouchableWithoutFeedback  onPress={()=>{
      fieldRefs.current[fragmetns.length-1].focus()
      console.log('clicked the psot')
    }}>
      <View style={{flex:1}}>
        {loading && <ActivityIndicator color={color.darkGolden} size={30} />}
        {error == 'TitleError' && 
        <ErrorText error={'Title Field Required'} />}
        {error == 'ServerError' && 
        <ErrorText error={'SomeThingWent Wrong Try Again'} />}
      <ScrollView>
        <View>
        <TitleInputField
          ref={titleFieldRef}
          onChangeText={value=>setTitleText(value)}


         />
            {rerenderKey && fragmetns.map((fragment) => fragment.field)}
        </View>
      </ScrollView>
        <TouchableWithoutFeedback onPress={addSubTitleHandler}>
            <View style={styles.addpostbtn}>
      
            <Text style={{color:color.darkGolden}}>SubTitle</Text>
            </View>
          </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={postToApiHandler}>
           
      
            <Text style={{color:color.darkGolden}}>SubTiAPI HANDtle</Text>
            
          </TouchableWithoutFeedback>

        </View>
    </TouchableWithoutFeedback>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  addpostbtn:{
    position:'absolute',
    bottom:20,
    color:color.darkGolden
  }
  
});
