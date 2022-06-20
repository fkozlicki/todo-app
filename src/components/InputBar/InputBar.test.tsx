import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import App from '../../App';

const renderApp = () => {
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

beforeEach(renderApp);
afterEach(cleanup);

test('check if input value change', async () => {
  const inputEl = screen.getByTestId<HTMLInputElement>('todoInput');

  await userEvent.type(inputEl, 'first todo');

  expect(inputEl).toHaveValue('first todo');
});

test('adding todo', async () => {
  const inputEl = screen.getByTestId<HTMLInputElement>('todoInput');

  await userEvent.type(inputEl, 'first todo{enter}');

  const firstTodo = await screen.findByText(/first todo/i);

  expect(firstTodo).toBeInTheDocument();
});
