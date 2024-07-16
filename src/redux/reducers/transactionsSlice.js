import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transactions: []
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        updateTransaction: (state, action) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(t => t.id !== action.payload);
        }
    }
});

export const { addTransaction, updateTransaction, deleteTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;