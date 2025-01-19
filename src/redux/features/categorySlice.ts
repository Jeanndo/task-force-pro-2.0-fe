import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { CategoriesResponse, CategoryParams, CategoryPayload, CategoryResponse, CategoryState, ErrorResponse, IdType, UpdateCategoryPayload } from "@/lib/Interfaces";
import { genericErrorResponse } from "@/lib/constants";
import instance from "@/lib/utils";

const initialState: CategoryState = {
    category: null,
    categories: [],
    loading: 'idle',
    success: false,
    message: "",
    error: null

};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(createCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.message = action.payload.message
        }).addCase(createCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(getCategories.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(getCategories.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null
            state.categories = action.payload.data

        }).addCase(getCategories.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;

        }).addCase(getCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.category = action.payload.data
        }).addCase(getCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(updateCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(updateCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(deleteCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(deleteCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        })
    },
});

export const createCategory = createAsyncThunk<CategoryResponse, CategoryPayload, { rejectValue: ErrorResponse }>(
    "category/create-category",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/categories", payload)

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

export const getCategories = createAsyncThunk<CategoriesResponse, CategoryParams, { rejectValue: ErrorResponse }>(
    "category/get-categories",
    async (payload, thunkAPI) => {
        try {
            const params = {
                page: payload.page,
                limit: payload.limit
            }

            const { data } = await instance.get(`/categories`, { params })
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


export const getCategory = createAsyncThunk<CategoryResponse, IdType, { rejectValue: ErrorResponse }>(
    "category/get-category",
    async (payload, thunkAPI) => {

        try {
            const { id } = payload
            const { data } = await instance.get(`/categories/${id}`)
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

export const updateCategory = createAsyncThunk<CategoryResponse, UpdateCategoryPayload, { rejectValue: ErrorResponse }>(
    "category/update-category",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.patch(`/categories/${payload.id}`, payload)

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


export const deleteCategory = createAsyncThunk<CategoryResponse, IdType, { rejectValue: ErrorResponse }>(
    "category/delete-category",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.delete(`/categories/${payload.id}`)
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


export const { } = categorySlice.actions
export default categorySlice.reducer