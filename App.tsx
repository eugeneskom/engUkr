import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, TouchableOpacity } from "react-native";
import WordsBuilder from "./components/WordsBuilder/WordsBuilder";
import MatchWords from "./components/MatchWords/MatchWords";
import { matchWordObjType } from "./types/types";
import Preposition from "./components/Prepositions/Preposition";
import Registration from "./components/Authentication/Registration/Registration";
import Login from "./components/Authentication/Login/Login";
import UserContext from "./context/UserContext";
import MainScreen from "./components/MainScreen/MainScreen";
import Loader from "./components/loader/Loader";
const assembelWordArr = ["word", "blue", "green"];

const rowObj = [
  { id: 1, sentence: "I _ my homework", preposition: "did", choices: ["did", "made", "does", "make"] },
  { id: 2, sentence: "She went _ the park", preposition: "to", choices: ["to", "in", "at", "on"] },
  { id: 3, sentence: "We live _ an apartment", preposition: "in", choices: ["in", "at", "on", "to"] },
  { id: 4, sentence: "The book is _ the table", preposition: "on", choices: ["on", "under", "above", "beside"] },
  { id: 5, sentence: "He was born _ August", preposition: "in", choices: ["in", "on", "at", "during"] },
  { id: 6, sentence: "They arrived _ the airport", preposition: "at", choices: ["at", "to", "from", "on"] },
  { id: 7, sentence: "The keys are _ the drawer", preposition: "in", choices: ["in", "at", "under", "between"] },
  { id: 8, sentence: "She travels _ train", preposition: "by", choices: ["by", "with", "on", "through"] },
  { id: 9, sentence: "The meeting is _ 3 PM", preposition: "at", choices: ["at", "in", "on", "from"] },
  { id: 10, sentence: "He was hiding _ the bed", preposition: "under", choices: ["under", "behind", "below", "above"] },
];

const testWord = "hello";
const example = { ukr: "година", eng: "hour" };
const wordsToBuild = [
  { id: 0, ukr: "година", eng: "hour" },
  { id: 1, ukr: "місяць", eng: "month" },
  { id: 2, ukr: "тиждень", eng: "week" },
  { id: 3, ukr: "хвилина", eng: "minute" },
  { id: 4, ukr: "рік", eng: "year" },
];



const Stack = createStackNavigator();

export default function App() {
  const [userStatus, setUserStatus] = useState("loading");

  const handleIsLoggedIn = async (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      await AsyncStorage.setItem("isLoggedIn", "true");
    } else {
      await AsyncStorage.setItem("isLoggedIn", "false");
    }

    const setItem = await AsyncStorage.getItem("isLoggedIn");
    console.log("SET_ITEM: ", setItem);
    checkUserStatus();
  };

  const removeIsLoggedIn = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
  };

  // Check user authentication status
  const checkUserStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        setUserStatus("loggedIn");
      } else if (isLoggedIn === "false") {
        setUserStatus("registered");
      } else {
        setUserStatus("notRegistered");
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  useEffect(() => {
    // removeIsLoggedIn()
    checkUserStatus();
  }, []);

  console.log("userStatus:", userStatus);

  return (
    <UserContext.Provider value={{ userStatus, handleIsLoggedIn, checkUserStatus }}>
      <NavigationContainer>
        <Stack.Navigator>
          {userStatus === "loading" && <Stack.Screen name="Loading" component={Loader} />}
          {userStatus === "notRegistered" && <Stack.Screen name="Registration" component={Registration} />}
          {userStatus === "registered" && <Stack.Screen name="Login" component={Login} />}
          {userStatus === "loggedIn" && <Stack.Screen name="Main Screen" component={MainScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
  // return (
  //   <View style={{flexDirection:"column"}}>
  //     <View style={styles.container}>
  //       {/* <Registration/> */},
  //       {/* <MatchWords words={matchWordsArr} /> */}
  //       {/* <Preposition prepRows={rowObj}/> */}
  //       {/* <WordsBuilder set={wordsToBuild} /> */}
  //     </View>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
