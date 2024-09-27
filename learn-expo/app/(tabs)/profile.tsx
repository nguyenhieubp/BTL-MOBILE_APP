import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Button, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAppDispatch, useAppSelector } from "@/Redux/configs/hook";
import { fetchAttendances } from "@/Redux/slices/attendanceSlice";
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system'; // Thư viện để lưu file
import * as Sharing from 'expo-sharing'; // Thư viện để chia sẻ file

type AttendanceData = {
  [date: string]: {
    marked: boolean;
    dotColor: string;
  };
};

const AttendanceCalendar = () => {
  const dispatch = useAppDispatch();
  const [attendanceDates, setAttendanceDates] = useState<AttendanceData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const data = useAppSelector((state) => state.attendances.attendances);
  const [userId, setUserId] = useState<string | null>(null);

  // Format the data to fit Calendar's markedDates prop
  const formatData = (data: { date: string; attended: boolean }[]): AttendanceData => {
    return data.reduce((acc: AttendanceData, item: { date: string; attended: boolean }) => {
      acc[item.date] = {
        marked: true,
        dotColor: item.attended ? "green" : "red",
      };
      return acc;
    }, {});
  };

  // Hàm gọi API để xuất Excel
  const exportToExcel = async () => {
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy user ID');
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/export/attendances`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        throw new Error('Lỗi khi tải file Excel');
      }

      // Lấy dữ liệu nhị phân từ file Excel
      const blob = await response.blob();
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      // Lưu file Excel vào bộ nhớ của điện thoại
      const fileUri = `${FileSystem.documentDirectory}attendances.xlsx`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data?.split(',')[1], {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Chia sẻ file đã lưu
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Alert.alert('Lỗi', 'Xuất file không thành công');
    }
  };

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      await dispatch(fetchAttendances()).unwrap(); // Sử dụng unwrap để lấy dữ liệu hoặc ném lỗi
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      Alert.alert('Lỗi', 'Không thể lấy dữ liệu điểm danh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserIdAndFetchAttendance = async () => {
      try {
        const fetchedUserId = await SecureStore.getItemAsync('user_id');
        if (fetchedUserId) {
          setUserId(fetchedUserId); // Lưu userId để sử dụng khi xuất file Excel
          await fetchAttendanceData();
        } else {
          console.error("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching user ID or attendance data:", error);
      }
    };

    getUserIdAndFetchAttendance();
  }, []);

  useEffect(() => {
    if (!loading) {
      const formattedData = formatData(data);
      setAttendanceDates(formattedData);
    }
  }, [data, loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Calendar
        markingType={"dot"}
        markedDates={attendanceDates}
        theme={{
          "stylesheet.dot": {
            dot: {
              width: 10,
              height: 10,
              borderRadius: 5,
            },
          },
        }}
      />
      <Button
        title="Xuất file Excel"
        onPress={exportToExcel}
      />
    </View>
  );
};

export default AttendanceCalendar;
