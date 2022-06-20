import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { ITodo } from '../../../features/todo/todoSlice';
import styles from './Todo.module.css';
import { actions as todoActions } from '../../../features/todo/todoSlice';
import { Draggable } from 'react-beautiful-dnd';
import { deleteTodo, updateCompleted } from '../../../firebase/firebase';

type TodoProps = {
  todo: ITodo;
  index: number;
};

const Todo: React.FC<TodoProps> = ({ todo, index }) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      dispatch(todoActions.delete(todo.id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    try {
      await updateCompleted(todo.id, checked);
      dispatch(
        todoActions.changeCompleted({
          id: todo.id,
          isCompleted: checked,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          data-testid="todo"
          className={styles.todo}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={styles.completedBox}>
            <input
              checked={todo.completed}
              onChange={handleUpdate}
              className={styles.completedInput}
              type="checkbox"
              id={`task${todo.id}`}
            />
            <label
              className={`${styles.completedLabel} ${
                todo.completed && styles.active
              }`}
              htmlFor={`task${todo.id}`}
            ></label>
            {todo.completed && (
              <img
                className={styles.checkIcon}
                src="/images/icon-check.svg"
                alt=""
              />
            )}
          </div>
          <p
            className={`${styles.content} ${
              todo.completed && styles.completed
            }`}
          >
            {todo.content}
          </p>
          <button
            data-testid="deleteBtn"
            onClick={handleDelete}
            className={styles.delete}
          >
            <img
              className={styles.deleteIcon}
              src="/images/icon-cross.svg"
              alt=""
            />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
