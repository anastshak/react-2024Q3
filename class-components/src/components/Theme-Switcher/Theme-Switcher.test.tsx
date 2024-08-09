import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import ThemeSwitcher from './Theme-Switcher';
import { useTheme } from '../../context/useTheme';

vi.mock('../../context/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockToggleTheme = vi.fn();
const mockedUseTheme = useTheme as Mock;

describe('ThemeSwitcher Component', () => {
  beforeEach(() => {
    mockedUseTheme.mockClear();
  });

  test('renders correctly', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByText(/Change Theme/i)).toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByText(/Change Theme/i));

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
