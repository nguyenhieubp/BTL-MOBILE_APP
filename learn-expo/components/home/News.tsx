import { router } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

interface NewsProps {
  title: string;
  id: string;
  image: string;
  desc: string;
}

const News: React.FC<NewsProps> = ({ id, title,desc,image }) => {
  const handleChooseNew = (id: string) => {
    router.push(`/news/${id}`);
  };


  return (
    <TouchableOpacity onPress={() => handleChooseNew(id)}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.itemNews}>
            <Image
              style={styles.logo}
              source={{
                uri: image,
              }}
            />
            <View style={{ paddingHorizontal: 10, overflow: "hidden" }}>
              <Text style={{ marginHorizontal: 10 }}>
                {desc}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  itemNews: {
    marginTop: 10,
    padding: 10,
    width:320,
    height: 100,
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "black",
  },
});

export default News;
