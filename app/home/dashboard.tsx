
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransaction,
  deleteTransaction,
} from "@/reducers/TransactionSlice";
import { Transaction } from "@/model/Transaction";
import AddTransactionModal from "../addTransaction";

export default function Dashboard() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transaction);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);


  const calculateIncome = () => 
    transactions.reduce((total, t) => t.type === "INCOME" ? total + Number(t.amount) : total, 0);
  
  const calculateExpense = () => 
    transactions.reduce((total, t) => t.type === "EXPENSE" ? total + Number(t.amount) : total, 0);
  
  const total = calculateIncome() - calculateExpense();

  useEffect(() => {
    dispatch(getTransaction() as any);
  }, [dispatch]);

  const handleDelete = (transactionId: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteTransaction(transactionId) as any);
            setTimeout(() => dispatch(getTransaction() as any), 1000);
          },
        },
      ]
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalVisible(true);
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableWithoutFeedback
      onPress={() => handleEdit(item)}
      onLongPress={() => handleDelete(item.id)}
    >
      <View style={styles.transactionItem}>
        <View style={[
          styles.typeIndicator, 
          { backgroundColor: item.type === "INCOME" ? "#4CAF50" : "#F44336" }
        ]} />
        
        <View style={styles.transactionContent}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text style={[
              styles.transactionAmount,
              { color: item.type === "INCOME" ? "#4CAF50" : "#F44336" }
            ]}>
              LKR {item.amount}
            </Text>
          </View>
          
          <View style={styles.transactionFooter}>
            <View style={styles.dateBadge}>
              <Icon name="calendar" size={14} color="#666" />
              <Text style={styles.transactionDate}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <View style={[
              styles.typeBadge,
              { backgroundColor: item.type === "INCOME" ? "#E8F5E9" : "#FFEBEE" }
            ]}>
              <Text style={[
                styles.typeText,
                { color: item.type === "INCOME" ? "#2E7D32" : "#C62828" }
              ]}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      {/* Modern Header */}
      <LinearGradient 
        colors={["#3B82F6", "#1E3A8A"]}
        style={styles.headerGradient}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greetingText}>Good Morning!</Text>
            <Text style={styles.balanceText}>Current Balance</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>LKR {total}</Text>
          
          <View style={styles.balanceDetails}>
            <View style={styles.incomeExpense}>
              <View style={styles.incomeContainer}>
                <Icon name="arrow-up" size={16} color="#4CAF50" />
                <Text style={styles.incomeText}>LKR {calculateIncome()}</Text>
              </View>
              <View style={styles.expenseContainer}>
                <Icon name="arrow-down" size={16} color="#F44336" />
                <Text style={styles.expenseText}>LKR {calculateExpense()}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Transaction List Header */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Edit Modal */}
      <AddTransactionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingTransaction(null);
        }}
        transaction={editingTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FD",
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  greetingText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginBottom: 4,
  },
  balanceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  balanceCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    backdropFilter: "blur(10px)",
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 15,
  },
  balanceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incomeExpense: {
    flexDirection: "row",
    gap: 20,
  },
  incomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  expenseContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  incomeText: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  expenseText: {
    color: "#F44336",
    fontWeight: "500",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D2D2D",
  },
  viewAllText: {
    color: "#3B82F6",
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  transactionItem: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  typeIndicator: {
    width: 5,
    height: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  transactionContent: {
    flex: 1,
    padding: 16,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  transactionCategory: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D2D2D",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  transactionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#3B82F6",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});