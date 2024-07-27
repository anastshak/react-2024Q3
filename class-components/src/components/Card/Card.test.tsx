import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';
import Card from './Card';
import { Character } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';
import { selectedCharactersReducer, SelectedState, toggleSelected } from '../../store/selectedCharactersSlice';

URL.createObjectURL = vi.fn(() => 'http://mock-url.com');

type AppStore = Store<{ selected: SelectedState }>;

const createTestStore = (preloadedState?: { selected: SelectedState }): AppStore => {
  return configureStore({
    reducer: {
      selected: selectedCharactersReducer,
    },
    preloadedState,
  });
};

const renderWithProviders = (ui: JSX.Element, store: AppStore) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
};

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
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('renders character gender', () => {
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  test('renders character height', () => {
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  test('renders character birth year', () => {
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    expect(screen.getByText(/Birth year:/)).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  test('calls onCardClick with correct id when card is clicked', () => {
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    const cardElement = screen.getByTestId('card');

    fireEvent.click(cardElement);
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith('1');
  });

  test('dispatches toggleSelected when checkbox is clicked', () => {
    const store = createTestStore({ selected: { selectedCharacters: [] } });
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    renderWithProviders(<Card card={mockCharacter} onCardClick={mockOnCardClick} />, store);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(dispatchSpy).toHaveBeenCalledWith(toggleSelected({ id: '1', card: mockCharacter }));
  });
});
