import { configureStore } from '@reduxjs/toolkit';

import userReducer from "./../redux/features/userSlice"
import accountReducer from "./../redux/features/accountSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        account:accountReducer
    }
})

/**
 *  Infer the `RootState` and `AppDispatch` types from the store itself
 */
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch