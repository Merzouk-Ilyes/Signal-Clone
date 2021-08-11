import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = ({id,chatName ,enterChat}) => {
  return (
    <ListItem  onPress={()=>enterChat(id,chatName)}  key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight :"bold"}} >
            
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >
            Subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
