import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorButton } from './Error-button';

describe('ErrorButton component', () => {
  it('should render the button correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText('throw error')).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', () => {
    const originalError = console.error;
    console.error = () => {};

    render(<ErrorButton />);

    const button = screen.getByText('throw error');

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Error');

    console.error = originalError;
  });
});
