import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ListNews from "./ListNews";
import { useAppSelector } from "@/Redux/configs/hook";

const Options = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const data = useAppSelector((state) => state.user.user);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options = { timeZone: "Asia/Bangkok", hour12: false };
    const time = date.toLocaleTimeString("vi-VN", options);
    const day = date.toLocaleDateString("vi-VN", options);
    return `${day} ${time}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>Hôm nay: {formatTime(currentTime)}</Text>
      <View style={styles.newsSection}>
        <Text style={styles.title}>Tin Tức Nổi Bật</Text>
        <ListNews />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  timeText: {
    fontSize: 18,
  },
  newsSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default Options;
