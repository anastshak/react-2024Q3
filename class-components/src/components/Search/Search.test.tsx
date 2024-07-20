import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Search from './Search';

describe('Search component', () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    onSearchMock.mockClear();
  });

  it('saves the entered value to local storage when Search button is clicked', () => {
    render(<Search onSearch={onSearchMock} />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    fireEvent.click(button);

    expect(localStorage.getItem('searchValue')).toBe('Luke Skywalker');

    expect(onSearchMock).toHaveBeenCalledWith('Luke Skywalker', 1);
  });

  it('retrieves value from local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'Stored Value');

    render(<Search onSearch={onSearchMock} />);

    const input: HTMLInputElement = screen.getByPlaceholderText('Please, enter your request');
    expect(input.value).toBe('Stored Value');
  });
});
