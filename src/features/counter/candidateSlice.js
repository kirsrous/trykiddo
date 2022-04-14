// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchCount } from "./counterAPI";

// const initialState = {
//   value: 0,
//   status: "idle",
// };

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(incrementAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(incrementAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.value += action.payload;
//       });
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export const selectCount = (state) => state.counter.value;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

// export default counterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
export const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    candidate: {
      id: null,
      response: [],
      questions: [],
    },
  },
  reducers: {
    addId: (state, action) => {
      state.candidate.id = action.payload;
    },
    addResponses: (state, action) => {
      state.candidate.response = action.payload;
    },
    addQuestions: (state, action) => {
      state.candidate.questions = action.payload;
    },
  },
});

export const { addId, addResponses, addQuestions } = candidateSlice.actions;

export const selectCandidate = (state) => state.candidate.candidate;

export default candidateSlice.reducer;