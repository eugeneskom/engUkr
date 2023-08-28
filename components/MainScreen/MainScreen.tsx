import React from "react";
import MatchWords from "../MatchWords/MatchWords";
import { Text } from "react-native";
import { matchWordObjType } from "../../types/types";
import VocabularyCategories from "../vocabulary_categories/VocabularyCategories";

const matchWordsArr: matchWordObjType[] = [
  { id: 0, ukr: "час", eng: "time" },
  { id: 1, ukr: "нічь", eng: "night" },
  { id: 2, ukr: "день", eng: "day" },
  { id: 3, ukr: "кіт", eng: "cat" },
  { id: 4, ukr: "собака", eng: "dog" },
  { id: 5, ukr: "дерево", eng: "tree" },
  { id: 6, ukr: "вода", eng: "water" },
  { id: 7, ukr: "вогонь", eng: "fire" },
  { id: 8, ukr: "книга", eng: "book" },
  { id: 9, ukr: "пень", eng: "stump" },
  { id: 10, ukr: "птах", eng: "bird" },
  { id: 11, ukr: "дорога", eng: "road" },
  { id: 12, ukr: "хмара", eng: "cloud" },
  { id: 13, ukr: "дим", eng: "smoke" },
  { id: 14, ukr: "море", eng: "sea" },
  { id: 15, ukr: "земля", eng: "earth" },
  { id: 16, ukr: "дощ", eng: "rain" },
  { id: 17, ukr: "сонце", eng: "sun" },
  { id: 18, ukr: "місяць", eng: "moon" },
  { id: 19, ukr: "зірка", eng: "star" },
];

function MainScreen() {
  return <VocabularyCategories />;
}

export default MainScreen;
