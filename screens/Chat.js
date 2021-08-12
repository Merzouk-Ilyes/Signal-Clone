import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import * as firebase from "firebase";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
const Chat = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  });

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: message,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setMessage("");
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        // KeyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView  contentContainerStyle={{paddingTop :15}} >
              {messages.map(({ data, id }) =>
                data.email === auth.currentUser.email ? (
                  <View style={styles.receiver} key={id}>
                    <Avatar 
                    rounded
                    source ={{
                      uri:data.photoURL

                    }}
                    position ="absolute"
                    bottom={-15}
                    right={-5}

                    containerStyle={{
                    position :"absolute",
                    bottom:-15,
                    right:-5,
                    }}

                    size={30}
                    
                    
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.sender}  key={id}>
                    <Avatar 
                    containerStyle={{
                      position :"absolute",
                      bottom:-15,
                      right:-5,
                      }} 
                    rounded
                    source ={{
                      uri:data.photoURL

                    }}
                    position ="absolute"
                    bottom={-15}
                    left={-5}
                    size={30}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>

                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="message"
                value={message}
                onChangeText={(m) => setMessage(m)}
                style={styles.textInput}
                onSubmitEditing ={sendMessage}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Ionicons name="send" size={24} color="#2C6BED" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  senderName:{
    left:10, 
    paddingRight:10,
    fontSize :10 ,
    color:"white"
  },senderText:{
    marginLeft:10,
    marginBottom :15,
    fontWeight :"500",
    color:"white"
  },
  receiverText:{
    marginLeft:10,
    fontWeight :"500",
    color:"black"
  },
  receiver :{
    padding : 15 ,
    backgroundColor : "#ECECEC" ,
    alignSelf :"flex-end" ,
    borderRadius : 20 ,
    marginRight : 15 ,
    marginBottom : 20 ,
    maxWidth :"80%" ,
    position : "relative"
  },
  sender :{
    padding : 15 ,
    backgroundColor : "#2B68E6" ,
    alignSelf :"flex-start" ,
    borderRadius : 20 ,
    marginLeft : 15 ,
    marginBottom : 20 ,
    maxWidth :"80%" ,
    position : "relative"
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
