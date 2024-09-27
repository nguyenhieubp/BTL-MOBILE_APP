import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/Redux/configs/hook";
import { fetchAttendances, postAttendance, setIsSuccess } from "@/Redux/slices/attendanceSlice";
import moment from "moment";
import * as SecureStore from 'expo-secure-store';

const DISTANCE = 50;

const haversineDistance = (
  coords1: { latitude: number; longitude: number },
  coords2: { latitude: number; longitude: number }
) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371e3;

  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);
  const deltaLat = toRad(coords2.latitude - coords1.latitude);
  const deltaLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(deltaLon / 2) *
    Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
};

const AttendanceScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, isSuccess } = useAppSelector((state) => state.attendances);
  const listAttendance = useAppSelector((state) => state.attendances.attendances);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(true); // State để kiểm tra vị trí
  const [hasCheckedAttendance, setHasCheckedAttendance] = useState(false);
  
  // latitude:  21.04130091049479,
  // longitude: 105.7425941891184,

  const targetCoords = {
    latitude:  37.4216863,
    longitude: -122.0842771,
  };

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsCheckingLocation(false); // Kết thúc quá trình kiểm tra vị trí
        return;
      }

      try {
        setIsCheckingLocation(true); // Bắt đầu kiểm tra vị trí
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setIsCheckingLocation(false); // Xác định xong vị trí
      } catch (error) {
        setErrorMsg("Failed to get location");
        setIsCheckingLocation(false); // Kết thúc quá trình kiểm tra vị trí
      }
    };

    const checkAttendanceStatus = async () => {
      await dispatch(fetchAttendances()); // Đảm bảo danh sách điểm danh đã được lấy từ API
      
      setHasCheckedAttendance(true); // Đã kiểm tra xong trạng thái điểm danh
    };
    
    getLocation();
    checkAttendanceStatus();
  }, []); // Sử dụng listAttendance từ Redux

  
  
  
  useEffect(() => {
    if (listAttendance.length > 0) {
      const today = moment().format("YYYY-MM-DD");
      const attendanceToday = listAttendance.find(
        (item) => item.date === today && item.attended === true
      );
  
      if (attendanceToday) {
        dispatch(setIsSuccess(true)); // Đã điểm danh
      } else {
        dispatch(setIsSuccess(false)); // Chưa điểm danh
      }
    }
  }, [listAttendance, dispatch]);
  

  const handleAttendance = async () => {
    if (loading || isCheckingLocation) {
      Alert.alert(
        "Đang tải vị trí",
        "Vui lòng đợi trong khi chúng tôi đang lấy vị trí của bạn."
      );
      return;
    }

    if (location) {
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const distance = haversineDistance(userCoords, targetCoords);

      if (distance <= DISTANCE) {
        try {
          await dispatch(postAttendance()).unwrap();
          Alert.alert(
            "Điểm danh thành công",
            // `Bạn đang ở trong phạm vi ${Math.round(distance)} mét.`
          );
          dispatch(setIsSuccess(true));
        } catch (error) {
          Alert.alert(
            "Điểm danh thất bại",
            "Có lỗi xảy ra khi điểm danh. Vui lòng thử lại."
          );
          dispatch(setIsSuccess(false));
        }
      } else {
        Alert.alert(
          "Không thể điểm danh",
          `Bạn đang ở ngoài phạm vi 50 mét. Khoảng cách hiện tại: ${Math.round(distance)} mét.`
        );
        dispatch(setIsSuccess(false));
      }
    } else {
      Alert.alert("Không thể xác định vị trí", "Vui lòng thử lại.");
      dispatch(setIsSuccess(false));
    }
  };

  return (
    <View style={styles.container}>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      {isCheckingLocation ? ( // Hiển thị loading khi chưa xác định xong vị trí
        <ActivityIndicator size="large" color="#007BFF" />
      ) : !hasCheckedAttendance ? (
        <Text style={styles.loading}>Đang kiểm tra trạng thái điểm danh...</Text>
      ) : (
        <View>
          {isSuccess ? (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAttendance}
                disabled={loading || isSuccess}
              >
                <FontAwesome name="unlock-alt" size={100} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "bold",
                  color: "green",
                  textAlign: "center",
                }}
              >
                Đã Điểm Danh
              </Text>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAttendance}
                disabled={loading || isCheckingLocation}
              >
                <FontAwesome name="lock" size={100} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                }}
              >
                Chưa Điểm Danh
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loading: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },
});

export default AttendanceScreen;
