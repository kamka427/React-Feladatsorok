import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasklist: null,
  modifiedValues: null,
};

const tasklistSlice = createSlice({
  name: "tasklist",
  initialState,
  reducers: {
    createTasklist: (state) => {
      state.tasklist = {
        title: "",
        status: "",
        description: "",
        tasks: [],
      };
      state.modifiedValues = {
        tasks: [],
      };
    },

    setTasklist: (state, { payload: tasklist }) => {
      state.tasklist = { ...tasklist };
      state.modifiedValues = { tasks: [...tasklist.tasks] };
    },

    updateTasklist: (state, { payload: { tasklist, modifiedValues } }) => {
      state.tasklist = { ...tasklist };
      state.modifiedValues = { ...modifiedValues };
    },

    deleteTasklist: (state) => {
      state.tasklist = null;
      state.modifiedValues = null;
    },

    addTask: (state, { payload: task }) => {
      if (state.tasklist === null) {
        state.tasklist = {
          title: "",
          status: "",
          description: "",
          tasks: [],
        };
        state.modifiedValues = {
          tasks: [],
        };
      }
      state.tasklist.tasks = [...state.tasklist.tasks, task];
      state.modifiedValues.tasks = [...state.modifiedValues.tasks, task];
    },

    removeTask: (state, { payload: task }) => {
      state.tasklist.tasks = state.tasklist.tasks.filter(
        (elem) => elem.id !== task.id
      );
      state.modifiedValues.tasks = state.modifiedValues.tasks.filter(
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
  updateTasklist,
  addTask,
  removeTask,
} = tasklistSlice.actions;

//selectors
export const selectTasklist = (state) => state.tasklist.tasklist;
export const selectUneditedTasklist = (state) =>
  state.tasklist.uneditedTasklist;
export const selectIsNewTasklist = (state) => state.tasklist.isNewTasklist;
export const selectModifiedValues = (state) => state.tasklist.modifiedValues;
