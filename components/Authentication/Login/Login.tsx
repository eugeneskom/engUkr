import React, { useState, useContext } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import axios from "axios";
import UserContext from "../../../context/UserContext";

function Login() {
  const { handleIsLoggedIn } = useContext(UserContext); // Get the function from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.0.106:3000/login", {
        email,
        password,
      });

      // console.log(response)
      if (response.status == 200) {
        handleIsLoggedIn(true);
      }

      // Handle response from the server (e.g., show success message)
      console.log("Registration success:", response);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.log("Registration failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

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

export default Login;
