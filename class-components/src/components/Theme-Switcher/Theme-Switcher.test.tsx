import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ThemeSwitcher from './Theme-Switcher';
import { useTheme } from '../../context/useTheme';

vi.mock('../../context/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockToggleTheme = vi.fn();

describe('ThemeSwitcher Component', () => {
  beforeEach(() => {
    (useTheme as vi.Mock).mockClear();
  });

  test('renders correctly', () => {
    (useTheme as vi.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    expect(screen.getByText(/Change Theme/i)).toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', () => {
    (useTheme as vi.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeSwitcher />);

    fireEvent.click(screen.getByText(/Change Theme/i));

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
