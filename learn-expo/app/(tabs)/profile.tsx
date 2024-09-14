import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAppDispatch, useAppSelector } from "@/Redux/configs/hook";
import { fetchAttendances } from "@/Redux/slices/attendanceSlice";
import * as SecureStore from 'expo-secure-store';

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

  // Format the data to fit Calendar's markedDates prop
  const formatData = (
    data: { date: string; attended: boolean }[]
  ): AttendanceData => {
    return data.reduce(
      (acc: AttendanceData, item: { date: string; attended: boolean }) => {
        acc[item.date] = {
          marked: true,
          dotColor: item.attended ? "green" : "red",
        };
        return acc;
      },
      {}
    );
  };

  // Fetch attendance data from API
  // Fetch attendance data from API
  const fetchAttendanceData = async (userId: string) => {
    setLoading(true); // Hiển thị trạng thái loading khi đang lấy dữ liệu
    try {
      // Truyền userId khi dispatch action
      dispatch(fetchAttendances());
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const getUserIdAndFetchAttendance = async () => {
      try {
        console.log("Fetching user ID...");
        const userId = await SecureStore.getItemAsync('user_id');
        console.log("User ID:", userId);
        if (userId) {
          console.log("Fetching attendance data for user ID:", userId);
          await fetchAttendanceData(userId);
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
    // Update attendanceDates when data changes
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
    </View>
  );
};

export default AttendanceCalendar;
