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
      return state.filter((task) => task.id !== action.payload);
    },
    updateTasks: (state, action) => {
      const { id, updatedTask } = action.payload;
      console.log(id)
      console.log(updatedTask)
      return state.map((task) =>
        task.id === action.payload.id ? action.payload.updatedTask : task
      );
    },
  },
});

export const { setTasks, appendTask, deleteTask, updateTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
