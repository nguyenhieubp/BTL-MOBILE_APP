import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import attendancesReducer from '../slices/attendanceSlice'

const store = configureStore({
  reducer: {
    user: userSlice, // Chú ý tên reducer phải khớp với tên bạn sử dụng trong slices,
    attendances: attendancesReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
