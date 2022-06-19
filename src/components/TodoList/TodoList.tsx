import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Footer from './Footer/Footer';
import Todo from './Todo/Todo';
import styles from './TodoList.module.css';
import { actions as todoActions } from '../../features/todo/todoSlice';

const TodoList = () => {
  const status = useAppSelector((state) => state.todo.filterBy);
  const todoList = useAppSelector((state) => state.todo.todoList).filter(
    (todo) => {
      if (status === 'active') return !todo.completed;
      else if (status === 'completed') return todo.completed;
      else return todo;
    }
  );
  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult): void => {
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination!.index, 0, reorderedItem);

    dispatch(todoActions.setList(items));
  };

  return (
    <div className={styles.container}>
      {todoList.length > 0 ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todoList.map((todo, index) => (
                  <Todo key={todo.id} index={index} todo={todo} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p className={styles.message}>
          {status === 'active'
            ? 'No active tasks'
            : status === 'completed'
            ? 'No completed tasks'
            : 'No tasks yet'}
        </p>
      )}

      <Footer />
    </div>
  );
};

export default TodoList;
