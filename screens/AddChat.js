import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add New Chat",
    });
  });

  const createNewChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Add New Chat"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button title="Create new Chat" onPress={createNewChat} />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: { backgroundColor:'white' ,
    padding : 30 ,
    height :"100%"
},
});
