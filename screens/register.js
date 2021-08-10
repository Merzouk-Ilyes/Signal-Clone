import React, { useState,useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input ,Text} from "react-native-elements";
import {auth} from "../firebase"
export default function Register({navigation}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useLayoutEffect  (()=> {
    navigation.setOptions({ 
        
    })
  },[navigation])

    const register = () =>{
        auth.createUserWithEmailAndPassword(email, password).then((authUser)=> {
            authUser.user.updateProfile({
                displayName :name ,
                photoURL :imageUrl ||"https://i.pinimg.com/originals/de/88/e6/de88e6e8172e74132157755281df0d1a.jpg",
            })

        }).catch(error => alert(error.message));
    }

  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Name"
          type="text"
          value={name}
          onChangeText={(name) => {
            setName(name);
          }}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
        <Input
          placeholder="URL"
          type="text"
          value={imageUrl}
          onChangeText={(url) => {
            setImageUrl(url);
          }}
          onSubmitEditing={register}
        />
      </View>
      <Button title='Register' onPress={register} containerStyle={styles.button} />
      <View style={{height:80}}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
      backgroundColor: 'white'
  },
  button:{
      width :200 ,
  },
  inputContainer:{
    width :300 ,
  }
});
