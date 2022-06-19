import React, { useEffect } from 'react';
import { FilterBar, Header, InputBar, TodoList } from './components';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchTodoList } from './features/todo/todoSlice';

function App() {
  const theme = useAppSelector((state) => state.todo.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  return (
    <div data-testid="app" className={`App ${theme}`}>
      <div className="container">
        {/* HEADER */}
        <Header />
        {/* INPUT BAR */}
        <InputBar />
        {/* TODO LIST */}
        <TodoList />
        {/* FILTER BAR */}
        <FilterBar />
      </div>
    </div>
  );
}

export default App;
