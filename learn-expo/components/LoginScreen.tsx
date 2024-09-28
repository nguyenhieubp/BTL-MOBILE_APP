import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Pressable,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useAppDispatch } from "@/Redux/configs/hook";
import { loginUser } from "@/Redux/slices/userSlice";
import * as LocalAuthentication from "expo-local-authentication";
import { Colors } from "@/constants/Colors";

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserName = async () => {
      const storedName = await SecureStore.getItemAsync("user_id");
      if (storedName) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Xác thực sinh trắc học để tiếp tục",
        });

        if (result.success) {
          router.replace("/(tabs)/home");
        } else {
          Alert.alert("Xác thực thất bại", "Vui lòng đăng nhập lại.");
        }
      }
    };

    checkUserName();
  }, []);

  const handleLogin = async () => {
    if (name.trim() && password.trim()) {
      try {
        const result = await dispatch(loginUser({ email: name, password })).unwrap();
        await SecureStore.setItemAsync("user_id", result.user_id.toString());
        setPassword("");
        setName("");
        router.replace("/(tabs)/home");
      } catch (error) {
        Alert.alert("Error", "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
      <View style={{alignItems: 'center'}}>
      <Image
            style={styles.logo}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSni4W_ssx3U1KqS7a7wY_Q4NVU2hW3CP-1jA&s",
            }}
          />
      </View>
      <View style={styles.inner}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}
          >
            Phần mềm chấm công 
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
        <Pressable
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Pressable onPress={handleLogin}>
            <Text style={{ color: "white", textAlign: "center" }}>Đăng Nhập</Text>
          </Pressable>
        </Pressable>

        <TouchableOpacity
          style={{ marginTop: 20, alignItems: "center" }}
          onPress={() => router.push("/(auth)/register")} // Chuyển tới màn hình đăng ký
        >
          <Text style={{ color: Colors.PRIMARY }}>Đăng ký tài khoản</Text>
        </TouchableOpacity>
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

  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
