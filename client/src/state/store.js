import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { tasklistReducer } from "./tasklistSlice";
import { tasksApiSliceReducer, tasksApiSlice } from "./tasksApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasklist: tasklistReducer,
    [tasksApiSlice.reducerPath]: tasksApiSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApiSlice.middleware),
});
