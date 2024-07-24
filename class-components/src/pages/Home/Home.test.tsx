import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, vi, test, expect } from 'vitest';
import HomePage from './Home';
import { fetchData } from '../../services/api';
import { Character } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';

vi.mock('../../services/api', () => ({
  fetchData: vi.fn(),
}));

const mockedFetchData = fetchData as ReturnType<typeof vi.fn>;

describe('HomePage Component', () => {
  const renderWithTheme = (ui: JSX.Element) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render without errors', () => {
    renderWithTheme(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('should perform a search and display results', async () => {
    const mockData = {
      cards: [
        { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character,
        { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' } as Character,
      ],
      totalPages: 1,
    };
    mockedFetchData.mockResolvedValue(mockData);

    renderWithTheme(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 1);
    });

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
  });

  test('should display loader while fetching data', async () => {
    mockedFetchData.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                cards: [],
                totalPages: 1,
              }),
            100
          )
        )
    );

    renderWithTheme(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  test('should update the page number on pagination click', async () => {
    const mockData = {
      cards: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character],
      totalPages: 2,
    };
    mockedFetchData.mockResolvedValue(mockData);

    renderWithTheme(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 1);
    });

    const nextPageButton = screen.getByRole('button', { name: /→/i });
    expect(nextPageButton).toBeInTheDocument();

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 2);
    });
  });

  test('should update the page number on pagination click', async () => {
    const mockData = {
      cards: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character],
      totalPages: 2,
    };
    mockedFetchData.mockResolvedValue(mockData);

    renderWithTheme(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 1);
    });

    const nextPageButton = screen.getByRole('button', { name: /→/i });
    expect(nextPageButton).toBeInTheDocument();

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 2);
    });
  });

  test('should display and close card details', async () => {
    const mockData = {
      cards: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character],
      totalPages: 1,
    };
    mockedFetchData.mockResolvedValue(mockData);

    renderWithTheme(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith('Luke', 1);
    });

    const cardElement = screen.getByText('Luke Skywalker');
    fireEvent.click(cardElement);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });
  });
});
