 import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { headers, productsUrl } from "../supabase";



const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const accountSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: () => {
   ;
  },
});

export default accountSlice.reducer;
