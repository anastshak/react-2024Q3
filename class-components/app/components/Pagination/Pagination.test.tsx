import { screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@test/render-with-providers';
import { useSearchParams } from '@remix-run/react';

vi.mock('@remix-run/react', () => ({
  useSearchParams: vi.fn(),
}));

describe('Pagination component', () => {
  const setSearchParamsMock = vi.fn();
  const getSearchParams = () => new URLSearchParams({ search: '', page: '1', details: '' });
  const mockUseSearchParams = useSearchParams as Mock;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([getSearchParams(), setSearchParamsMock]);
  });

  test('renders correctly', () => {
    renderWithProviders(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '→' })).toBeEnabled();
  });

  test('disables previous button on the first page', () => {
    renderWithProviders(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    renderWithProviders(<Pagination currentPage={5} totalPages={5} />);

    expect(screen.getByRole('button', { name: '→' })).toBeDisabled();
  });

  test('sets correct search params when next button is clicked', async () => {
    renderWithProviders(<Pagination currentPage={2} totalPages={5} />);

    await userEvent.click(screen.getByRole('button', { name: '→' }));

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '3', search: '' });
  });

  test('sets correct search params when previous button is clicked', async () => {
    renderWithProviders(<Pagination currentPage={3} totalPages={5} />);

    await userEvent.click(screen.getByRole('button', { name: '←' }));

    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2', search: '' });
  });
});
