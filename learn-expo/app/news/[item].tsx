import { useNavigation } from "@react-navigation/native"; 
import axios from "axios";
import { router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

var width = Dimensions.get("window").width; // full width


interface NewsItem {
  id: string;
  title: string;
  image: string;
  desc: string;
}

const FixedPositionExample: React.FC = () => {
  const navigation = useNavigation(); // Sử dụng hook useNavigation
  const { item} = useLocalSearchParams(); // Lấy params từ router
  const [news,setNews] = useState<NewsItem>();

  // Sử dụng useEffect để thay đổi tiêu đề khi component được render
  useEffect(() => {
    if (item) {
      navigation.setOptions({ title: `Chi tiết item ${item}` });
    }
  }, [item]); // Thêm id vào dependency array

  const fetItemNew = async () => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/item/news/${item}`);
    setNews(response.data);
  };

  useEffect(() => {
    fetItemNew();
  },[])



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textContent}>{news?.title}</Text>
        <View>
          <Image
            style={styles.logo}
            source={{
              uri: news?.image
            }}
          />
        </View>
        <Text style={{ marginTop: 10 }}>
          {news?.desc}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  textContent: {
    fontSize: 24,
    textAlign: "center",
  },
  logo: {
    marginTop: 20,
    width: width - 20,
    height: 200,
    objectFit: "cover",
  },
});

export default FixedPositionExample;
