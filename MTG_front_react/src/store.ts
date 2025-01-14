import { configureStore } from "@reduxjs/toolkit";
import filterColorReducer from "./Reducers/filterColorReducer";
import filterRarityReducer from "./Reducers/filterRarityReducer";
import filterSetReducer from "./Reducers/filterSetReducer";

export const store = configureStore({
  reducer: {
    filterColor: filterColorReducer,
    filterRarity: filterRarityReducer,
    filterSet: filterSetReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
