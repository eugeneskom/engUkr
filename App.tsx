import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import WordsBuilder from "./components/WordsBuilder/WordsBuilder";
import MatchWords from "./components/MatchWords/MatchWords";
import { matchWordObjType } from "./types/types";
import Preposition from "./components/Prepositions/Preposition";

const assembelWordArr = ["word", "blue", "green"];

const matchWordsArr: matchWordObjType[] = [
  { id: 0, ukr: "час", eng: "time" },
  { id: 1, ukr: "нічь", eng: "night" },
  { id: 2, ukr: "день", eng: "day" },
];

const testWord = "hello";
const example = { ukr: "година", eng: "hour" };

export default function App() {
  return (
    <View style={{flexDirection:"column"}}>
      <View style={styles.container}>
        {/* <MatchWords words={matchWordsArr} /> */}
        <Preposition/>
        {/* <WordsBuilder set={example} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,

  },
});
