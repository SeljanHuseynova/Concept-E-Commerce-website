import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers, productsUrl } from "../supabase";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${productsUrl}?order=id.desc`, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

//add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(productsUrl, productData, { headers });
      return response.data;
    } catch (error) {
      console.error("Add Product Error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  }
);
//edit
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${productsUrl}?id=eq.${id}`,
        updates,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit product");
    }
  }
);
// Remove
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${productsUrl}?id=eq.${id}`, { headers });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to remove product"
      );
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
      state.filters.availability === "inStock"
        ? product.quantity > 0
        : product.quantity === 0
    );
  }

  if (state.filters.brand) {
    filtered = filtered.filter(
      (product) => product.brand === state.filters.brand
    );
  }

  if (state.filters.category) {
    filtered = filtered.filter(
      (product) => product.category === state.filters.category
    );
  }

  if (state.filters.subCategory) {
    filtered = filtered.filter(
      (product) => product.subCategory === state.filters.subCategory
    );
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
      state.filters = {
        availability: null,
        brand: null,
        category: null,
        subCategory: null,
      };
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
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex((p) => p.id === action.meta.arg.id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...action.meta.arg.updates };
        }
        applyAllFilters(state);
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

   
      .addCase(removeProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter((product) => product.id !== action.payload);
        applyAllFilters(state);
      })
      .addCase(removeProduct.rejected, (state, action) => {
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
