import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import  CustomListItem  from "../Components/CustomListItem";
const home = ({navigation}) => {
 
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: "Jennie Kim",
      headerStyle:{backgroundColor:'white',},
      headerTitleStyle :{color:'black'},
      headerTintColor:"black",
      
    })
  })

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({});
