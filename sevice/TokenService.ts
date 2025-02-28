import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const saveToken = async  (token: string) => {
    try {
        if (Platform.OS === "web") {
            await AsyncStorage.setItem("jwt_token", token);
        } else {
            await SecureStore.setItemAsync("jwt_token", token);
        }
    } catch (error) {
        console.error("Error saving token:", error);
    }
};

export const getToken = async () => {
    try {
        if (Platform.OS === "web") {
            return await AsyncStorage.getItem("jwt_token");
        } else {
            return await SecureStore.getItemAsync("jwt_token");
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        if (Platform.OS === "web") {
            await AsyncStorage.removeItem("jwt_token");
        } else {
            await SecureStore.deleteItemAsync("jwt_token");
        }
    } catch (error) {
        console.error("Error removing token:", error);
    }
};
