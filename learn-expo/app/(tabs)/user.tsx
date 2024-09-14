import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/Redux/configs/hook";
import { fetchUser } from "@/Redux/slices/userSlice";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  user_id: number;
  name: string;
  email: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const UserProfile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("user_id"); // Xóa user_id khỏi storage
      router.replace("/(auth)/login"); // Điều hướng về trang đăng nhập
    } catch (error) {
      Alert.alert("Error", "Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };
  
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{
            uri: user?.image
              ? `${process.env.EXPO_PUBLIC_API_URL}/${user.image.split("\\").join("/")}`
              : "https://via.placeholder.com/150", // Sử dụng placeholder nếu không có avatar
          }}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/user/edit?userId=${user.user_id}`)}
        >
          <Text style={styles.buttonText}>Update Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.bodyTitle}>User Information</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#fff",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  body: {
    padding: 20,
  },
  bodyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff6347", // Màu đỏ cho nút Đăng xuất
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UserProfile;
