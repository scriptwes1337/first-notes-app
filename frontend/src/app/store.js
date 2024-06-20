import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import messageReducer from "../features/message/messageSlice";
import tasksReducer from "../features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    message: messageReducer,
    tasks: tasksReducer,
  },
});
