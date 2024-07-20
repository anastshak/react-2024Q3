import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';

describe('Pagination component', () => {
  const changePageMock = vi.fn();

  it('renders correctly', () => {
    render(<Pagination currentPage={1} totalPages={5} changePage={changePageMock} />);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '→' })).toBeEnabled();
  });

  it('disables previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} changePage={changePageMock} />);
    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
  });

  it('disables next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} changePage={changePageMock} />);
    expect(screen.getByRole('button', { name: '→' })).toBeDisabled();
  });

  it('calls changePage with correct arguments when next button is clicked', async () => {
    render(<Pagination currentPage={2} totalPages={5} changePage={changePageMock} />);
    await userEvent.click(screen.getByRole('button', { name: '→' }));
    expect(changePageMock).toHaveBeenCalledWith(3);
  });

  it('calls changePage with correct arguments when previous button is clicked', async () => {
    render(<Pagination currentPage={3} totalPages={5} changePage={changePageMock} />);
    await userEvent.click(screen.getByRole('button', { name: '←' }));
    expect(changePageMock).toHaveBeenCalledWith(2);
  });
});
