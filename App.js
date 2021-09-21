import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Slots from "./components/Slots";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Slots />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222831",
    height: "100%",
  },
});
