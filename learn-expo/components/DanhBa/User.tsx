import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const width = Dimensions.get("window").width;

interface UserProps {
  id: string;
  avatar: string;
  name: string;
}

const User: React.FC<UserProps> = ({ id, avatar, name}) => {
  return (
    <View style={styles.itemUser}>
      <Image style={styles.logo} source={{ uri: avatar }} />
      <Text style={styles.userName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemUser: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginBottom: 30,
    width,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 100,
  },
  userName: {
    fontSize: 20,
    marginLeft: 20,
  },
});

export default User;
