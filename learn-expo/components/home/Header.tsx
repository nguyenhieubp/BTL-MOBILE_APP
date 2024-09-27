import useFetchUserName from "@/app/(auth)/useFetchUserName";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useAppDispatch, useAppSelector } from "@/Redux/configs/hook";
import { fetchUser } from "@/Redux/slices/userSlice";

var width = Dimensions.get("window").width; //full width

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  
   
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);


  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Text style={styles.title}>Home</Text>
      </View>
        <Text style={styles.nameUser}>Xin chào, {user.user?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: width,
    height: 120,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
  },
  nameUser: {
    fontSize: 25,
  },
  user: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'space-between'
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
    borderRadius: 100,
    marginLeft: 20,
  },
});

export default Header;
