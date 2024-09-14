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
    if (name.trim() && email.trim() && password.trim()) {
      try {
        await dispatch(registerUser({ name, email, password })).unwrap();
        Alert.alert("Thành công", "Đăng ký thành công!");
        router.replace("/login"); // Chuyển về trang đăng nhập sau khi đăng ký thành công
      } catch (error) {
        Alert.alert("Error", "Đăng ký thất bại.");
      }
    } else {
      Alert.alert("Error", "Vui lòng nhập đầy đủ thông tin.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <View style={styles.inner}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
          >
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
          <Pressable style={{marginTop: 20,display: 'flex',flexDirection: 'row'}} onPress={()=>router.back()}>
            <Text>Bạn đã có tài khoản</Text>
            <Text style={{color: 'red'}}> Đăng Nhập</Text>
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
    margin: 16,
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
});
