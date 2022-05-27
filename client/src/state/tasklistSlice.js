import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: null,
};

const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    setTasklist: (state, { payload: tasklist }) => {
      state.tasklist = tasklist;
    },
    createTasklist: (state) => {
      state.tasklist = {
        title: "",
        descriptiom: "",
        status: "",
        tasks: [],
      };
    },
    deleteTasklist: (state) => {
      state.tasklist = null;
    },
    addTask: (state, { payload: task }) => {
      state.tasklist.tasks.push(task);
    },
    removeTask: (state, { payload: task }) => {
      state.tasklist.tasks = state.tasklist.tasks.filter(
        (t) => t.id !== task.id
      );
    },
  },
});

//reducer
export const tasklistReducer = tasklistSlice.reducer;

//action creators
export const { setTasklist, createTasklist } = tasklistSlice.actions;

//selectors
export const selectTasklist = (state) => state.tasklist;
