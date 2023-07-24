import React, { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, Text, View, TouchableOpacity } from "react-native";

const prepositions = [
  { id: 1, sentence: "I _ my homework", preposition: "did", choices: ["did", "made", "does", "make"] },
  { id: 2, sentence: "She went _ the park", preposition: "to", choices: ["to", "in", "at", "on"] },
  { id: 3, sentence: "We live _ an apartment", preposition: "in", choices: ["in", "at", "on", "to"] },
];

type preposObj = {
  id: number;
  sentence: string;
  preposition: string;
  choices: string[];
};

export default function Preposition() {
  const [row, setRow] = useState<preposObj>(prepositions[0]);
  // useEffect(() => {
  //   const getPrepositionExc = async () => {
  //     const response = await axios.get("http://localhost:3000/exercise_sentences");
  //     console.log(response.data.rows);
  //   };

  //   // getPrepositionExc();

  //   return () => {};
  // }, []);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity  onPress={() => console.log(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: string, index: number) => {
    // Use the index as the key
    return index.toString();
  };

  return (
    <View>
      <Text>{row.sentence}</Text>
      <FlatList  data={row.choices} keyExtractor={keyExtractor} renderItem={renderItem} />
    </View>
  );
}


const Styles = {
  view: {
    flex:1,
  }
}