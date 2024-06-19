import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import errorMessageReducer from "../features/errorMessage/errorMessageSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    errorMessage: errorMessageReducer,
  },
});
