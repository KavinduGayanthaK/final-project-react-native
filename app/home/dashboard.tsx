import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function dashboard() {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* <TouchableOpacity>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.balanceText}>POCKET GUARD</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="user" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bank Card */}
      <LinearGradient colors={["#3B82F6", "#1E3A8A"]} style={styles.bankCard}>
        <Text style={styles.bankTitle}>Bank Name</Text>
        <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.cardChip} />
        <View style={styles.crdDetails}>
          <Text style={styles.cardNumber}>Income</Text>
          <Text style={styles.cardNumber}>Total</Text>
          <Text style={styles.cardNumber}>Expense</Text>
        </View>
       
        <Text style={styles.cardHolder}>John Doe</Text>
      </LinearGradient>

    

      {/* Transactions */}
      <View style={styles.transactions}>
        <Text style={styles.sectionTitle}>Latest Transactions</Text>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionName}>Mark Zuck</Text>
          <Text style={styles.transactionAmountPositive}>+237.00</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionName}>James Hiu</Text>
          <Text style={styles.transactionAmountNegative}>-200.00</Text>
        </View>
        <View style={styles.transactionItem}>
          <Text style={styles.transactionName}>Mark Zuck</Text>
          <Text style={styles.transactionAmountPositive}>+237.00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topBar: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1E3A8A",
    paddingHorizontal: 20,
    
  },
  crdDetails:{
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute space evenly between items
    paddingHorizontal: 10,
  },
  balanceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 5,
  },
  bankCard: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  bankTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardChip: {
    width: 40,
    height: 30,
    marginVertical: 10,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardHolder: {
    color: "#fff",
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  transactions: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionName: {
    fontSize: 16,
  },
  transactionAmountPositive: {
    fontSize: 16,
    color: "green",
  },
  transactionAmountNegative: {
    fontSize: 16,
    color: "red",
  },
});