import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, accountUrl, productsUrl } from "../supabase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
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
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `"${product.name}" added to your cart!`,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: "warning",
            title: "Out of Stock",
            text: `"${product.name}" cannot be added, not enough stock!`,
          });
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
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `"${product.name}" added to your cart!`,
            showConfirmButton: false,
            timer: 2000,
          })
        } else {
          Swal.fire({
            icon: "warning",
            title: "Out of Stock",
            text: `"${product.name}" cannot be added, not enough stock!`,
          });
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
// Increase quantity
export const increaseQuantity = createAsyncThunk(
  "users/increaseQuantity",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${productsUrl}?id=eq.${productId}`, {
        headers,
      });

      if (response.data.length === 0) {
        return rejectWithValue("Product not found");
      }

      let productStock = response.data[0].quantity;

      const userResponse = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        { headers }
      );

      if (userResponse.data.length === 0) {
        return rejectWithValue("User not found");
      }

      let cart = userResponse.data[0].cart || [];
      let updatedCart = cart.map((item) => {
        if (item.id === productId) {
          if (item.quantity < productStock) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            toast.error(`"${item.name}" is out of sufficient stock`, {
              position: "top-left",
              autoClose: 3000,
            });
            return item;
          }
        }
        return item;
      });

      await axios.patch(
        `${accountUrl}?id=eq.${userId}`,
        { cart: updatedCart },
        { headers }
      );

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Decrease quantity
export const decreaseQuantity = createAsyncThunk(
  "users/decreaseQuantity",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const userResponse = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        { headers }
      );

      if (userResponse.data.length === 0) {
        return rejectWithValue("User not found");
      }

      let cart = userResponse.data[0].cart || [];
      let updatedCart = cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      await axios.patch(
        `${accountUrl}?id=eq.${userId}`,
        { cart: updatedCart },
        { headers }
      );

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Remove from cart
export const removeFromCart = createAsyncThunk(
  "users/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const userResponse = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        { headers }
      );

      if (userResponse.data.length === 0) {
        return rejectWithValue("User not found");
      }

      let cart = userResponse.data[0].cart || [];
      let updatedCart = cart.filter((item) => item.id !== productId);

      await axios.patch(
        `${accountUrl}?id=eq.${userId}`,
        { cart: updatedCart },
        { headers }
      );

      return updatedCart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
//clear all
export const clearAll = createAsyncThunk(
  "users/clearAll",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.patch(
        `${accountUrl}?id=eq.${userId}`,
        { cart: [] },
        { headers }
      );
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// after purchase 
export const updateStockAfterPurchase = createAsyncThunk(
  "users/updateStockAfterPurchase",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const userResponse = await axios.get(
        `${accountUrl}?id=eq.${userId}&select=cart`,
        { headers }
      );

      if (userResponse.data.length === 0) {
        return rejectWithValue("User not found");
      }

      let cart = userResponse.data[0].cart || [];

      if (cart.length === 0) {
        return rejectWithValue("Cart is empty, no stock updates needed.");
      }

      const productIds = cart.map((item) => item.id);
      if (productIds.length === 0) {
        return rejectWithValue("No valid products found in the cart.");
      }

      const productsResponse = await axios.get(
        `${productsUrl}?id=in.(${productIds.join(",")})`,
        { headers }
      );

      let products = productsResponse.data;

      let updatedProducts = products.map((product) => {
        let cartItem = cart.find((item) => item.id === product.id);
        if (cartItem) {
          return {
            ...product,
            quantity: Math.max(0, product.quantity - cartItem.quantity),
          };
        }
        return product;
      });

      for (let updatedProduct of updatedProducts) {
        await axios.patch(
          `${productsUrl}?id=eq.${updatedProduct.id}`,
          { quantity: updatedProduct.quantity },
          { headers }
        );
      }

      return updatedProducts;
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
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
      })
      .addCase(clearAll.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.cart = action.payload;
        }
      })
      .addCase(updateStockAfterPurchase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStockAfterPurchase.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.currentUser) {
          state.currentUser.cart = [];
        }
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...state.currentUser, cart: [] })
        );
      })
      .addCase(updateStockAfterPurchase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;
