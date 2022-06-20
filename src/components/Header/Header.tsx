import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Header.module.css';
import { actions as todoActions } from '../../features/todo/todoSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.todo.theme);

  return (
    <header className={styles.header}>
      <span className={styles.logo}>TODO</span>
      <button
        data-testid="themeBtn"
        onClick={() => dispatch(todoActions.changeTheme())}
      >
        <img
          className={styles.toggleImg}
          src={
            theme === 'light'
              ? `${process.env.PUBLIC_URL}/images/icon-moon.svg`
              : `${process.env.PUBLIC_URL}/images/icon-sun.svg`
          }
          alt=""
        />
      </button>
    </header>
  );
};

export default Header;
