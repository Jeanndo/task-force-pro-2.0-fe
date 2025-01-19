/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { TransactionState, ErrorResponse, IdType, TransactionResponse, TransactionPayload, TransactionsResponse, TransactionParams, UpdateTransactionPayload, TransactionSummaryResponse } from "@/lib/Interfaces";
import { genericErrorResponse } from "@/lib/constants";
import instance from "@/lib/utils";

const initialState: TransactionState = {
    transaction: null,
    transactions: [],
    summary: [],
    loading: 'idle',
    success: false,
    message: "",
    error: null

};

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createTransaction.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(createTransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.message = action.payload.message
        }).addCase(createTransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(getTransactions.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(getTransactions.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null
            state.transactions = action.payload.data

        }).addCase(getTransactions.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getTransaction.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;

        }).addCase(getTransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.transaction = action.payload.data
        }).addCase(getTransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(updateTransaction.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(updateTransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(updateTransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(deleteTransaction.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(deleteTransaction.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(deleteTransaction.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(getTransactionsSummary.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(getTransactionsSummary.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.summary = action.payload.data;
        }).addCase(getTransactionsSummary.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getTransactionReport.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(getTransactionReport.fulfilled, (state) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = 'Report completed successfully';
        }).addCase(getTransactionReport.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;
            if (action.payload) {
                state.error = "Error downloading report"
            }
        })
    },
});

export const createTransaction = createAsyncThunk<TransactionResponse, TransactionPayload, { rejectValue: ErrorResponse }>(
    "transaction/create-transaction",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/transactions", payload)

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

export const getTransactions = createAsyncThunk<TransactionsResponse, TransactionParams, { rejectValue: ErrorResponse }>(
    "transaction/get-transactions",
    async (payload, thunkAPI) => {
        try {
            const params = {
                page: payload.page,
                limit: payload.limit
            }

            const { data } = await instance.get(`/transactions`, { params })
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


export const getTransaction = createAsyncThunk<TransactionResponse, IdType, { rejectValue: ErrorResponse }>(
    "transaction/get-transaction",
    async (payload, thunkAPI) => {

        try {
            const { id } = payload
            const { data } = await instance.get(`/transactions/${id}`)
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

export const updateTransaction = createAsyncThunk<TransactionResponse, UpdateTransactionPayload, { rejectValue: ErrorResponse }>(
    "transaction/update-transaction",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.patch(`/transactions/${payload.id}`, payload)

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


export const deleteTransaction = createAsyncThunk<TransactionResponse, IdType, { rejectValue: ErrorResponse }>(
    "transaction/delete-transaction",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.delete(`/transactions/${payload.id}`)
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

export const getTransactionsSummary = createAsyncThunk<TransactionSummaryResponse, void, { rejectValue: ErrorResponse }>(
    "transaction/summary",
    async (_, thunkAPI) => {
        try {
            const { data } = await instance.get(`/transactions/summary`)
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



export const getTransactionReport = createAsyncThunk<TransactionResponse, void, { rejectValue: ErrorResponse }>(
    'transaction/generate-report',
    //@ts-ignore
    async (_, thunkAPI) => {

        try {

            const config = {
                responseType: 'blob',
                headers: {
                    'Content-Disposition': `attachment; filename=sales.xlsx`,
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
            }

            //@ts-ignore
            const { data } = await instance.get(`/transactions/generate-report`, config);

            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `transaction-report.xlsx`);
            document.body.appendChild(link);
            link.click();

            return {
                fileName: `transaction-report.xlsx`,
                size: data.size,
                type: data.type
            };

        } catch (error) {

            if (isAxiosError(error) && error.response) {
                const errorResponse = error.response.data
                return thunkAPI.rejectWithValue(errorResponse)
            }
            return thunkAPI.rejectWithValue(genericErrorResponse);
        }

    }
);


export const { } = transactionSlice.actions
export default transactionSlice.reducer