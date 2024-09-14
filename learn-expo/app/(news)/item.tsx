import { useNavigation } from "@react-navigation/native"; 
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

var width = Dimensions.get("window").width; // full width

interface Params {
  id: string;
}

const FixedPositionExample: React.FC = () => {
  const { id } = useLocalSearchParams<any>(); // Lấy id từ params
  const navigation = useNavigation(); // Sử dụng hook useNavigation

  // Sử dụng useEffect để thay đổi tiêu đề khi component được render
  useEffect(() => {
    if (id) {
      navigation.setOptions({ title: `Chi tiết item ${id}` });
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textContent}>Nội dung chính {id}</Text>
        <View>
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg",
            }}
          />
        </View>
        <Text style={{ marginTop: 10 }}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
          ipsum vitae fuga quo natus eaque harum deleniti nesciunt at a! Quas
          placeat temporibus ad, obcaecati tenetur nisi modi voluptatibus
          voluptatem?
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
