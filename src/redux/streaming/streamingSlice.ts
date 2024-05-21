import { IReduxAction } from "@interfaces/redux";
import { createSlice } from "@reduxjs/toolkit";

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
        },
        accessPrivateRequest: (state:any, action:IReduxAction<string>) => {
            return {
                ...state,
                privateRequests: state.privateRequests.filter((p:any) => p.conversationId !== action.payload),
                total: state.total - 1
              };
        },
        updateLiveStreamSettings: (state:any, action:IReduxAction<any>) => {
            return {
                ...state,
                settings: {
                  ...state.settings,
                  ...action.payload
                }
              };
        }
    }
})

export const { addPrivateRequest, accessPrivateRequest, updateLiveStreamSettings } = streamingSlice.actions
export default streamingSlice.reducer