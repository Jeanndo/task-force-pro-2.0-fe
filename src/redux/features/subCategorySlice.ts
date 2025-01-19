import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { ErrorResponse, IdType, SubcategoriesResponse, SubcategoryParams, SubcategoryPayload, SubcategoryResponse, SubcategoryState, UpdateSubcategoryPayload } from "@/lib/Interfaces";
import { genericErrorResponse } from "@/lib/constants";
import instance from "@/lib/utils";

const initialState: SubcategoryState = {
    subcategory: null,
    subcategories: [],
    loading: 'idle',
    success: false,
    message: "",
    error: null

};

const subCategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createSubCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(createSubCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.message = action.payload.message
        }).addCase(createSubCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(getSubCategories.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(getSubCategories.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null
            state.subcategories = action.payload.data

        }).addCase(getSubCategories.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getSubCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;

        }).addCase(getSubCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.subcategory = action.payload.data
        }).addCase(getSubCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(updateSubCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(updateSubCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(updateSubCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(deleteSubCategory.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(deleteSubCategory.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        })
    },
});

export const createSubCategory = createAsyncThunk<SubcategoryResponse, SubcategoryPayload, { rejectValue: ErrorResponse }>(
    "subcategory/create-sub-category",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/subcategories", payload)

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

export const getSubCategories = createAsyncThunk<SubcategoriesResponse, SubcategoryParams, { rejectValue: ErrorResponse }>(
    "subcategory/get-sub-categories",
    async (payload, thunkAPI) => {
        try {
            const params = {
                page: payload.page,
                limit: payload.limit
            }

            const { data } = await instance.get(`/subcategories`, { params })
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


export const getSubCategory = createAsyncThunk<SubcategoryResponse, IdType, { rejectValue: ErrorResponse }>(
    "subcategory/get-sub-category",
    async (payload, thunkAPI) => {

        try {
            const { id } = payload
            const { data } = await instance.get(`/subcategories/${id}`)
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

export const updateSubCategory = createAsyncThunk<SubcategoryResponse, UpdateSubcategoryPayload, { rejectValue: ErrorResponse }>(
    "subcategory/update-sub-category",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.patch(`/subcategories/${payload.id}`, payload)

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


export const deleteSubCategory = createAsyncThunk<SubcategoryResponse, IdType, { rejectValue: ErrorResponse }>(
    "subcategory/delete-sub-category",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.delete(`/subcategories/${payload.id}`)
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


export const { } = subCategorySlice.actions
export default subCategorySlice.reducer