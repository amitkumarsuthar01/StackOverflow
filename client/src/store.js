import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import questionsReducer from "./features/questions/questionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
  },
});
