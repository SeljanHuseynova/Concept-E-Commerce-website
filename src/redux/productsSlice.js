import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, productsUrl } from "../supabase";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(productsUrl, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  filters: {
    availability: null,
    brand: null,
    category: null,
    subCategory: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAvailability: (state, action) => {
      state.filters.availability = action.payload;
      state.filteredProducts = state.products.filter((product) =>
        action.payload === "inStock" ? product.quantity > 0 : product.quantity === 0
      );
    },
    setBrand: (state, action) => {
      state.filters.brand = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.brand === action.payload
      );
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.category === action.payload
      );
    },
    setSubCategory: (state, action) => {
      state.filters.subCategory = action.payload;
      state.filteredProducts = state.products.filter(
        (product) => product.subCategory === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAvailability, setBrand, setCategory, setSubCategory } = productsSlice.actions;
export default productsSlice.reducer;
