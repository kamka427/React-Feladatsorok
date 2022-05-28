import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: null,
};

const emptyTasklistTemplate = {
  id: null,
  title: "",
  descriptiom: "",
  status: "",
  tasks: [],
};

const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    setTasklist: (state, { payload: tasklist }) => {
      state.tasklist = { ...tasklist };
    },
    createTasklist: (state) => {
      state.tasklist = { ...emptyTasklistTemplate };
    },
    deleteTasklist: (state) => {
      state.tasklist = null;
    },
    addTask: (state, { payload: task }) => {
      if (state.tasklist === null)
        state.tasklist = { ...emptyTasklistTemplate };
      state.tasklist.tasks = [...state.tasklist.tasks, task];
    },
    removeTask: (state, { payload: task }) => {
      state.tasklist.tasks = state.tasklist.tasks.filter(
        (elem) => elem.id !== task.id
      );
    },
  },
});

//reducer
export const tasklistReducer = tasklistSlice.reducer;

//action creators
export const {
  setTasklist,
  createTasklist,
  deleteTasklist,
  addTask,
  removeTask,
} = tasklistSlice.actions;

//selectors
export const selectTasklist = (state) => state.tasklist.tasklist;
