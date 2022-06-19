import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
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

test('changing theme', () => {
  const themeBtn = screen.getByTestId('themeBtn');
  const app = screen.getByTestId('app');

  expect(app.className).toMatch(/light/i);
  expect(app.className).not.toMatch(/dark/i);

  fireEvent.click(themeBtn);

  expect(app.className).not.toMatch(/light/i);
  expect(app.className).toMatch(/dark/i);
});

test('changing theme button image', () => {
  const themeBtn = screen.getByTestId('themeBtn');
  const image = within(themeBtn).getByRole('img');

  expect(image).toHaveAttribute('src', '/images/icon-moon.svg');

  fireEvent.click(themeBtn);

  expect(image).toHaveAttribute('src', '/images/icon-sun.svg');
});
