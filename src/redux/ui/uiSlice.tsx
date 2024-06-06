"use client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    collapsed: false,
    theme: 'light',
    siteName: '',
    logo: '',
    fixedHeader: false,
    menus: [],
    favicon: '',
    loginPlaceholderImage: '',
    footerContent: ''
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        updateUIValue: (state, action) => {
          if (typeof window !== 'undefined') {
            Object.keys(action.payload).forEach(
              (key) => localStorage && localStorage.setItem(key, action.payload[key])
            );
          } 
          return {
            ...state,
            ...action.payload
          };
        },
        loadUIValue: (state) => {
          const newVal: { [key: string]: string } = {};
          if (typeof window !== 'undefined') {
            Object.keys(initialState).forEach((key) => {
              const val = localStorage.getItem(key);
              if (val) {
                newVal[key] = val;
              }
            });
          }
          return {
            ...state,
            ...newVal
          };
        }
    }
})

export const { updateUIValue, loadUIValue } = uiSlice.actions
export default uiSlice.reducer