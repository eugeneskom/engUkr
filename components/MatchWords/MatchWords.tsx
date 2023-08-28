import React, { useState, useEffect } from "react";
import { matchWordObjType } from "../../types/types";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import ProgressBar from "../ProgressBar/ProgressBar";

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

let PAGE_INDEX = 0,
  COUNT = 0,
  WORDS_PER_PAGE = 5,
  ANSWERED_CORRECT = 0;
  
export default function MatchWords({ words }: MatchWordsProps) {
  // Need to make the componen work as the Prepositions one, after completing first set of words
  // need to show another list, as many times as required
  const ukrWords = words.map((item) => ({ id: item.id, word: item.ukr, lang: "ukr" }));
  const engWords = words.map((item) => ({ id: item.id, word: item.eng, lang: "eng" }));
  const shuffledUkrWords = shuffleArray(ukrWords.slice(WORDS_PER_PAGE * COUNT, WORDS_PER_PAGE * COUNT + 5));
  const shuffledEngWords = shuffleArray(engWords.slice(WORDS_PER_PAGE * COUNT, WORDS_PER_PAGE * COUNT + 5));

  const [ukrWordsKist, setUkrWordsList] = useState(shuffledUkrWords);
  const [engWordsKist, setEngWordsList] = useState(shuffledEngWords);
  const [activeUkrId, setActiveUkrId] = useState<string | null>(null);
  const [activeEngId, setActiveEngId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // console.log("Selected words ids", shuffledUkrWords, shuffledEngWords, activeUkrId, activeEngId);

  console.log("COUNT: ", COUNT);
  useEffect(() => {
    console.log('shuffledUkrWords: ',shuffledUkrWords)
    setUkrWordsList(shuffledUkrWords);
    setEngWordsList(shuffledEngWords);

    return () => {};
  }, [COUNT]);

  const wordSelectHandler = (id: string, word: string, index: number, lang: string) => {
    console.log("word:", word);
    console.log("id:", id);
    console.log("lang:", lang);

    if (lang === "ukr") {
      setActiveUkrId(id);
      if (activeEngId === id) {
        if (ukrWordsKist.length === 1 && engWordsKist.length === 1) {
          // setUkrWordsList([]);
          // setEngWordsList([]);
          // setIsCompleted(true);
          COUNT++;
        } else {
          setUkrWordsList((prev) => prev.filter((word) => word.id !== id));
          setEngWordsList((prev) => prev.filter((word) => word.id !== id));
        }
        ANSWERED_CORRECT++;

      }
    } else if (lang === "eng") {
      setActiveEngId(id);
      if (activeUkrId === id) {
        if (ukrWordsKist.length === 1 && engWordsKist.length === 1) {
          COUNT++;
          // setUkrWordsList([]);
          // setEngWordsList([]);
          // setIsCompleted(true);
        } else {
          setUkrWordsList((prev) => prev.filter((word) => word.id !== id));
          setEngWordsList((prev) => prev.filter((word) => word.id !== id));
        }
        ANSWERED_CORRECT++;
      }
    }
  };

  const renderItem = ({ item, index }: { item: { id: string; word: string; lang: string }, index: number }) => {
    return (
      <TouchableOpacity style={Styles.item} onPress={() => wordSelectHandler(item.id, item.word, index, item.lang)}>
        <Text>{item.word}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: string, index: number) => {
    // Use the index as the key
    return index.toString();
  };

  return (
    <>
      <ProgressBar total={words.length} answered={ANSWERED_CORRECT}/>
      <Text>Match words</Text>
      {isCompleted && <Text>Good job, you've completed the excercise!</Text>}
      <SafeAreaView style={{ flex: 1, flexDirection: "row", padding: 20 }}>
        <View style={{ flex: 1 }}>
          <FlatList style={Styles.list} data={ukrWordsKist} keyExtractor={keyExtractor} renderItem={renderItem} />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList style={Styles.list} data={engWordsKist} keyExtractor={keyExtractor} renderItem={renderItem} />
        </View>
      </SafeAreaView>
    </>
  );
}

const Styles = StyleSheet.create({
  list: {
    columnGap: 10,
    rowGap: 10,
  },

  item: {
    backgroundColor: "#eee",
    padding: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
