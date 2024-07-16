import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../reducers/transactionsSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionsSlice
    }
});