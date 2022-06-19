import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
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

// beforeEach(renderApp);

test('check if input value change', () => {
  renderApp();

  userEvent.type(screen.getByTestId('todoInput'), 'first todo');

  expect(screen.getByTestId('todoInput')).toHaveDisplayValue('first todo');
});
