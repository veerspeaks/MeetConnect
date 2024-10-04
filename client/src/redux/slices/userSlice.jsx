import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { useNavigate } from "react-router-dom";



const initialState = {
    user: null,
    loading: false,
    error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users/signin", {
                email,
                password,
            });
            return response.data; // Return the actual data (assuming response.data contains the user info)
        } catch (err) {
            console.log('Error in login thunk:', err.response || err.message); // Log error
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
    'user/logoutUser', // Changed action type
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users/signout");
            return response.data; 
        } catch (err) {
            console.log('Error in logout thunk:', err.response || err.message); // Log error
            return rejectWithValue(err.response?.data || err.message); // Return error value
        }
    }
);

// update thunk

export const updateUser  = createAsyncThunk(
    'user/updateUser',
    async ({ name, yearOfStudy,expertise, workExperience, profilePicture}, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users/update", {
                name,
                yearOfStudy,
                expertise,
                workExperience,
                profilePicture
            });
            return response.data; // Return the actual data (assuming response.data contains the user info)
        } catch (err) {
            console.log('Error in login thunk:', err.response || err.message); // Log error
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);




const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("Login successful");
                state.user = action.payload;
                state.loading = false;
                // window.location.href = "/"
                // Use useNavigate hook for navigation instead of window.location.href
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message; // Use action.payload for error
                state.loading = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                console.log("Logout successful");
                state.user = null;
                state.loading = false;
                // Use useNavigate hook for navigation instead of window.location.href
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message; // Use action.payload for error
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("Update successful");
                state.user.user = action.payload;
                state.loading = false;
                // Use useNavigate hook for navigation instead of window.location.href
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload || action.error.message; // Use action.payload for error
                state.loading = false;
            });
    }
});

export default userSlice.reducer;
