import React, { useLayoutEffect,useState,useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomListItem from "../Components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import {AntDesign ,SimpleLineIcons} from "@expo/vector-icons"

const home = ({ navigation }) => {
  const [chats,setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(snapshot.docs.map(doc => ({
        id:doc.id,
        data:doc.data()
      })))
    })

    return unsubscribe;

  } ,[])

  const signOut =()=> {
    auth.signOut().then(()=> {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title:auth?.currentUser?.displayName,
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={signOut} >
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight :()=>(
        <View style={{ flexDirection:"row" , justifyContent :"space-between" , width :80}}>
          <TouchableOpacity>
            <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
            
            </TouchableOpacity>
        </View>
      )
    });
  });

    


 const enterChat = (id,chatName) => {
   navigation.navigate('Chat' ,{
     id,chatName
   })
 }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container} >
        {chats.map(({id,data:{chatName}}) =>(
        <CustomListItem  id={id} chatName={chatName} key={id} enterChat={enterChat}  />

        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: { 
    height:"100%",
  }
});
