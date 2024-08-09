import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import Search from './Search';
import { renderWithProviders } from '../../test/render-with-providers';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => ''),
  })),
}));

describe('Search component', () => {
  const pushMock = vi.fn();
  const mockedUseRouter = useRouter as Mock;

  beforeEach(() => {
    localStorage.clear();
    pushMock.mockClear();
    mockedUseRouter.mockReturnValue({
      push: pushMock,
    });
  });

  test('saves the entered value to local storage and triggers navigation when Search button is clicked', () => {
    renderWithProviders(<Search />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke' } });

    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Luke');
    expect(pushMock).toHaveBeenCalledWith('/?page=1&search=Luke&details=');
  });

  test('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'Stored Value');

    renderWithProviders(<Search />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    expect(input.value).toBe('Stored Value');
  });
});
