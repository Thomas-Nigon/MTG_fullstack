import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      name: "Common",
      value: "common",
    },
    {
      name: "Uncommon",
      value: "uncommon",
    },
    {
      name: "Rare",
      value: "rare",
    },
    {
      name: "Mythic Rare",
      value: "mythic",
    },
  ],
};

const filterRaritySlice = createSlice({
  name: "filterRarity",
  initialState,
  reducers: {
    setFilterRarity: (state, action) => {
      state.list = action.payload;
    },
  },
});

export default filterRaritySlice.reducer;
