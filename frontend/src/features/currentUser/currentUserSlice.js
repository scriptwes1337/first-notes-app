import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  username: null,
  name: null,
  id: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      const { id, token, name, username } = action.payload;
      state.token = token;
      state.id = id;
      state.name = name;
      state.username = username;
    },
    clearCurrentUser: (state) => {
      state.token = null;
      state.username = null;
      state.name = null;
      state.id = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
