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
            if (process.browser) {
                Object.keys(action.payload).forEach(
                  (key) => localStorage && localStorage.setItem(key, action.payload[key])
                );
              }
              return {
                ...state,
                ...action.payload
              };
        }
    }
})

export const { updateUIValue } = uiSlice.actions
export default uiSlice.reducer