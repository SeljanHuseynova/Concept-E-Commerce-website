import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, accountUrl } from "../supabase";
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        accountUrl, 
        userData,
        {
          headers: {
            ...headers,
            Prefer: "return=representation", 
          },
        }
      );

      if (response.data.length > 0) {
        return response.data[0]; 
      } else {
        return rejectWithValue("User registration failed.");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);


export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${accountUrl}?email=eq.${email}`, {
        headers,
      });

      if (response.data.length > 0) {
        const user = response.data[0];

        if (user.password === password) {
          return user;
        } else {
          return rejectWithValue("Invalid password");
        }
      } else {
        return rejectWithValue("User not found");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("REGISTERED USER:", action.payload);
        state.status = "succeeded";
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = accountSlice.actions;

export default accountSlice.reducer;
