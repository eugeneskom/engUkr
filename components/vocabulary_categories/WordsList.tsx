import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type WordItem = {
  eng: string;
  ukr: string;
  id: number;
};

type WordsListProps = {
  data: WordItem[];
};

const WordList = ({ data }: WordsListProps) => {
  const renderItem = ({ item }: { item: WordItem }) => (
    <View style={styles.item}>
      <Text style={styles.word}>{item.ukr}</Text>
      <Text style={styles.word}>{item.eng}</Text>
    </View>
  );

  return <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: '50%',
    flex:1,
  },
  word: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WordList;
