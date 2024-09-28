import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { fetchUser, updateUser } from '@/Redux/slices/userSlice';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch, useAppSelector } from '@/Redux/configs/hook';

const EditUserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.user);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUser()); // Lấy user có id 1
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar_url);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Name and email cannot be empty');
      return;
    }

    setIsSaving(true); // Hiển thị trạng thái loading khi đang lưu

    try {
      await Promise.all([
        dispatch(updateUser({ name, email, avatar_url: avatar || '' })),
        router.back(), // Điều hướng nhanh trước khi lưu
      ]);
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update user');
    } finally {
      setIsSaving(false); // Dừng trạng thái loading
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission required',
        'You need to grant permission to access your gallery'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    } else {
      Alert.alert('Error', 'No image selected or something went wrong');
    }
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        'Permission required',
        'You need to grant permission to access your camera'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    } else {
      Alert.alert('Error', 'No photo taken or something went wrong');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
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
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin người dùng</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar ||  `${process.env.EXPO_PUBLIC_API_URL}/${user.image
            ?.split("\\")
            ?.join("/")}` }} // Sử dụng avatar từ state hoặc ảnh mặc định
          style={styles.avatar}
        />
        <View style={styles.avatarButtons}>
          <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
            <Text style={styles.buttonText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickImage} style={styles.button}>
            <Text style={styles.buttonText}>Bộ sưu tập</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text>Tên:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Button title="Lưu" onPress={handleSave} disabled={isSaving} />
      {isSaving && <ActivityIndicator size="large" color="#007BFF" />}
      <View style={{marginTop: 10}}></View>
      <Button  title="Hủy" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditUserProfile;
