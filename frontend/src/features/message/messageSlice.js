import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: null,
  successMessage: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state, action) => {
      state.errorMessage = null;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state, action) => {
      state.successMessage = null;
    },
  },
});

export const {
  setErrorMessage,
  clearErrorMessage,
  setSuccessMessage,
  clearSuccessMessage,
} = messageSlice.actions;
export default messageSlice.reducer;

export const displayErrorMessage = (message) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 5000);
  };
};

export const displaySuccessMessage = (message) => {
  return async (dispatch) => {
    dispatch(setSuccessMessage(message));
    setTimeout(() => {
      dispatch(clearSuccessMessage());
    }, 5000);
  };
};
