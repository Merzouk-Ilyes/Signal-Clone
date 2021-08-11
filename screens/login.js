import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import Register from "./register"
import {auth} from "../firebase"

const login = ({navigation}) => {
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    useEffect(() => {
     const unsubscribe= auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        navigation.replace('Home')
      }

      })
      return unsubscribe;
    }, [])
    const signIn =() => {
      auth.signInWithEmailAndPassword(Email,Password).catch(err=> console.log(err))
    }
  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container} >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",
        }}
        style={{ width:200, height: 200 }}
      />
      <View style={styles.inputContainer}>
          <Input placeholder="Email" autoFocus type="email" value={Email}
          onChangeText={text => setEmail(text)}
          />
          <Input placeholder="Password" secureTextEntry type="password" value={Password} 
           onChangeText={text => setPassword(text)}
          />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button onPress={()=> navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register" />
      <View style={{height:100}} />
    </KeyboardAvoidingView>
  );
};

export default login;

const styles = StyleSheet.create({
    container:{
        flex:1 ,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor :'white',
        padding :10
    },
    inputContainer:{
        width:300,
    },
    button:{
        width:200,
        marginTop :10,
    }
});
