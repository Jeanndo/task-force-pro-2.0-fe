import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./../redux/features/userSlice"
import accountReducer from "./../redux/features/accountSlice"
import categoryReducer from "./../redux/features/categorySlice"
import subCategoryReducer from "./../redux/features/subCategorySlice"
import transactionReducer from "./../redux/features/transactionSlice"
import budgetReducer from "./../redux/features/budgetSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        account: accountReducer,
        category: categoryReducer,
        subcategory: subCategoryReducer,
        transaction: transactionReducer,
        budget: budgetReducer
    }
})

/**
 *  Infer the `RootState` and `AppDispatch` types from the store itself
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch