import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import { wordTranslation } from "../types/types";

type wordsBuilderProps = {
  set: wordTranslation;
};

// for long words would be great to have a functionality that will display only unique letters,
// and if they repeats just display a number above the letter saying home many such letters we have

let buildingBowrd = ""; // this will be a word that is being build when user is picking letters correctly
export default function WordsBuilder({ set: { ukr, eng } }: wordsBuilderProps) {
  const [count, setCount] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(-1);
  const [isLetterMatch, setIsLetterMatch] = useState(false);
  const [engWordArr, setEngWordArr] = useState<string[]>([]);

  const mixLettersArrayHandler = (eng: string): string[] => {
    const letters = eng.split("");
    const mixedLetters = letters.sort(() => Math.random() - 0.5);
    return mixedLetters;
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const checkLetterHandler = (letter: string, index: number) => {
    setActiveLetterIndex(index); // setting active index helps to add class to the pressed letter
    const letterMatch = eng[count] === letter;
    setIsLetterMatch(letterMatch);

    if (letterMatch) {
      buildingBowrd += letter;
      setEngWordArr(prev => prev.filter((_, i) => i !== index));// removing pressed btn
      incrementCount(); // when the letter is matched, we encrice the counter to track the next letter user needs to input
    }

    setTimeout(() => {
      // removes active class from the pressed letter in the provided time below
      setActiveLetterIndex(-1);
    }, 500);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      // Render each letter here
      <TouchableOpacity style={[stylesItems.itemContainer]} onPress={() => checkLetterHandler(item, index)}>
        <Text style={[stylesItems.itemText, index === activeLetterIndex && isLetterMatch && stylesItems.match, index === activeLetterIndex && !isLetterMatch && stylesItems.doesntMatch]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: string, index: number) => {
    // Use the index as the key
    return index.toString();
  };

  useEffect(() => {
    setEngWordArr(mixLettersArrayHandler(eng));
    return () => {};
  }, []);

  return (
    <>
      <View>
        <Text>{ukr}</Text>
      </View>
      <View>
        <Text>{buildingBowrd}</Text>
      </View>
      <View style={flatListStyles.listContainer}>
        <FlatList style={flatListStyles.list} keyExtractor={keyExtractor} data={engWordArr} renderItem={renderItem} horizontal={true} />
      </View>
    </>
  );
}

const flatListStyles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    // flex: 1,
  },
});

const stylesItems = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#ebebeb",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    height: 50,
  },
  match: {
    backgroundColor: "yellow", // Change the color to your desired active color
  },
  doesntMatch: {
    backgroundColor: "red",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeItemText: {
    color: "red", // Change the color to your desired active color
  },
});
