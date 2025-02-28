import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, accountUrl } from "../supabase";

// Register user
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

// Login user
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

// Logout user
export const logoutUser = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("currentUser");
  return null;
});

// Fetch user's cart
export const fetchCart = createAsyncThunk(
  "users/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        {
          headers,
        }
      );
      if (response.data.length === 0) {
        return rejectWithValue("User not found");
      }
      return response.data[0].cart || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Add  to cart
export const addToCart = createAsyncThunk(
  "users/addToCart",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        {
          headers,
        }
      );

      if (response.data.length === 0) {
        return rejectWithValue("User not found");
      }
      let user = response.data[0];
      let cart = user.cart || [];

      let existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        if (existingProduct.quantity < product.quantity) {
          existingProduct.quantity += 1;
        } else {
          alert(`"${product.name}" cannot be added, not enough stock!`);
          return rejectWithValue(
            `"${product.name}" cannot be added, not enough stock!`
          );
        }
      } else {
        if (product.quantity > 0) {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
          });
        } else {
          alert(`"${product.name}" is out of stock!`);
          return rejectWithValue(`"${product.name}" is out of stock!`);
        }
      }

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
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...state.currentUser, cart: action.payload })
        );
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
      });
  },
});

export default accountSlice.reducer;
