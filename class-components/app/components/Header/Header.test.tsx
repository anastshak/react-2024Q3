import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { renderWithProviders } from '@test/render-with-providers';
import { createRemixStub } from '@remix-run/testing';
import Header from './Header';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: () => <Header />,
  },
]);

describe('Header component', () => {
  test('renders Search, ErrorButton, and ThemeSwitcher components', () => {
    renderWithProviders(<RemixStub initialEntries={['/']} />);

    expect(screen.getByPlaceholderText('Please, enter your request')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /throw error/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Change Theme/i })).toBeInTheDocument();
  });
});
