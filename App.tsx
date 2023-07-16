import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import WordsBuilder from "./components/WordsBuilder";

const assembelWordArr = ["word", "blue", "green"];

const testWord = "hello";
const example = { ukr: "година", eng: "hour" };

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WordsBuilder set={example} />
      {/* <FlatList keyExtractor={keyExtractor} data={testWord.split("")} renderItem={renderItem} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
