import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Header from "@/components/home/Header";
import Options from "@/components/home/Options";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Options />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 2,
    marginTop: 20
  },
});
