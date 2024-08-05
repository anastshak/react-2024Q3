import { screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Search from './Search';
import { renderWithProviders } from '../../test/render-with-providers';

describe('Search component', () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onSearchMock.mockClear();
  });

  test('saves the entered value to local storage when Search button is clicked', () => {
    renderWithProviders(<Search onSearch={onSearchMock} />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Luke Skywalker');

    expect(onSearchMock).toHaveBeenCalledWith('Luke Skywalker', 1);
  });

  test('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'Stored Value');

    renderWithProviders(<Search onSearch={onSearchMock} />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    expect(input.value).toBe('Stored Value');
  });
});
