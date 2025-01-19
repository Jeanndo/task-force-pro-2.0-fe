import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { ErrorResponse, IdType, LoginPayload, LoginResponse, UpdateUserPayload, UserParams, UserPayload, UserResponse, UsersResponse, UserState } from "@/lib/Interfaces";
import { genericErrorResponse } from "@/lib/constants";
import instance from "@/lib/utils";

const initialState: UserState = {
    user: null,
    users: [],
    loading: 'idle',
    success: false,
    message: "",
    error: null

};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear();
            state.user = null;
            window.location.href = "/";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(registerUserAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.message = action.payload.message
        }).addCase(registerUserAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(loginUserAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(loginUserAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message
        }).addCase(loginUserAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getUsersAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null
        }).addCase(getUsersAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null
            state.users = action.payload.data

        }).addCase(getUsersAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }
        }).addCase(getUserAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;

        }).addCase(getUserAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.user = action.payload.data
        }).addCase(getUserAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(updateGeneralInfoAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(updateGeneralInfoAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(updateGeneralInfoAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        }).addCase(deleteUserAsync.pending, (state) => {
            state.loading = 'pending';
            state.success = false;
            state.error = null;
        }).addCase(deleteUserAsync.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(deleteUserAsync.rejected, (state, action) => {
            state.loading = 'failed';
            state.success = false;

            if (action.payload) {
                const { message } = action.payload
                state.error = message
            }

        })
    },
});

export const registerUserAsync = createAsyncThunk<UserResponse, UserPayload, { rejectValue: ErrorResponse }>(
    "user/register",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/users/register", payload)

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



export const loginUserAsync = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: ErrorResponse }>(
    "user/login",
    async (payload, thunkAPI) => {
        try {

            const { data } = await instance.post("/users/login", payload)
            localStorage.setItem("token", data.data.token)

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


export const getUsersAsync = createAsyncThunk<UsersResponse, UserParams, { rejectValue: ErrorResponse }>(
    "user/get-users",
    async (payload, thunkAPI) => {
        try {
            const params = {
                page: payload.page,
                limit: payload.limit
            }

            const { data } = await instance.get(`/users`, { params })
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


export const getUserAsync = createAsyncThunk<UserResponse, IdType, { rejectValue: ErrorResponse }>(
    "user/get-user",
    async (payload, thunkAPI) => {

        try {
            const { id } = payload
            const { data } = await instance.get(`/users/${id}`)
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

export const updateGeneralInfoAsync = createAsyncThunk<UserResponse, UpdateUserPayload, { rejectValue: ErrorResponse }>(
    "user/update-user",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.patch(`/users/${payload.id}`, payload)

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


export const deleteUserAsync = createAsyncThunk<UserResponse, IdType, { rejectValue: ErrorResponse }>(
    "user/delete-user",
    async (payload, thunkAPI) => {
        try {
            const { data } = await instance.delete(`/users/${payload.id}`)
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


export const { logout } = userSlice.actions
export default userSlice.reducer