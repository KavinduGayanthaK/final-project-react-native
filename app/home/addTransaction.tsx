import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Transaction } from "@/model/Transaction";
import { saveTransaction } from "@/reducers/TransactionSlice";
import { useDispatch } from "react-redux";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function AddTransactionModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      label: "Salary",
      icon: <FontAwesome5 name="dollar-sign" size={24} color="purple" />,
    },
    {
      label: "Groceries",
      icon: <MaterialIcons name="shopping-cart" size={24} color="orange" />,
    },
    {
      label: "Gas",
      icon: <MaterialIcons name="gas-meter" size={24} color="gray" />,
    },
    { label: "Rent", icon: <FeatherIcon name="home" size={24} color="pink" /> },
    {
      label: "Gym",
      icon: <FontAwesome5 name="dumbbell" size={24} color="green" />,
    },
    {
      label: "Restaurant",
      icon: <FeatherIcon name="coffee" size={24} color="purple" />,
    },
    {
      label: "Vacation",
      icon: <FeatherIcon name="umbrella" size={24} color="orange" />,
    },
    {
      label: "Travel",
      icon: <MaterialIcons name="directions-train" size={24} color="red" />,
    },
    {
      label: "Gift",
      icon: <FeatherIcon name="gift" size={24} color="brown" />,
    },
    {
      label: "Investments",
      icon: <FeatherIcon name="percent" size={24} color="red" />,
    },
    {
      label: "Savings",
      icon: <MaterialIcons name="comment-bank" size={24} color="brown" />,
    },
    {
      label: "Entertainment",
      icon: <FeatherIcon name="smartphone" size={24} color="purple" />,
    },
  ];

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatepicker(false);
  };

  const filteredCategories = categories.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTransaction = () => {
    if (!amount || !category) {
      alert("Please enter all details!");
      return;
    }

    const transaction: Transaction = {
      id: "", // Generate a temporary ID
      category,
      type: transactionType,
      amount: parseFloat(amount),
      date: String(date),
    };

    dispatch(saveTransaction(transaction));
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { maxHeight: screenHeight * 0.85 }]}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onClose}>
              <FeatherIcon name="x" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>NEW TRANSACTION</Text>
            <TouchableOpacity onPress={handleTransaction}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionTypeContainer}>
            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                transactionType === "expense" && styles.activeExpense,
              ]}
              onPress={() => setTransactionType("expense")}
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={16}
                color={transactionType === "expense" ? "white" : "#555"}
              />
              <Text
                style={[
                  styles.buttonText,
                  transactionType === "expense" && styles.activeButtonText,
                ]}
              >
                {" "}
                EXPENSE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.transactionTypeButton,
                transactionType === "income" && styles.activeIncome,
              ]}
              onPress={() => setTransactionType("income")}
            >
              <MaterialCommunityIcons
                name="cash"
                size={16}
                color={transactionType === "income" ? "white" : "#555"}
              />
              <Text
                style={[
                  styles.buttonText,
                  transactionType === "income" && styles.activeButtonText,
                ]}
              >
                {" "}
                INCOME
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.amountInput}
            placeholder="Enter ammount LKR 0.00"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.pickerText}>
              {category || "Choose a category"}
            </Text>
          </TouchableOpacity>

          <View style={styles.rowContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatepicker(true)}>
              <Text style={styles.dateText}>
              {date ? date.toLocaleDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatepicker && (
            <DateTimePicker
              value={date || new Date()} // Provide a default date if null
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={showCategoryModal}
        >
          <View style={styles.categoryModalContainer}>
            <View style={styles.categoryHeader}>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <FeatherIcon name="x" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>CATEGORY</Text>
              <TouchableOpacity>
                <Text style={styles.newCategoryText}>+ New</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredCategories}
              numColumns={3}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(item.label);
                    setShowCategoryModal(false);
                  }}
                >
                  {item.icon}
                  <Text style={styles.categoryLabel}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: { fontSize: 16, fontWeight: "600" },
  saveText: { fontSize: 16, color: "#007AFF" },
  transactionTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  transactionTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 5,
  },
  activeExpense: { backgroundColor: "#FFCDD2" },
  activeIncome: { backgroundColor: "#2ffa35" },
  activeTransfer: { backgroundColor: "#BBDEFB" },
  buttonText: { fontSize: 14, color: "#555" },
  activeButtonText: { color: "#000" },
  amountInput: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: { fontSize: 16 },
  pickerInput: { fontSize: 16 },
  dateText: { fontSize: 16, color: "#007AFF" },
  categoryModalContainer: { flex: 1, padding: 20, backgroundColor: "white" },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: { fontSize: 18, fontWeight: "bold" },
  newCategoryText: { fontSize: 16, color: "#007AFF" },
  searchBar: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  pickerContainer: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  pickerText: { fontSize: 16, color: "#333" },
  categoryItem: { flex: 1, alignItems: "center", margin: 10 },
  categoryLabel: { marginTop: 5, fontSize: 14, textAlign: "center" },
});
