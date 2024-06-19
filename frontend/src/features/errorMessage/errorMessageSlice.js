import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.message = action.payload;
    },
    clearErrorMessage: (state, action) => {
      state.message = null;
    },
  },
});

export const { setErrorMessage, clearErrorMessage } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;

export const displayErrorMessage = (message) => {
  return async (dispatch) => {
    dispatch(setErrorMessage(message));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 5000);
  };
};
