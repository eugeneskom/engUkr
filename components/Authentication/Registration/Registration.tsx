import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    // Perform registration logic here
    try {

      // {
      //   email,
      //   username: `${firstName} ${lastName}`,
      //   password
      // }
    
      const response = await axios.get("http://localhost:3000/exercise_sentences");

      // console.log(response)

      // Handle response from the server (e.g., show success message)
      console.log("Registration success:", response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.log("Registration failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 100,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  registerButton: {
    backgroundColor: "blue", // Custom background color
    color: "white", // Custom text color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "stretch", // Ensure the button stretches across the parent
    alignItems: "center", // Center the button's content horizontally
    flex: 1,
  },
  buttonText: {
    color: "white", // Custom text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Registration;
