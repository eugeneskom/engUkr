import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { wordTranslation } from "../../types/types";

type wordsBuilderProps = {
  set: wordTranslation[];
};

// for long words would be great to have a functionality that will display only unique letters,
// and if they repeats just display a number above the letter saying home many such letters we have

let buildingBowrd = ""; // this will be a word that is being build when user is picking letters correctly
export default function WordsBuilder({ set }: wordsBuilderProps) {
  const [count, setCount] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(-1);
  const [isLetterMatch, setIsLetterMatch] = useState(false);
  const [engWordArr, setEngWordArr] = useState<string[]>([]);
  const [isWordCompeleted, setIsWordCompleted] = useState(false);
  const [currentWordId, setCurrentWordId] = useState(0);
  const [currentWords, setCurrentWords] = useState({
    eng: "",
    ukr: "",
  });


  const mixLettersArrayHandler = (eng: string): string[] => {
    try {
      if (eng.length <= 1) {
        return eng.split(""); // if the string is one character or less, just return it
      }
  
      let letters = eng.split("");
      let mixedLetters;
  
      do {
        mixedLetters = [...letters].sort(() => Math.random() - 0.5);
      } while (eng === mixedLetters.join(""));
  
      return mixedLetters;
    } catch (error) {
      console.error("Error in mixLettersArrayHandler:", error);
      return []; // Return an empty array in case of an error
    }
  };
  

  const incrementCount = () => {
    setCount(count + 1);
  };

  const checkLetterHandler = (letter: string, index: number) => {
    setActiveLetterIndex(index); // setting active index helps to add class to the pressed letter
    const letterMatch = currentWords.eng[count] === letter;
    setIsLetterMatch(letterMatch);

    if (letterMatch) {
      setEngWordArr((prev) => prev.filter((_, i) => i !== index)); // removing pressed btn
      buildingBowrd += letter;
      if (buildingBowrd.length === currentWords.eng.length) {
        setIsWordCompleted(true);
      }
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
    const currentWordEng = set[currentWordId].eng;
    const currentWordUkr = set[currentWordId].ukr;
    setCurrentWords({ eng: currentWordEng, ukr: currentWordUkr });
    setEngWordArr(mixLettersArrayHandler(currentWordEng));
    return () => {};
  }, [currentWordId]);

  // console.log('currentWords.eng',currentWords.eng, 'currentWords.ukr',currentWords.ukr)

  return (
    <SafeAreaView style={{ alignContent: "center", justifyContent: "center" }}>
      <View>
        <Text>{currentWords?.ukr}</Text>
      </View>
      {isWordCompeleted && (
        <View>
          <Text>Hooray motherfucka, the word is completed!</Text>
        </View>
      )}
      <View>
        <Text>{buildingBowrd}</Text>
      </View>
      {engWordArr.length > 0 && (
        <View style={flatListStyles.listContainer}>
          {/* <FlatList style={flatListStyles.list} keyExtractor={keyExtractor} data={engWordArr} renderItem={renderItem} horizontal={true} /> */}
        </View>
      )}
    </SafeAreaView>
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
