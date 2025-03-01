import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; 

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6366F1", "#4F46E5"]} style={styles.header}>
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={120}
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Kavindu Gayantha</Text>
          <Text style={styles.email}>gayanthakavindu3@gmail.com</Text>
        </View>
      </LinearGradient>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.elevation]}>
          <IconButton
            icon="wallet-outline"
            color="#4CAF50"
            size={30}
            style={styles.statIcon}
          />
          <Text style={styles.statValue}>LKR 25,000</Text>
          <Text style={styles.statLabel}>Monthly Budget</Text>
        </View>

        <View style={[styles.statCard, styles.elevation]}>
          <IconButton
            icon="cart-outline"
            color="#F44336"
            size={30}
            style={styles.statIcon}
          />
          <Text style={styles.statValue}>LKR 18,500</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.elevation]}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.elevation]}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ස්ටයිල් අර්ථ දැක්වීම් එලෙසම තබන්න
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#E0E7FF",
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: -30,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "48%",
    alignItems: "center",
  },
  statIcon: {
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    marginBottom: 15,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 15,
  },
  actionButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  buttonText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  elevation: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
