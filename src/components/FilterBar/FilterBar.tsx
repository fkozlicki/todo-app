import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './FilterBar.module.css';
import { actions as todoActions } from '../../features/todo/todoSlice';

const FilterBar = () => {
  const status = useAppSelector((state) => state.todo.filterBy);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <button
        onClick={() => dispatch(todoActions.changeFilter('all'))}
        className={`${status === 'all' && styles.active}`}
      >
        All
      </button>
      <button
        onClick={() => dispatch(todoActions.changeFilter('active'))}
        className={`${status === 'active' && styles.active}`}
      >
        Active
      </button>
      <button
        onClick={() => dispatch(todoActions.changeFilter('completed'))}
        className={`${status === 'completed' && styles.active}`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterBar;
