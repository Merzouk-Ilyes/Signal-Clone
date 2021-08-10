import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from "react-native";
import login from './screens/login'
import Register from './screens/register'
import Home from './screens/home'
const Stack = createNativeStackNavigator();
export default function App() {

  const globalScreenOptions ={
    headerStyle:{backgroundColor :'#2C6BED'},
    headerTitleStyle:{color :'white'} ,
    headerTintColor:'white'
  }
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home" screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
