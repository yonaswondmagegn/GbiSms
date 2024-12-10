import { TouchableWithoutFeedback,Text } from "react-native";


const LogOutButton = ({onPressHandler}) => {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
        <Text>LogOut</Text>
    </TouchableWithoutFeedback>
  )
}

export default LogOutButton