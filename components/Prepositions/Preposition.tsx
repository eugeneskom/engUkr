import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";

type preposObj = {
  id: number;
  sentence: string;
  preposition: string;
  choices: string[];
};

interface PrepositionProps {
  prepRows: preposObj[];
}

export default function Preposition({ prepRows }: PrepositionProps) {
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState<preposObj[]>(prepRows);
  const [correctAnswer, setCorrectAnser] = useState(rows[count].preposition);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [currentRow, setCurrentRow] = useState<preposObj>(prepRows[0]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentRow(rows[count]);
    setCorrectAnser(rows[count].preposition);
    setIsCorrect(null);
    setIsFinished(false);
    return () => {
      // Cleanup function
    };
  }, [count]);

  const selectPrepHandler = (preposition: string) => {
    const rowsNumber = rows.length - 1;
    const isCorrect = correctAnswer === preposition;
    setIsCorrect(isCorrect);

    if (isCorrect && count < rowsNumber) {
      setCurrentRow((prevRow) => {
        return { ...prevRow, sentence: prevRow.sentence.replace("_", preposition) };
      });
      setTimeout(() => {
        setCount(count + 1);
      }, 500);
    } else if (count >= rowsNumber) {
      setIsFinished(true);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity onPress={() => selectPrepHandler(item)}>
        <Text style={Styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: string, index: number) => {
    // Use the index as the key
    return index.toString();
  };

  return (
    <>
      {!isFinished ? (
        <View>
          {isCorrect === false && <Text>Wrong answer!</Text>}
          {isCorrect && <Text>Hooray, you did it!</Text>}
          <Text>{currentRow.sentence}</Text>
          <FlatList data={currentRow.choices} keyExtractor={keyExtractor} renderItem={renderItem} />
        </View>
      ) : (
        <View>
          <Text>The task is completed!</Text>
        </View>
      )}
    </>
  );
}

const Styles = {
  view: {
    flex: 1,
  },
  item: {
    padding: 20,
    backgroundColor: "#eee",
    margin: 10,
  },
};
