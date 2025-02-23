import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import accountReducer from "./accountSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  users: accountReducer,
});

export default rootReducer;
