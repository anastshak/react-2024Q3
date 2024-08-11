import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import Search from './Search';
import { renderWithProviders } from '../../test/render-with-providers';
import { useSearchParams } from '@remix-run/react';

vi.mock('@remix-run/react', () => ({
  useSearchParams: vi.fn(),
}));

describe('Search component', () => {
  const setSearchParamsMock = vi.fn();
  const getSearchParams = () => new URLSearchParams({ search: '', page: '1', details: '' });
  const mockUseSearchParams = useSearchParams as Mock;

  beforeEach(() => {
    localStorage.clear();
    setSearchParamsMock.mockClear();
    mockUseSearchParams.mockReturnValue([getSearchParams(), setSearchParamsMock]);
  });

  test('saves the entered value to local storage and triggers search when Search button is clicked', () => {
    renderWithProviders(<Search />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke' } });

    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Luke');
    expect(setSearchParamsMock).toHaveBeenCalledWith({ search: 'Luke', page: '1', details: '' });
  });

  test('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'Stored Value');

    renderWithProviders(<Search />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    expect(input.value).toBe('Stored Value');
  });
});
