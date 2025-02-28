import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/UserSlice"; // Ensure this path is correct
import TransactionSlice from "@/reducers/TransactionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer, // Match this name in the state
        transaction: TransactionSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
