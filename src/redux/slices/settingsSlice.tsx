"use client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ccbillEnabled: false,
    verotelEnabled: false
  };

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return {
                ...state,
                ...action.payload
              };
        }
    }
})

export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer