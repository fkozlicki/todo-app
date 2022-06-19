import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodos } from '../../firebase/firebase';

export interface ITodo {
  id: string;
  content: string;
  completed: boolean;
}

export interface TodoState {
  todoList: ITodo[];
  theme: 'light' | 'dark';
  filterBy: 'all' | 'active' | 'completed';
}

const initialState: TodoState = {
  theme: 'light',
  todoList: [],
  filterBy: 'all',
};

export const fetchTodoList = createAsyncThunk('todo/fetchTodo', async () => {
  const data = await fetchTodos();
  return data;
});

export const { reducer, actions } = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<ITodo[]>) => {
      state.todoList = action.payload;
    },
    add: (state, action: PayloadAction<ITodo>) => {
      state.todoList.push(action.payload);
    },
    changeCompleted: (
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>
    ) => {
      const { id, isCompleted } = action.payload;
      console.log(id, isCompleted);

      state.todoList.map(
        (todo) => todo.id === id && (todo.completed = isCompleted)
      );
    },
    delete: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    deleteCompleted: (state) => {
      state.todoList = state.todoList.filter((todo) => !todo.completed);
    },
    changeFilter: (
      state,
      action: PayloadAction<'all' | 'active' | 'completed'>
    ) => {
      state.filterBy = action.payload;
    },
    changeTheme: (state) => {
      state.theme === 'dark' ? (state.theme = 'light') : (state.theme = 'dark');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
  },
});
