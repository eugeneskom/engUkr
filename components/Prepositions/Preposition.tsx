import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Button } from "react-native";
import ProgressBar from "../ProgressBar/ProgressBar";

// FUTURE TASK
// Need to add functionality that will alow me to show the progress (percentage) right away,
// but still stay on the same screen until user clicks next btn


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
  const [currentRow, setCurrentRow] = useState<preposObj>(prepRows[0]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentRow(rows[count]);
    setCorrectAnser(rows[count].preposition);
    setIsFinished(false);
    return () => {
      // Cleanup function
    };
  }, [count]);

  const selectPrepHandler = (preposition: string) => {
    const rowsNumber = rows.length - 1;
    const isCorrect = correctAnswer === preposition;
    if (isCorrect && count < rowsNumber) {
      setCurrentRow((prevRow) => {
        return { ...prevRow, sentence: prevRow.sentence.replace("_", preposition) };
      });
      setTimeout(() => {
        setCount(count + 1);
      }, 300);
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

  const handleNext = () => {
    console.log("next");
  };

  return (
    <>
      {!isFinished ? (
        <View style={Styles.container}>
          <ProgressBar total={rows.length} answered={count} />
          <View style={Styles.content}>
            <Text>{currentRow.sentence}</Text>
            <FlatList data={currentRow.choices} keyExtractor={keyExtractor} renderItem={renderItem} />
          </View>
          <View>
            <Button style={Styles.nextBtn} title="Click Me!" onPress={handleNext} color="#007AFF" />
          </View>
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
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FD9317",
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    height: 400
  },
  item: {
    padding: 20,
    backgroundColor: "#eee",
    margin: 10,
  },
  list:{
    marginBottom: 20,
  },
  nextBtn: {
    borderRadius: 20
  },
};
