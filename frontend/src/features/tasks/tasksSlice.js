import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    appendTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => (task.id !== action.payload))
    },
  },
});

export const { setTasks, appendTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
