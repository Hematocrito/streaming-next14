"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import userReducer from "@redux/slices/userSlice";
import authReducer from "@redux/slices/authSlice";
import uiReducer from "@redux/slices/uiSlice";
import settingsReducer from "@redux/slices/settingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  ui: uiReducer,
  settings: settingsReducer
});

export const store = configureStore({
  reducer: rootReducer,
 });