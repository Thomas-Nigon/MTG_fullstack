import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const setSetSlice = createSlice({
  name: "setSet",
  initialState,
  reducers: {
    setFilterSet: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFilterSet } = setSetSlice.actions;
export default setSetSlice.reducer;
