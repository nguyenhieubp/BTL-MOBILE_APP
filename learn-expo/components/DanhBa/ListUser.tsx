import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import User from "./User";
import { useAppSelector } from "@/Redux/configs/hook";

const width = Dimensions.get("window").width;

interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
}

interface ListUserProps {
  users: User[];
}

const ListUser: React.FC<ListUserProps> = ( ) => {

  const users = useAppSelector((state) => state.user.users);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <User id={item.id} name={item.name} avatar={item.avatar} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width,
  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default ListUser;
