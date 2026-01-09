import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    list: [],
    searchQuery: "",
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setQuestions(state, action) {
      state.list = action.payload;
    },
  },
});

export const { setSearchQuery, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
