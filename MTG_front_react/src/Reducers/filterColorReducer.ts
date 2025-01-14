import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      name: "White",
      value: "W",
      label: "White",
    },
    {
      name: "Black",
      value: "B",
      label: "Black",
    },
    {
      name: "Red",
      value: "R",
      label: "Red",
    },
    {
      name: "Blue",
      value: "U",
      label: "Blue",
    },
    {
      name: "Green",
      value: "G",
      label: "Green",
    },
  ],
};

const filterColorSlice = createSlice({
  name: "filterColor",
  initialState,
  reducers: {
    setFilterColor: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default filterColorSlice.reducer;
