import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { auth, db } from "../firebase";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
const Chat = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.chatName,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
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

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behaviour="padding"
        style={styles.container}
        KeyboardVerticalOffset={90}
      >
        <ScrollView></ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="message"
            value={message}
            onChangeText={(m) => setMessage(m)}
            style={styles.textInput}
          />
          <TouchableOpacity>
              <Ionicons name="send" size={24} color="#2C6BED" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {},
});
