"use client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    current: {
      _id: null,
      avatar: '/no-avatar.png',
      cover: null,
      name: '',
      email: ''
    },
    error: null,
    updateSuccess: false,
    updating: false
  };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateCurrentUser: (state, action) => {
            return {
                ...state,
                current: action.payload
              };
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        }
    }
})

export const { updateCurrentUser } = userSlice.actions
export default userSlice.reducer