import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false,tabBarActiveTintColor: Colors.PRIMARY }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="employee"
        options={{
          tabBarLabel: "Employee",
          tabBarIcon: ({ color }) => (
            <Ionicons name="accessibility" size={24} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="user"
        options={{
          tabBarLabel: "user",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;
