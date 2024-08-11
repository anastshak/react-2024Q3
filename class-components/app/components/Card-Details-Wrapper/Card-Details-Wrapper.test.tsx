import { screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect, beforeEach, Mock } from 'vitest';
import CardDetailsWrapper from './Card-Details-Wrapper';
import { CharacterDetails } from '../../types/types';
import { useSearchParams } from '@remix-run/react';
import { renderWithProviders } from '@test/render-with-providers';

vi.mock('@remix-run/react', () => ({
  useSearchParams: vi.fn(),
}));

describe('CardDetailsWrapper Component', () => {
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

  const setSearchParams = vi.fn();
  const getSearchParams = () => new URLSearchParams({ search: 'test', page: '1' });
  const mockUseSearchParams = useSearchParams as Mock;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue([getSearchParams(), setSearchParams]);
  });

  test('should render CardDetails and close button', () => {
    renderWithProviders(<CardDetailsWrapper details={mockDetails} />);

    expect(screen.getByText(/Name:/i)).toHaveTextContent('Name: Luke Skywalker');
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('should call setSearchParams with correct parameters when "Close" button is clicked', () => {
    renderWithProviders(<CardDetailsWrapper details={mockDetails} />);

    fireEvent.click(screen.getByText('Close'));

    expect(setSearchParams).toHaveBeenCalledWith({ page: '1', search: 'test' });
  });
});
