import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getToken, removeToken, saveToken } from "@/sevice/TokenService";

import axios from "axios";

interface UserState {
  jwt_token: string | null;
  refresh_token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  jwt_token: null,
  refresh_token: null,
  username: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};
 const api = axios.create({
  baseURL: "http://192.168.1.187:3001",
});

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (user: any, { rejectWithValue }) => {
    
    try {
      const response = await api.post("/auth/login", user);
      await saveToken(response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.isAuthenticated = false;
      state.jwt_token = null;
      state.refresh_token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.jwt_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
        state.isAuthenticated = true;
        saveToken(action.payload.accessToken);
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logOutUser } = userSlice.actions;
export default userSlice.reducer;
