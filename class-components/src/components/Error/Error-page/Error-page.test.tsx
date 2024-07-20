import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorPage } from './Error-page';

describe('ErrorPage component', () => {
  it('should render the error message and reset button', () => {
    render(<ErrorPage />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('should reload the page when the reset button is clicked', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    render(<ErrorPage />);
    const button = screen.getByText('Reset');
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
