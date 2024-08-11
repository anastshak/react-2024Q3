import { screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import CardDetails from './Card-Details';
import { renderWithProviders } from '@test/render-with-providers';
import { CharacterDetails } from '../../types/types';

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

  test('should display "No details available" when details are undefined', () => {
    renderWithProviders(<CardDetails details={{} as CharacterDetails} />);

    expect(screen.getByText(/No details available/i)).toBeInTheDocument();
  });

  test('should display character details when provided', () => {
    renderWithProviders(<CardDetails details={mockDetails} />);

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
