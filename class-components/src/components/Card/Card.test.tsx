import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Card from './Card';
import { Character } from '../../types/types';
import { toggleSelected } from '../../store/selectedCharactersSlice';
import { renderWithProviders, setupStore } from '../../test/render-with-providers';
import { idFromUrl } from '../../utils/utils';

URL.createObjectURL = vi.fn(() => 'http://mock-url.com');

describe('Card component', () => {
  const mockCharacter: Character = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: 172,
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  };

  const mockOnCardClick = vi.fn();

  test('renders character name', () => {
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('renders character gender', () => {
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  test('renders character height', () => {
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  test('renders character birth year', () => {
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Birth year:/)).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  test('calls onCardClick with correct id when card is clicked', () => {
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    const cardElement = screen.getByTestId('card');

    fireEvent.click(cardElement);
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith('1');
  });

  test('dispatches toggleSelected when checkbox is clicked', () => {
    const preloadedState = { selected: { selectedCharacters: [] } };
    const store = setupStore(preloadedState);
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, { store });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const expectedId = idFromUrl(mockCharacter.url) as string;
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(toggleSelected({ id: expectedId, card: mockCharacter }));
  });
});
