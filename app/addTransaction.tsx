// AddTransactionModal.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Transaction } from "@/model/Transaction";
import { useDispatch } from "react-redux";
import { getTransaction, saveTransaction, updateTransaction } from "@/reducers/TransactionSlice";

interface Props {
  visible: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
}

const AddTransactionModal = ({ visible, onClose, transaction }: Props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [transactionType, setTransactionType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "Salary", icon: <FontAwesome5 name="dollar-sign" size={24} color="#4CAF50" /> },
    { label: "Groceries", icon: <MaterialIcons name="shopping-cart" size={24} color="#FF9800" /> },
    { label: "Gas", icon: <MaterialIcons name="gas-meter" size={24} color="#607D8B" /> },
    { label: "Rent", icon: <FeatherIcon name="home" size={24} color="#E91E63" /> },
    { label: "Gym", icon: <FontAwesome5 name="dumbbell" size={24} color="#009688" /> },
    { label: "Restaurant", icon: <FeatherIcon name="coffee" size={24} color="#673AB7" /> },
    { label: "Vacation", icon: <FeatherIcon name="umbrella" size={24} color="#FF5722" /> },
    { label: "Travel", icon: <MaterialIcons name="directions-train" size={24} color="#F44336" /> },
    { label: "Gift", icon: <FeatherIcon name="gift" size={24} color="#795548" /> },
    { label: "Investments", icon: <FeatherIcon name="percent" size={24} color="#2196F3" /> },
    { label: "Savings", icon: <MaterialIcons name="comment-bank" size={24} color="#8BC34A" /> },
    { label: "Entertainment", icon: <FeatherIcon name="smartphone" size={24} color="#9C27B0" /> },
  ];

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDate(new Date(transaction.date));
      setTransactionType(transaction.type);
    }
  }, [transaction]);

  const handleTransaction = () => {
    if (!amount || !category) {
      alert("Please fill all required fields!");
      return;
    }

    const newTransaction: Transaction = {
      id: transaction?.id || Date.now().toString(),
      category,
      type: transactionType,
      amount: parseFloat(amount),
      date: date.toISOString(),
    };

    if (transaction) {
      dispatch(updateTransaction(newTransaction) as any);
    } else {
      dispatch(saveTransaction(newTransaction) as any);
    }

    setTimeout(() => dispatch(getTransaction() as any), 1000);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDate(new Date());
    setTransactionType("INCOME");
    setSearchQuery("");
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {transaction ? "Edit Transaction" : "New Transaction"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FeatherIcon name="x" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Transaction Type Selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "INCOME" && styles.activeIncome
              ]}
              onPress={() => setTransactionType("INCOME")}
            >
              <MaterialCommunityIcons
                name="cash"
                size={20}
                color={transactionType === "INCOME" ? "#fff" : "#4CAF50"}
              />
              <Text style={[
                styles.typeButtonText,
                transactionType === "INCOME" && styles.activeTypeText
              ]}>
                Income
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "EXPENSE" && styles.activeExpense
              ]}
              onPress={() => setTransactionType("EXPENSE")}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={20}
                color={transactionType === "EXPENSE" ? "#fff" : "#F44336"}
              />
              <Text style={[
                styles.typeButtonText,
                transactionType === "EXPENSE" && styles.activeTypeText
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <TextInput
            style={styles.amountInput}
            placeholder="Enter amount (LKR)"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Category Selector */}
          <TouchableOpacity
            style={styles.categorySelector}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={category ? styles.categorySelected : styles.categoryPlaceholder}>
              {category || "Select Category"}
            </Text>
            <FeatherIcon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* Date Picker */}
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatepicker(true)}
          >
            <FeatherIcon name="calendar" size={20} color="#666" />
            <Text style={styles.dateText}>
              {date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleTransaction}
          >
            <Text style={styles.submitText}>
              {transaction ? "Update Transaction" : "Add Transaction"}
            </Text>
          </TouchableOpacity>

          {/* Category Selection Modal */}
          <Modal visible={showCategoryModal} animationType="slide">
            <View style={styles.categoryModal}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Select Category</Text>
                <TouchableOpacity
                  onPress={() => setShowCategoryModal(false)}
                  style={styles.closeCategoryButton}
                >
                  <FeatherIcon name="x" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Search categories..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <FlatList
                data={categories.filter(cat =>
                  cat.label.toLowerCase().includes(searchQuery.toLowerCase())
                )}
                numColumns={3}
                keyExtractor={item => item.label}
                contentContainerStyle={styles.categoryGrid}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryCard}
                    onPress={() => {
                      setCategory(item.label);
                      setShowCategoryModal(false);
                    }}
                  >
                    <View style={styles.categoryIcon}>{item.icon}</View>
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>

          {/* Date Picker */}
          {showDatepicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={(_, selectedDate) => {
                setShowDatepicker(false);
                selectedDate && setDate(selectedDate);
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  closeButton: {
    padding: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  activeIncome: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  activeExpense: {
    backgroundColor: '#F44336',
    borderColor: '#F44336',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTypeText: {
    color: '#fff',
  },
  amountInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  categoryPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  categorySelected: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: '500',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  dateText: {
    color: '#1A1A1A',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryModal: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  closeCategoryButton: {
    padding: 8,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  categoryGrid: {
    gap: 16,
    paddingBottom: 40,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  categoryIcon: {
    backgroundColor: '#F5F5F5',
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default AddTransactionModal;