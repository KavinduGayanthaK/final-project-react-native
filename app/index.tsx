import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser, registerUser } from "@/reducers/UserSlice";
import { useDispatch, } from "react-redux";
import { User } from "@/model/User";
import { AppDispatch } from "@/store/store";
import { getToken, removeToken } from "@/sevice/TokenService";

export default function AuthScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Username and password are required.");
      return;
    }

    const user: User = { username, password };

    if (isSignUp) {
      await dispatch(registerUser(user));
    } else {
      await removeToken();
      await dispatch(loginUser(user));

      const token = await getToken();
      if (token) {
        router.replace("./home");
      }
    }

    // Wait a moment and check if token exists
    setTimeout(async () => {
      const storedToken = await getToken();
      console.log("Stored Token:", storedToken);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to the Pocekt Guard</Text>
      <Image
        source={require("../assets/images/icons8-money-management-53.png")}
      />
      <View style={styles.card}>
        <Text style={styles.title}>{isSignUp ? "Sign Up" : "Login"}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign Up" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.toggleText}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Text style={styles.linkText}>
              {isSignUp ? "Login" : "Sign Up"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  toggleText: {
    textAlign: "center",
    marginTop: 10,
    color: "#555",
  },
  welcomeText: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: "bold", // Or 'normal', '100', '200', etc.
    color: "black", // Change text color
    textAlign: "center", // Align text (left, center, right)
    marginVertical: 20, // Add vertical margin
    fontFamily: "Arial", // Example font, ensure it's available
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Add a text shadow
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  linkText: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
