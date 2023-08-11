import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import WordsBuilder from "./components/WordsBuilder/WordsBuilder";
import MatchWords from "./components/MatchWords/MatchWords";
import { matchWordObjType } from "./types/types";
import Preposition from "./components/Prepositions/Preposition";
import Registration from "./components/Authentication/Registration/Registration";
const assembelWordArr = ["word", "blue", "green"];

const matchWordsArr: matchWordObjType[] = [
  { id: 0, ukr: "час", eng: "time" },
  { id: 1, ukr: "нічь", eng: "night" },
  { id: 2, ukr: "день", eng: "day" },
  { id: 3, ukr: "кіт", eng: "cat" },
  { id: 4, ukr: "собака", eng: "dog" },
  { id: 5, ukr: "дерево", eng: "tree" },
  { id: 6, ukr: "вода", eng: "water" },
  { id: 7, ukr: "вогонь", eng: "fire" },
  { id: 8, ukr: "книга", eng: "book" },
  { id: 9, ukr: "пень", eng: "stump" },
  { id: 10, ukr: "птах", eng: "bird" },
  { id: 11, ukr: "дорога", eng: "road" },
  { id: 12, ukr: "хмара", eng: "cloud" },
  { id: 13, ukr: "дим", eng: "smoke" },
  { id: 14, ukr: "море", eng: "sea" },
  { id: 15, ukr: "земля", eng: "earth" },
  { id: 16, ukr: "дощ", eng: "rain" },
  { id: 17, ukr: "сонце", eng: "sun" },
  { id: 18, ukr: "місяць", eng: "moon" },
  { id: 19, ukr: "зірка", eng: "star" },
];


const testWord = "hello";
const example = { ukr: "година", eng: "hour" };
const wordsToBuild = [
  { id: 0, ukr: "година", eng: "hour" },
  { id: 1, ukr: "місяць", eng: "month" },
  { id: 2, ukr: "тиждень", eng: "week" },
  { id: 3, ukr: "хвилина", eng: "minute" },
  { id: 4, ukr: "рік", eng: "year" },
];

const rowObj = [
  { id: 1, sentence: "I _ my homework", preposition: "did", choices: ["did", "made", "does", "make"] },
  { id: 2, sentence: "She went _ the park", preposition: "to", choices: ["to", "in", "at", "on"] },
  { id: 3, sentence: "We live _ an apartment", preposition: "in", choices: ["in", "at", "on", "to"] },
  { id: 4, sentence: "The book is _ the table", preposition: "on", choices: ["on", "under", "above", "beside"] },
  { id: 5, sentence: "He was born _ August", preposition: "in", choices: ["in", "on", "at", "during"] },
  { id: 6, sentence: "They arrived _ the airport", preposition: "at", choices: ["at", "to", "from", "on"] },
  { id: 7, sentence: "The keys are _ the drawer", preposition: "in", choices: ["in", "at", "under", "between"] },
  { id: 8, sentence: "She travels _ train", preposition: "by", choices: ["by", "with", "on", "through"] },
  { id: 9, sentence: "The meeting is _ 3 PM", preposition: "at", choices: ["at", "in", "on", "from"] },
  { id: 10, sentence: "He was hiding _ the bed", preposition: "under", choices: ["under", "behind", "below", "above"] },
];


export default function App() {
  return (
    <View style={{flexDirection:"column"}}>
      <View style={styles.container}>
        <Registration/>
        {/* <MatchWords words={matchWordsArr} /> */}
        {/* <Preposition prepRows={rowObj}/> */}
        {/* <WordsBuilder set={wordsToBuild} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,

  },
});
