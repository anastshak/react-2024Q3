import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorNotFoundPage } from './ErrorNotFound';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorNotFoundPage component', () => {
  it('should display the error message', () => {
    render(
      <BrowserRouter>
        <ErrorNotFoundPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should have a link to the home page', () => {
    render(
      <BrowserRouter>
        <ErrorNotFoundPage />
      </BrowserRouter>
    );

    const linkElement = screen.getByText('Go home');
    expect(linkElement).toBeInTheDocument();

    expect(linkElement).toHaveAttribute('href', '/');
  });
});
