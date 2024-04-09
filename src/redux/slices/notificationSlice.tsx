"use client";
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    success: false,
    notificationIds: [],
    notificationMapping: {},
    dataSource: [],
    page: 1,
    total: 0
  };

export const notificationSlice = createSlice({
name: "notification",
initialState,
reducers: {
    fetchNotification: (action) => {

    }
}
})

export const { fetchNotification } = notificationSlice.actions
export default notificationSlice.reducer

