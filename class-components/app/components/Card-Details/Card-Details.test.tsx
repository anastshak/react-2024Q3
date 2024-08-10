import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CardDetails from './Card-Details';
import { useGetCharacterByIdQuery } from '../../store/swapiApi';
import { ThemeProvider } from '../../context/themeContext';

vi.mock('../../store/swapiApi', () => ({
  useGetCharacterByIdQuery: vi.fn(),
}));

const mockedUseGetCharacterByIdQuery = useGetCharacterByIdQuery as ReturnType<typeof vi.fn>;

describe('CardDetails Component', () => {
  const mockDetails = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    gender: 'male',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
  };

  const renderWithTheme = (ui: JSX.Element) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test('should display loading state initially', () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderWithTheme(<CardDetails id="1" />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display character details when fetched successfully', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: mockDetails,
      error: null,
      isLoading: false,
    });

    renderWithTheme(<CardDetails id="1" />);

    await waitFor(() => {
      expect(screen.getByText(/Name:/i)).toHaveTextContent('Name: Luke Skywalker');
      expect(screen.getByText(/Height:/i)).toHaveTextContent('Height: 172');
      expect(screen.getByText(/Mass:/i)).toHaveTextContent('Mass: 77');
      expect(screen.getByText(/Birth year:/i)).toHaveTextContent('Birth year: 19BBY');
      expect(screen.getByText(/Gender:/i)).toHaveTextContent('Gender: male');
      expect(screen.getByText(/Hair Color:/i)).toHaveTextContent('Hair Color: blond');
      expect(screen.getByText(/Skin Color:/i)).toHaveTextContent('Skin Color: fair');
      expect(screen.getByText(/Eye Color:/i)).toHaveTextContent('Eye Color: blue');
    });
  });

  test('should display error message when fetch fails', async () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: null,
      error: new Error('Error fetching details'),
      isLoading: false,
    });

    renderWithTheme(<CardDetails id="1" />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching details')).toBeInTheDocument();
    });
  });
});
