import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

test('renders filter buttons - all, active, completed', () => {
  expect(
    screen.getByRole('button', {
      name: /all/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: /active/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', {
      name: /^completed/i,
    })
  ).toBeInTheDocument();
});

test('all button should be active on render', () => {
  const allBtn = screen.getByRole('button', { name: /all/i });
  expect(allBtn.className).toMatch(/active/);
});

test('while all button is active, other should disactive', () => {
  const allBtn = screen.getByRole('button', { name: /all/i });
  const activeBtn = screen.getByRole('button', { name: /active/i });
  const completeBtn = screen.getByRole('button', { name: /^complete/i });

  expect(allBtn.className).toMatch(/active/);
  expect(activeBtn.className).not.toMatch(/active/);
  expect(completeBtn.className).not.toMatch(/active/);
});

test('change color on click', async () => {
  const allBtn = screen.getByRole('button', { name: /all/i });
  const activeBtn = screen.getByRole('button', { name: /active/i });
  const completeBtn = screen.getByRole('button', { name: /^complete/i });

  fireEvent.click(activeBtn);
  expect(activeBtn.className).toBe('active');
  expect(allBtn.className).not.toBe('active');
  expect(completeBtn.className).not.toBe('active');

  fireEvent.click(completeBtn);
  expect(completeBtn.className).toBe('active');
  expect(allBtn.className).not.toBe('active');
  expect(activeBtn.className).not.toBe('active');

  fireEvent.click(allBtn);
  expect(allBtn.className).toBe('active');
  expect(activeBtn.className).not.toBe('active');
  expect(completeBtn.className).not.toBe('active');
});
