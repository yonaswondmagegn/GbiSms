import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import AuthContext from "../Context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import api from "../../api/api";
import * as ImagePicker from "expo-image-picker";
import RefAppTextInput from "../../AppComponents/RefAppInput";
import AppButton from "../../AppComponents/AppButton";

const EditProfile = () => {
  const { profile, getProfile } = useContext(AuthContext);
  const [listOfMajors, setListOfMajors] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [img, setImg] = useState();
  const [selectedMajor, setSelectedMajor] = useState(profile?.major?.id);
  const [acadamicYear, setAcadamicYear] = useState(profile.acadamic_year);
  const [authorityText, setAuthorityText] = useState(profile?.authority);
  const [bioText, setBioText] = useState(profile.bio);
  const calendarRef = useRef();

  const fechMajorsHandlers = async () => {
    try {
      setIsLoading("major");
      setError(null);

      const result = await api.get("major/");
      if (result) {
        setListOfMajors(result.data);
        console.log(result.data);
      }
    } catch (error) {
      setIsLoading(null);
      setError("major_loding_error");
    }
  };
  useEffect(() => {
    fechMajorsHandlers();

    // authorityRef.current.setNativeProps({ text: profile?.authority });
  }, []);

  const ImagePickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
      console.log(result.assets[0].uri);
      console.log(result.assets);
    }
  };

  //   {
  //     "id": 1,
  //     "major": 1,
  //     "user": 4,
  //     "authority": "የባች ክፍል ጽህፊ",
  //     "image": "http://127.0.0.1:8000/media/profile_pics/SecOrto.jpg",
  //     "aastu_id_main": "1234",
  //     "aastu_id_year": "13",
  //     "acadamic_year": "SY",
  //     "bio": "የማርያም ነች",
  //     "date": "2023-11-08T12:59:09Z",
  //     "group": [
  //         2
  //     ],
  //     "groupNames": [
  //         "timihrt"
  //     ]
  // }
  // let data = {
  //   major: selectedMajor,
  //   user: profile?.user?.id,
  //   authority: authorityText,
  //   acadamic_year: acadamicYear,
  //   group: profile.group,
  //   bio: bioText,
  // };

  // if (img) {
  //   let uriParts = img.split(".");
  //   let fileType = uriParts[uriParts.length - 1];
   
    
  //   data = { ...data, image: {
  //     uri:img,
  //     name: `fileToUpload.${fileType}`,
  //     type: `image/${fileType}`,

  //   } };
  // }

  const onUpdateHandler = async () => {
    const formData = new FormData()
    formData.append('major',selectedMajor)
    formData.append('user',profile?.user?.id)
    formData.append('authority',authorityText)
    formData.append('acadamic_year',acadamicYear)
    formData.append('group',profile.group)
    formData.append('bio',bioText)

    console.log(formData,'formdata')
  
    try {
      const result = await api.put(`profile/${profile.id}/`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (result) {
        console.log(result.data);

        getProfile();
      }
    } catch (error) {
      console.log("error happend", error);
    }
  };




  return (
    <ScrollView>
      <View>
        <Image
          source={{ uri: img ? img : profile?.image }}
          style={styles.preViewImage}
          key={img}
        />

        <TouchableOpacity onPress={ImagePickerHandler}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View>
        {error == "major_loding_error" && (
          <ErrorMessage error="Error on Loading Majors..." />
        )}
        <Picker
          selectedValue={selectedMajor}
          onValueChange={(value) => setSelectedMajor(value)}
          style={styles.picker}
        >
          {listOfMajors &&
            listOfMajors.map((major) => (
              <Picker.Item
                label={major.title}
                value={major.id}
                key={major.id}
              />
            ))}
        </Picker>
      </View>
      <View>
        <Text>Authority</Text>
        <RefAppTextInput
          chair="chair"
          setAuthorityText={setAuthorityText}
          value={authorityText}
        />
      </View>
      <View>
        <Text>Acadamic Year</Text>
        <Picker
          // slected
          selectedValue={acadamicYear}
          onValueChange={(value) => setAcadamicYear(value)}
          style={styles.picker}
        >
          <Picker.Item label="FRESH MAN" value="FM" />
          <Picker.Item label="SECOND YEAR" value="SY" />
          <Picker.Item label="THERED YEAR" value="TY" />
          <Picker.Item label="FOURTH YEAR" value="FY" />
          <Picker.Item label="FIVTH YEAR" value="GC" />
        </Picker>
      </View>

      <View>
        <Text>Bio</Text>
        <RefAppTextInput setAuthorityText={setBioText} value={bioText} />
      </View>
      <AppButton
        title="Update"
        onPress={onUpdateHandler}
        bgColor="whitesmoke"
      />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  preViewImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
  },
  uploadText: {
    alignSelf: "flex-end",
    marginRight: "30%",
  },
});
