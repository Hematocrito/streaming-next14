"use client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loggedIn: false,
    authUser: null,
    loginAuth: {
      requesting: false,
      error: null,
      data: null,
      success: false
    },
    registerFanData: {
      requesting: false,
      error: null,
      data: null,
      success: false
    },
    registerPerformerData: {
      requesting: false,
      error: null,
      data: null,
      success: false
    },
    forgotData: {
      requesting: false,
      error: null,
      data: null,
      success: false
    }
  };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      login: (state) => {
          return {
              ...state,
              loginAuth: {
                  requesting: true,
                  error: null,
                  data: null,
                  success: false
              }
              };
      },
      loginSuccess: (state, action) => {
          return {
              ...state,
              loggedIn: true,
              loginAuth: {
                  requesting: false,
                  error: null,
                  data: action.payload,
                  success: true
              }
              };
      },
      logout: () => {
        return {
          ...initialState
        };
      }
  }
})

export const { login, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer