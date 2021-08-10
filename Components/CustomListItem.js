import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
const CustomListItem = () => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://dazedimg-dazedgroup.netdna-ssl.com/640/azure/dazed-prod/1300/5/1305418.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{fontWeight :"bold"}} >
            Signal Chat
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
