"use client";
import { createSlice } from "@reduxjs/toolkit"
import { IReduxAction } from 'src/interfaces';

const initialState = {
    settings: {
      viewerURL: '',
      publisherURL: '',
      optionForBroadcast: 'hls',
      optionForPrivate: 'hls',
      secureOption: false
    },
    privateRequests: [],
    total: 0
  };

  export const streamingSlice = createSlice({
    name: "streaming",
    initialState,
    reducers: {
        addPrivateRequest: (state:any, action:IReduxAction<any>) => {
            return {
                ...state,
                privateRequests: [...state.privateRequests, action.payload],
                total: state.total + 1
              };
        }
    }
  })

  export const { addPrivateRequest } = streamingSlice.actions
export default streamingSlice.reducer