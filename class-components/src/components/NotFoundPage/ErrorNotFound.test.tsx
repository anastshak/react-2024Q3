import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ErrorNotFoundPage } from './ErrorNotFound';
import { renderWithProviders } from '../../test/render-with-providers';

describe('ErrorNotFoundPage component', () => {
  test('should display the error message', () => {
    renderWithProviders(<ErrorNotFoundPage />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('should have a link to the home page', () => {
    renderWithProviders(<ErrorNotFoundPage />);

    const linkElement = screen.getByText('Go home');
    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute('href', '/');
  });
});
