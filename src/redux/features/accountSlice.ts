import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { AccountParams, AccountPayload, AccountResponse, AccountsResponse, AccountState, ErrorResponse, IdType, UpdateAccountPayload } from "@/lib/Interfaces";
import { genericErrorResponse } from "@/lib/constants";
import instance from "@/lib/utils";

const initialState: AccountState = {
    account: null,
    accounts: [],
    loading: 'idle',
    success: false,
    message: "",
    error: null

};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(createAccount.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.message = action.payload.message
        }).addCase(createAccount.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(getAccounts.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(getAccounts.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null
            state.accounts = action.payload.data

        }).addCase(getAccounts.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getAccount.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;

        }).addCase(getAccount.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.account = action.payload.data
        }).addCase(getAccount.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(updateAccount.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(updateAccount.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(updateAccount.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(deleteAccount.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(deleteAccount.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(deleteAccount.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        })
    },
});

export const createAccount = createAsyncThunk<AccountResponse, AccountPayload, { rejectValue: ErrorResponse }>(
    "account/create-account",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/accounts", payload)

            return data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }
    }
);

export const getAccounts = createAsyncThunk<AccountsResponse, AccountParams, { rejectValue: ErrorResponse }>(
    "account/get-accounts",
    async (payload, thunkAPI) => {
        try {
            const params = {
                page: payload.page,
                limit: payload.limit
            }

            const { data } = await instance.get(`/accounts`, { params })
            return data
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }
    }
)


export const getAccount = createAsyncThunk<AccountResponse, IdType, { rejectValue: ErrorResponse }>(
    "account/get-account",
    async (payload, thunkAPI) => {

        try {
            const { id } = payload
            const { data } = await instance.get(`/accounts/${id}`)
            return data
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }

    }
)

export const updateAccount = createAsyncThunk<AccountResponse, UpdateAccountPayload, { rejectValue: ErrorResponse }>(
    "account/update-account",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.patch(`/accounts/${payload.id}`, payload)

            return data
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }
    }
)


export const deleteAccount = createAsyncThunk<AccountResponse, IdType, { rejectValue: ErrorResponse }>(
    "account/delete-account",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.delete(`/accounts/${payload.id}`)
            return data
        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }
    }
)


export const { } = accountSlice.actions
export default accountSlice.reducer