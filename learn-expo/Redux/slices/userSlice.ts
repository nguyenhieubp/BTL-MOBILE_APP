import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface User {
  user_id: number;
  name: string;
  email: string;
  image: string;
  avatar_url: string; // Thêm trường avatar_url cho ảnh đại diện
}

// Tạo async action để fetch user từ API
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const userId = await SecureStore.getItemAsync('user_id');
  if (!userId) {
    throw new Error('User ID not found');
  }

  const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`);
  return response.data;
});


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ name, email, avatar_url }: { name: string; email: string; avatar_url: string }) => {
    const userId = await SecureStore.getItemAsync('user_id');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);

    // Nếu có avatar_url (tức là file ảnh), đính kèm vào formData
    if (avatar_url) {
      const file:any = {
        uri: avatar_url, // URI của ảnh từ ImagePicker
        type: 'image/jpeg', // Loại file (bạn có thể kiểm tra kiểu file từ ImagePicker)
        name: avatar_url.split('/').pop(), // Lấy tên file từ URI
      };
      formData.append('image', file);
    }

    const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Đặt header để gửi dạng multipart/form-data
      },
    });

    return response.data;
  }
);


// Async action để xử lý đăng nhập
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    console.log('==============',process.env.EXPO_PUBLIC_API_URL);
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, {
      email,
      password,
    });
    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/register`, {
      name,
      email,
      password,
    });
    return response.data;
  }
);



interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching user';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error logging in';
      });
  },
});

export default userSlice.reducer;
