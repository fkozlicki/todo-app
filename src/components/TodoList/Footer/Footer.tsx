import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Footer.module.css';
import { actions as todoActions } from '../../../features/todo/todoSlice';
import { deleteCompleted } from '../../../firebase/firebase';

const Footer = () => {
  const numberOfIncompleted = useAppSelector(
    (state) => state.todo.todoList
  ).reduce((acc, val) => (val.completed ? acc : ++acc), 0);
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todo.todoList);

  const idsOfCompleted = todoList
    .filter((todo) => todo.completed)
    .map((todo) => todo.id);

  console.log(idsOfCompleted);

  const handleDeleteCompleted = async () => {
    await deleteCompleted(idsOfCompleted);
    dispatch(todoActions.deleteCompleted());
  };

  return (
    <div className={styles.footer}>
      <p className={styles.itemsLeft}>
        {numberOfIncompleted} item{numberOfIncompleted !== 1 && 's'} left
      </p>
      <button className={styles.btn} onClick={handleDeleteCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default Footer;
