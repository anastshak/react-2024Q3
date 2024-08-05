import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { ErrorPage } from './Error-page';
import { renderWithProviders } from '../../../test/render-with-providers';

describe('ErrorPage component', () => {
  test('should render the error message and reset button', () => {
    renderWithProviders(<ErrorPage />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('should reload the page when the reset button is clicked', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    renderWithProviders(<ErrorPage />);
    const button = screen.getByText('Reset');
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
