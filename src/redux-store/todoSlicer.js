import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  sortCriteria: "all",
};

export const todoSlicer = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload
    },
    addTodoTask: (state, action) => {
      console.log('action:', action.payload);
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      }
      console.log('new Task: ', newTask);
      console.log('state.todolist: BEFORE ', state.todoList);
      state.todoList?.push(newTask);

      console.log('state.todolist: AFTER   ', state.todoList);

      // state.todoList?.push({
      //   id: Date.now(),
      //   title: action.payload.title,
      //   description: action.payload.description,
      //   completed: false,
      // });
    },
    updateTodoTask: (state, action) => {
      const { id, title, description, completed } = action.payload;
      const targetTask = state.todoList.find(task => task.id === id);
      if (targetTask) {
        targetTask.title = title;
        targetTask.description = description;
        targetTask.completed = completed;
      }
    },
    taskCompletionToggle: (state, action) => {
      const taskToggled = state.todoList.find((task => task.id === action.payload.id));
      if (taskToggled) {
        taskToggled.completed = action.payload.completed;
      }
    },
    sortTodoList: (state, action) => {
      state.sortCriteria = action.payload;
    }
  },
});

export const { addTodoTask, updateTodoTask, setTodoList, taskCompletionToggle, sortTodoList } = todoSlicer.actions;

export default todoSlicer.reducer;