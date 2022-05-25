import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { tasksApiSliceReducer, tasksApiSlice } from "./tasksApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tasksApiSlice.reducerPath]: tasksApiSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApiSlice.middleware),
});
