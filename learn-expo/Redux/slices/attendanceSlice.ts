import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from 'date-fns'; 
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

interface Attendance {
  attendance_id: number;
  date: string;  // Đảm bảo kiểu dữ liệu phù hợp
  attended: boolean;
}

type InitialState = {
  attendances: Attendance[];
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
};

const initialState: InitialState = {
  attendances: [],
  loading: false,
  error: null,
  isSuccess: false,
};


export const fetchAttendances = createAsyncThunk(
  "attendances/fetchAttendances",
  async (_, { rejectWithValue }) => {
    try {
      const userId = await SecureStore.getItemAsync('user_id');
      if (!userId) {
        return rejectWithValue('User ID not found');
      }
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/attendances/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const postAttendance = createAsyncThunk(
  "attendances/postAttendance",
  async () => {
    const userId = await SecureStore.getItemAsync('user_id');
    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/attendances/${userId}`);
    return response.data;
  }
);

const attendancesSlice = createSlice({
  name: "attendances",
  initialState,
  reducers: {
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendances.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.attendances = action.payload;
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch attendances";
      })
      .addCase(postAttendance.fulfilled, (state, action: PayloadAction<Attendance>) => {
        state.isSuccess = true;
      
        // Điều chỉnh định dạng date về 'YYYY-MM-DD' như trong fetchAttendances
        const formattedAttendance = {
          ...action.payload,
          date: format(new Date(action.payload.date), 'yyyy-MM-dd'),  // Định dạng lại ngày
        };
      
        state.attendances.push(formattedAttendance);  // Thêm vào danh sách
      })
      .addCase(postAttendance.rejected, (state) => {
        state.isSuccess = false;
      });
  },
});

export const { setIsSuccess } = attendancesSlice.actions;
export default attendancesSlice.reducer;
