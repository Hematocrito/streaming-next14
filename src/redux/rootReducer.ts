import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import settingsSlice from "@redux/slices/settingsSlice";
import uiSlice from "@redux/slices/uiSlice";
import userSlice from "@redux/user/userSlice";
import authSlice from "./auth/authSlice";


const rootReducer = combineReducers({
    ui: uiSlice,
    settings: settingsSlice,
    user: userSlice,
    auth: authSlice
    //router: connectRouter(history)
  });
  
  export default rootReducer;