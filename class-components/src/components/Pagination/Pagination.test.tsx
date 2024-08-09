import { screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/render-with-providers';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => ''),
  })),
}));

describe('Pagination component', () => {
  const pushMock = vi.fn();
  const mockedUseRouter = useRouter as Mock;

  beforeEach(() => {
    pushMock.mockClear();
    mockedUseRouter.mockReturnValue({
      push: pushMock,
    });
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

  test('navigates to the next page when next button is clicked', async () => {
    renderWithProviders(<Pagination currentPage={2} totalPages={5} />);
    await userEvent.click(screen.getByRole('button', { name: '→' }));
    expect(pushMock).toHaveBeenCalledWith('/?page=3&search=&details=');
  });

  test('navigates to the previous page when previous button is clicked', async () => {
    renderWithProviders(<Pagination currentPage={3} totalPages={5} />);
    await userEvent.click(screen.getByRole('button', { name: '←' }));
    expect(pushMock).toHaveBeenCalledWith('/?page=2&search=&details=');
  });
});
