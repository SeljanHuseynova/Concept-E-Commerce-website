import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, accountUrl } from "../supabase";
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(accountUrl, userData, {
        headers: {
          ...headers,
          Prefer: "return=representation",
        },
      });

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

export const logoutUser = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("currentUser");
  return null;
});

export const addToCart = createAsyncThunk(
  "users/addToCart",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      // 1. Fetch the user's cart from the database
      const response = await axios.get(`${accountUrl}?id=eq.${userId}`, {
        headers,
      });

      if (response.data.length === 0) {
        return rejectWithValue("User not found");
      }

      let user = response.data[0];
      let cart = user.cart || []; // Ensure cart is an array

      // 2. Check if the product is already in the cart
      let existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // 3. If product is in the cart, check stock before increasing quantity
        if (existingProduct.quantity < product.quantity) {
          existingProduct.quantity += 1; // Increase only if stock allows
        } else {
          return rejectWithValue(
            `"${product.name}" cannot be added, not enough stock!`
          );
        }
      } else {
        // 4. If product is not in the cart, check stock and add it
        if (product.quantity > 0) {
          cart.push({ id: product.id, name: product.name, quantity: 1 }); // New cart entry
        } else {
          return rejectWithValue(`"${product.name}" is out of stock!`);
        }
      }

      // 5. Update the user's cart in the database
      await axios.patch(`${accountUrl}?id=eq.${userId}`, { cart }, { headers });

      return cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);



const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  cart:[],
};

const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default accountSlice.reducer;
