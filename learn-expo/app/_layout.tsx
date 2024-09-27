import { Stack, Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/Redux/configs/store";
import { SafeAreaView, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Thêm padding 20 cho toàn bộ layout
  },
});