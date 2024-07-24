import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CardDetails from './Card-Details';
import { fetchDetails } from '../../services/api';
import { CharacterDetails } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';

vi.mock('../../services/api', () => ({
  fetchDetails: vi.fn(),
}));

const mockedFetchDetails = fetchDetails as ReturnType<typeof vi.fn>;

describe('CardDetails Component', () => {
  const mockDetails: CharacterDetails = {
    name: 'Luke Skywalker',
    height: 172,
    mass: 77,
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
    renderWithTheme(<CardDetails id="1" />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display character details when fetched successfully', async () => {
    mockedFetchDetails.mockResolvedValue(mockDetails);

    renderWithTheme(<CardDetails id="1" />);

    await waitFor(() => {
      expect(
        screen.getByText((_content, element) => element?.textContent === 'Name: Luke Skywalker')
      ).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Height: 172')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Mass: 77')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Birth year: 19BBY')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Gender: male')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Hair Color: blond')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Skin Color: fair')).toBeInTheDocument();
      expect(screen.getByText((_content, element) => element?.textContent === 'Eye Color: blue')).toBeInTheDocument();
    });
  });

  test('should display error message when fetch fails', async () => {
    mockedFetchDetails.mockRejectedValue(new Error('Error fetching details'));

    renderWithTheme(<CardDetails id="1" />);

    await waitFor(() => {
      expect(screen.getByText('No details available')).toBeInTheDocument();
    });
  });
});
