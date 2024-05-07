"use client";
import { IReduxAction } from "@interfaces/redux";
import { IUser } from "@interfaces/user";
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
        updateUserSuccess: (state, action) => {
            return {
                ...state,
                current: action.payload,
                updateSuccess: true,
                error: null
            };
        },
        updateUserFail: (state, action) => {
            return {
                ...state,
                updateUser: null,
                updateSuccess: false,
                error: action.payload
            };
        },
        setUpdating: (state, action) => {
            return {
                ...state,
                updating: action.payload,
                updateSuccess: false
            };
        }
    }
})

export const { updateCurrentUser, updateUserSuccess, updateUserFail, setUpdating } = userSlice.actions
export default userSlice.reducer