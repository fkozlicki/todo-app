import React from 'react';
import { render, screen, within, cleanup } from '@testing-library/react';
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

test('changing theme', async () => {
  const themeBtn = screen.getByTestId('themeBtn');
  const app = screen.getByTestId('app');

  expect(app.className).toMatch(/light/i);
  expect(app.className).not.toMatch(/dark/i);

  await userEvent.click(themeBtn);

  expect(app.className).not.toMatch(/light/i);
  expect(app.className).toMatch(/dark/i);
});

test('changing theme button image', async () => {
  const themeBtn = screen.getByTestId('themeBtn');
  const image = within(themeBtn).getByRole('img');

  await userEvent.click(themeBtn);

  expect(image).toHaveAttribute('src', '/images/icon-moon.svg');

  await userEvent.click(themeBtn);

  expect(image).toHaveAttribute('src', '/images/icon-sun.svg');
});
