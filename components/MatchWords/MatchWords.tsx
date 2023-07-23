import React, { useState,useEffect } from "react";
import { matchWordObjType } from "../../types/types";
import { Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

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
  const ukrWords = words.map((item) => ({ id: item.id, word: item.ukr, lang: "ukr" }));
  const engWords = words.map((item) => ({ id: item.id, word: item.eng, lang: "eng" }));
  const shuffledUkrWords = shuffleArray(ukrWords);
  const shuffledEngWords = shuffleArray(engWords);

  const [ukrWordsKist, setUkrWordsList] = useState(shuffledUkrWords);
  const [engWordsKist, setEngWordsList] = useState(shuffledEngWords);
  const [activeUkrId, setActiveUkrId] = useState<string | null>(null);
  const [activeEngId, setActiveEngId] = useState<string | null>(null);


  console.log("Selected words ids",shuffledUkrWords, shuffledEngWords, activeUkrId, activeEngId);
  // const wordSelectHandler = (id: string, word: string, index: number, lang: string) => {
  //   console.log("word:", word);
  //   console.log("id:", id);
  //   console.log("lang:", lang);
  //   if (lang == "ukr" && activeEngId) {
  //       if(id == activeEngId){
  //         setUkrWordsList(prev => prev.filter(word => word.id != Number(id)))
  //         setEngWordsList(prev => prev.filter(word => word.id != Number(id)))
  //       }
  //   }
  // };

  const wordSelectHandler = (id: string, word: string, index: number, lang: string) => {
    console.log("word:", word);
    console.log("id:", id);
    console.log("lang:", lang);
    
    if (lang === "ukr") {
      setActiveUkrId(id);
      if (activeEngId === id) {
        if (ukrWordsKist.length === 1 && engWordsKist.length === 1) {
          setUkrWordsList([]);
          setEngWordsList([]);
        } else {
          setUkrWordsList((prev) => prev.filter((word) => word.id !== id));
          setEngWordsList((prev) => prev.filter((word) => word.id !== id));
        }
      }
    } else if (lang === "eng") {
      setActiveEngId(id);
      if (activeUkrId === id) {
        if (ukrWordsKist.length === 1 && engWordsKist.length === 1) {
          setUkrWordsList([]);
          setEngWordsList([]);
        } else {
          setUkrWordsList((prev) => prev.filter((word) => word.id !== id));
          setEngWordsList((prev) => prev.filter((word) => word.id !== id));
        }
      }
    }
  };
  


  const renderItem = ({ item, index }: { item: { id: string; word: string }; index: number }) => {
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
      <Text>Match words</Text>
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

const Styles = {
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
};
