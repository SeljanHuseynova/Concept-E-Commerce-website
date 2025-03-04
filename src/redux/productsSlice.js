import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, productsUrl } from "../supabase";

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
  sortOrder: null,
};

const applyAllFilters = (state) => {
  let filtered = [...state.products];

  if (state.filters.availability) {
    filtered = filtered.filter((product) =>
      state.filters.availability === "inStock" ? product.quantity > 0 : product.quantity === 0
    );
  }

  if (state.filters.brand) {
    filtered = filtered.filter((product) => product.brand === state.filters.brand);
  }

  if (state.filters.category) {
    filtered = filtered.filter((product) => product.category === state.filters.category);
  }

  if (state.filters.subCategory) {
    filtered = filtered.filter((product) => product.subCategory === state.filters.subCategory);
  }

  switch (state.sortOrder) {
    case "nameAsc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceAsc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "dateDesc":
      filtered.sort((a, b) => a.id - b.id);
      break;
    case "dateAsc":
      filtered.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }

  state.filteredProducts = filtered;
};


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  
    setAvailability: (state, action) => {
      state.filters.availability = action.payload;
      applyAllFilters(state);
    },

  
    setBrand: (state, action) => {
      state.filters.brand = action.payload;
      applyAllFilters(state);
    },

    setCategory: (state, action) => {
      state.filters.category = action.payload;
      applyAllFilters(state);
    },

    setSubCategory: (state, action) => {
      state.filters.subCategory = action.payload;
      applyAllFilters(state);
    },

    
    resetFilter: (state, action) => {
      state.filters[action.payload] = null;
      applyAllFilters(state);
    },

  
    resetAllFilters: (state) => {
      state.filters = { availability: null, brand: null, category: null, subCategory: null };
      state.filteredProducts = state.products;
    },

    setSort: (state, action) => {
      state.sortOrder = action.payload;
      applyAllFilters(state);
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

export const {
  setAvailability,
  setBrand,
  setCategory,
  setSubCategory,
  resetFilter,
  resetAllFilters,
  setSort,
} = productsSlice.actions;
export default productsSlice.reducer;
