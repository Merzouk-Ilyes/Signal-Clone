import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { auth, db } from "../firebase";

const CustomListItem = ({id,chatName ,enterChat}) => {
const [chatMessage , setChatMessage] = useState([])

  useEffect(() => {
    const unsubscribe = db.collection("chats").doc(id).collection("messages").onSnapshot(snapshot=> 
      setChatMessage(snapshot.docs.map(doc => doc.data()))
      )

      return unsubscribe;
  })


  return (
    <ListItem  onPress={()=>enterChat(id,chatName)}  key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:  chatMessage?.[0]?.photoURL || "https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight :"bold"}} >
            
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
            {chatMessage?.[0]?.displayName} : {chatMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
