import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, ScrollView } from "react-native";
import News from "./News"; // Đảm bảo đường dẫn đúng với cấu trúc dự án
import axios from "axios";

interface NewsItem {
  id: string;
  title: string;
  image: string;
  desc: string;
}


const ListNews: React.FC = () => {
  const [news, setNews] = useState<Array<NewsItem>>([]);
  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/all/news`)
    .then((res) => {
      setNews(res.data);
    })
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <FlatList
          data={news}
          renderItem={({ item }) => <News desc={item.desc} id={item.id} title={item.title} image={item.image} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 520, // Chiều cao cố định của FlatList
    padding: 0,

  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default ListNews;
