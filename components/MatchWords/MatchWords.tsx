import React from "react";
import { matchWordObjType } from "../../types/types";
import { Text, View,FlatList,SafeAreaView } from "react-native";


type MatchWordsProps = {
  words: matchWordObjType[];
};

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function MatchWords({ words }: MatchWordsProps) {
  const ukrWords = words.map((item) => ({ id: item.id, word: item.ukr }));
  const engWords = words.map((item) => ({ id: item.id, word: item.eng }));

  const shuffledUkrWords = shuffleArray(ukrWords);
  const shuffledEngWords = shuffleArray(engWords);

  console.log("shuffledUkrWords: ", shuffledUkrWords, "shuffledEngWords: ", shuffledEngWords);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <FlatList data={shuffledUkrWords} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Text>{item.word}</Text>} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList data={shuffledEngWords} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => <Text>{item.word}</Text>} />
      </View>
    </SafeAreaView>
  );
}
