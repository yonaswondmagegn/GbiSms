// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import SendInputComponent from '../../../AppComponents/SendInputComponent'
// import * as SMS from 'expo-sms'
// // import { SendSmsOptions } from 'react-native-sms'
// import { SendSmsOptions } from 'react-native-sms'

// // export interface SendSmsOptions {
// //     body?: string;
// //     recipients?: string[];
// //     successTypes?: AndroidSuccessTypes[];
// //     allowAndroidSendWithoutReadPermission?: boolean;
// //     attachment?: AttachmentOptions;
// //   }

// const MessageSender = () => {
//     const sendHandler = async ()=>{
//         try{
//             const result = await SSendSmsOptions ({
//                 body:"TEST MESSAGE FROM TEH APP ",
//                 recipients:["0914376236","0978345678"],
//                 allowAndroidSendWithoutReadPermission: true


//             }       
//                 )
//             console.log(result)
//         }catch(err){
//             console.log(err,"sms erorr")
//         }
//     }
//   return (
//     <View style = {{backgroundColor:'white'}}>
//       <SendInputComponent icon = 'message-plus' placeholder="Message ..." sendOnPress={sendHandler}  />
//     </View>
//   )
// }

// export default MessageSender

// const styles = StyleSheet.create({})
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button,PermissionsAndroid } from 'react-native';
import SMS from 'react-native-sms-x';

const MessageSender = () => {
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');
  const [messageBody, setMessageBody] = useState('');

  const handleSendMessage = () => {
    if (!recipientPhoneNumber || !messageBody) {
      alert('Please enter a recipient and message');
      return;
    }

    const checkAndRequestSMSPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiplePermissions([
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
          ]);
      
          if (granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED) {
            // SMS permission granted
          } else {
            // SMS permission denied
          }
        } catch (err) {
          console.error(err);
        }
      };

      useEffect(()=>{
        checkAndRequestSMSPermission()
      },[])

    SMS.autoSend(
      [{ addressList: [recipientPhoneNumber] }],
      messageBody,
      (error) => console.error(error),
      (success) => console.log('SMS sent successfully')
    );
  };

  return (
    <View>
      <Text>Recipient Phone Number:</Text>
      <TextInput
        value={recipientPhoneNumber}
        onChangeText={(text) => setRecipientPhoneNumber(text)}
      />
      <Text>Message:</Text>
      <TextInput
        value={messageBody}
        onChangeText={(text) => setMessageBody(text)}
      />
      <Button title="Send SMS" onPress={handleSendMessage} />
    </View>
  );
};

export default MessageSender;
