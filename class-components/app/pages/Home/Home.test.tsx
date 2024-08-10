import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, vi, test, expect } from 'vitest';
import HomePage from './Home';
import { Character } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useGetCharactersQuery } from '../../store/swapiApi';

vi.mock('../../store/swapiApi', async () => {
  const actual = await vi.importActual<typeof import('../../store/swapiApi')>('../../store/swapiApi');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(),
  };
});

const mockedFetchData = useGetCharactersQuery as ReturnType<typeof vi.fn>;

const renderWithProviders = (ui: JSX.Element) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
};

describe('HomePage Component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should render without errors', () => {
    mockedFetchData.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    renderWithProviders(
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

    mockedFetchData.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    renderWithProviders(
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
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    });
  });

  test('should display loader while fetching data', async () => {
    mockedFetchData.mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
    });

    renderWithProviders(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should update the page number on pagination click', async () => {
    const mockData = {
      cards: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character],
      totalPages: 2,
    };
    mockedFetchData.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByRole('button', { name: /→/i });
    expect(nextPageButton).toBeInTheDocument();

    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockedFetchData).toHaveBeenCalledWith({ searchQuery: 'Luke', page: 2 });
    });
  });

  test('should display and close card details', async () => {
    const mockData = {
      cards: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character],
      totalPages: 1,
    };
    mockedFetchData.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/?search=Luke&page=1']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
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
