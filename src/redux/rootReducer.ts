import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import settingsSlice from "@redux/settings/settingsSlice";
import uiSlice from "@redux/ui/uiSlice";
import userSlice from "@redux/user/userSlice";
import authSlice from "./auth/authSlice";
import streamingSlice from './streaming/streamingSlice';


const rootReducer = combineReducers({
    ui: uiSlice,
    settings: settingsSlice,
    user: userSlice,
    auth: authSlice,
    streaming: streamingSlice
    //router: connectRouter(history)
  });
  
  export default rootReducer;