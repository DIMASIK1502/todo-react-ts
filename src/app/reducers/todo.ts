import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  list: Todo[];
}

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    editTodo: (state, action: PayloadAction<Todo>): void => {
      const index: number = state.list.findIndex(
        (x) => x.id === action.payload.id
      );
      if (index > -1) {
        state.list[index] = action.payload;
      }
    },
    addTodo: (state, action: PayloadAction<Todo>): void => {
      state.list.unshift(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>): void => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
