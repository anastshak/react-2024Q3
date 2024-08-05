import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ErrorButton } from './Error-button';
import { renderWithProviders } from '../../../test/render-with-providers';

describe('ErrorButton component', () => {
  test('should render the button correctly', () => {
    renderWithProviders(<ErrorButton />);
    expect(screen.getByText('throw error')).toBeInTheDocument();
  });

  test('should throw an error when the button is clicked', () => {
    const originalError = console.error;
    console.error = () => {};

    renderWithProviders(<ErrorButton />);

    const button = screen.getByText('throw error');

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Error');

    console.error = originalError;
  });
});
