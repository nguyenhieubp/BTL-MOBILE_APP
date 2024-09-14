import React from "react";
import { FlatList, View, StyleSheet, ScrollView } from "react-native";
import News from "./News"; // Đảm bảo đường dẫn đúng với cấu trúc dự án

interface NewsItem {
  id: string;
  title: string;
}

const newsData: NewsItem[] = [
  { id: "1", title: "Tin tức 1" },
  { id: "2", title: "Tin tức 2" },
  { id: "3", title: "Tin tức 3" },
  { id: "4", title: "Tin tức 4" },
  { id: "5", title: "Tin tức 5" },
  { id: "6", title: "Tin tức 6" },
  { id: "7", title: "Tin tức 7" },
  { id: "8", title: "Tin tức 8" },
  { id: "9", title: "Tin tức 9" },
  { id: "10", title: "Tin tức 10" },
];

const ListNews: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <FlatList
          data={newsData}
          renderItem={({ item }) => <News id={item.id} title={item.title} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 420, // Chiều cao cố định của FlatList
    padding: 0,

  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default ListNews;
