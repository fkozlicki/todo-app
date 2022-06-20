import React from 'react';
import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import App from '../../../App';

const renderApp = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

beforeEach(renderApp);
afterEach(cleanup);

test('deleting todo', async () => {
  let todoToDelete = await screen.findByRole('button', {
    name: /some todo/i,
  });

  expect(todoToDelete).toBeInTheDocument();

  const deleteBtn = within(todoToDelete).getByTestId('deleteBtn');

  await userEvent.click(deleteBtn);

  todoToDelete = await screen.findByRole('button', {
    name: /some todo/i,
  });

  expect(todoToDelete).not.toBeInTheDocument();
});
