import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import WordList from "./WordsList";

type vocabCategory = {
  id?: number;
  img: string;
  category_name: string; // Adjust the property name according to your API response
  onPress: (category: string) => void;
};

const Card = ({ img, category_name, onPress }: vocabCategory) => {
  console.log("Card", img);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(category_name)}>
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.title}>{category_name}</Text>
    </TouchableOpacity>
  );
};

function VocabularyCategories() {
  const [categories, setCategories] = useState<vocabCategory[]>([]);
  const [isCategOpen, setIsCategoryOpen] = useState(false);
  const [categoryWords, setCategoryWords] = useState([])

  const getVocabCategories = async () => {
    try {
      const response = await axios.get("http://192.168.0.106:3000/vocabulary_categories");

      if (response.status === 200) {
        setCategories(response.data);
      }

      // console.log("categories success:", response);
    } catch (error) {
      console.log("categories failed:", error);
    }
  };

  const openCategoryVocab = async (category: string) => {
    await getCategoryWords(category);
    setIsCategoryOpen(true);
  };

  const getCategoryWords = async (category: string) => {
    try {
      const response = await axios.get("http://192.168.0.106:3000/getWordsByCategory", {
        params: {
          category: category,
        },
      });

      if (response.status === 200) {
        const words = response.data;
        setCategoryWords(response.data)
        console.log("Words:", words);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getVocabCategories();
    // getCategoryWords("idioms");
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isCategOpen && categories.map((category) => (
        <Card onPress={openCategoryVocab} key={category.id} img={category.img} category_name={category.category_name} />
      ))}
      {isCategOpen && (
        <WordList data={categoryWords}/>
      )}
    </ScrollView>
  );
}

export default VocabularyCategories;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    margin: 10,
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
});
