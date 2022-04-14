import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "../features/counter/candidateSlice";

export const store = configureStore({
  reducer: {
    candidate: candidateReducer,
  },
});
