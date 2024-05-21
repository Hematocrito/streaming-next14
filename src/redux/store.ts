"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
//import rootSaga from "./rootSaga";
import { watchLogin } from "@redux/auth/authSaga";
import createSagaMiddleware from "redux-saga";

const saga = createSagaMiddleware();
const middleware = [saga]

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware)
 });

 saga.run(watchLogin);

 export default store;