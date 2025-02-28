
import { Transaction } from "@/model/Transaction";
import { postApiCallWithToken } from "@/sevice/ApiService";
import { getToken } from "@/sevice/TokenService";
import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

const initialState :{transaction:Transaction[]} = {transaction:[]}

const api = axios.create({
    baseURL: "http://localhost:3000/transaction",
  });
  

  export const saveTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (transaction:Transaction) =>{
      try {
        const token = await getToken();
        const response = await api.post('/add',transaction, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
      }catch(error) {
        return error;
      }
    }
  );
  
  export const getTransaction = createAsyncThunk(
    'transaction/getAllTransaction',
    async () =>{
      const response = await api.get('/getAll');
      return response.data;
    }
  )
  
  export const updateTransaction = createAsyncThunk(
    'transaction/updateTransaction',
      async (transaction:Transaction)=>{
          try{
              const response = await api.put(`/update/${transaction.id}`,transaction);
              return response.data;
          }catch (error){
              return error;
          }
      }
  )
  
  export const deleteTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (transaction:string)=>{
        try{
            const response = await api.delete(`/delete/${transaction}`);
            return response.data;
        }catch (error){
            return error;
        }
    }
  );
  
  
  const TransactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers:{},
    extraReducers: builder=> {
      builder
        .addCase(saveTransaction.fulfilled, (state, action) =>{
          state.transaction.push(action.payload)
        })
        .addCase(saveTransaction.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(saveTransaction.rejected, (state, action) =>{
          console.log("Failed to save transaction:",action.payload);
        })
        .addCase(getTransaction.fulfilled, (state, action) => {
          state.transaction = action.payload; // Ensure the fetched array replaces the state
        })
        .addCase(getTransaction.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(getTransaction.rejected, (state, action) =>{
          console.log("Failed to get transaction:",action.payload);
        })
        .addCase(updateTransaction.fulfilled, (state, action) =>{
          state.transaction.push(action.payload)
        })
        .addCase(updateTransaction.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(updateTransaction.rejected, (state, action) =>{
          console.log("Failed to update transaction:",action.payload);
        })
        .addCase(deleteTransaction.fulfilled, (state, action) =>{
          state.transaction.push(action.payload)
        })
        .addCase(deleteTransaction.pending, (state, action) =>{
          console.log(action.payload);
        })
        .addCase(deleteTransaction.rejected, (state, action) =>{
          console.log("Failed to delete transaction:",action.payload);
        })
        
    }
  });
export default TransactionSlice.reducer;