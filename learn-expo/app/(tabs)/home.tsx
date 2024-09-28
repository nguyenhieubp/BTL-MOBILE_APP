import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Header from "@/components/home/Header";
import Options from "@/components/home/Options";
import useBiometricAuth from "../(auth)/useBiometricAuth";

export default function HomeScreen() {
   useBiometricAuth();
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
