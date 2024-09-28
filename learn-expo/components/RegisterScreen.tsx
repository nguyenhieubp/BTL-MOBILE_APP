import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { registerUser } from "@/Redux/slices/userSlice"; // Thêm hành động đăng ký
import { Colors } from "@/constants/Colors";
import { useAppDispatch } from "@/Redux/configs/hook";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    // Kiểm tra thông tin hợp lệ
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    
    if (!email.includes("@gmail.com")) {
      Alert.alert("Lỗi", "Email phải có định dạng @gmail.com.");
      return;
    }
    
    if (password.length < 8) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Xử lý đăng ký khi thông tin hợp lệ
    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      Alert.alert("Thành công", "Đăng ký thành công!");
      router.replace("/login"); // Chuyển về trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      Alert.alert("Error", "Đăng ký thất bại.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/024/568/140/non_2x/register-now-with-speech-bubble-and-ribbon-modern-design-template-for-icon-sign-logo-web-label-button-banner-registration-join-illustration-free-vector.jpg",
          }}
        />
      </View>
      <View style={styles.inner}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
            Đăng ký tài khoản
          </Text>
        </View>
        <TextInput
          placeholder="Tên người dùng"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
        <Pressable
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            padding: 5,
          }}
        >
          <Pressable onPress={handleRegister}>
            <Text style={{ color: "white", textAlign: "center" }}>Đăng Ký</Text>
          </Pressable>
        </Pressable>
        <Pressable style={{ marginTop: 20, display: 'flex', flexDirection: 'row' }} onPress={() => router.back()}>
          <Text>Bạn đã có tài khoản</Text>
          <Text style={{ color: 'red' }}> Đăng Nhập</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inner: {
    padding: 24,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
});
