import settingsSlice from "@redux/slices/settingsSlice";
import uiSlice from "@redux/slices/uiSlice";
import userSlice from "@redux/slices/userSlice";
import authSlice from "./auth/authSlice";

const rootReducers = {
    ui: uiSlice,
    settings: settingsSlice,
    user: userSlice,
    auth: authSlice
  };
  
  export default rootReducers;