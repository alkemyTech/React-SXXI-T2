import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    inBackOffice: window.location.pathname.startsWith("/backoffice"),
  },
  reducers: {
    changeHeader: (state, action) => {
      state.inBackOffice = action.payload;
    },
  },
});

export const { changeHeader } = headerSlice.actions;

export default headerSlice.reducer;

export const setInBackOffice = () => (dispatch) => {
  dispatch(changeHeader(true));
};

export const setInSite = () => (dispatch) => {
  dispatch(changeHeader(false));
};
