import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import styles from './InputBar.module.css';
import { actions as todoActions } from '../../features/todo/todoSlice';
import { addTodo } from '../../firebase/firebase';

const SearchBar = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content) return;

    const newTodo = {
      completed,
      content,
    };

    try {
      const id: string = await addTodo(newTodo);
      dispatch(todoActions.add({ id, ...newTodo }));
    } catch (error) {
      console.error(error);
    }

    setCompleted(false);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.completedBox}>
        <input
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className={styles.completedInput}
          type="checkbox"
          id="completed"
        />
        <label
          className={`${styles.completedLabel} ${completed && styles.active}`}
          htmlFor="completed"
        ></label>
        {completed && (
          <img
            className={styles.checkIcon}
            src={`${process.env.PUBLIC_URL}/images/icon-check.svg`}
            alt=""
          />
        )}
      </div>
      <input
        data-testid="todoInput"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.todoInput}
        type="text"
        placeholder="Create a new todo..."
      />
      <button type="submit"></button>
    </form>
  );
};

export default SearchBar;
