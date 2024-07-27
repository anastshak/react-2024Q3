import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { Store, configureStore } from '@reduxjs/toolkit';
import FlyoutElement from './Flyout';
import { ThemeProvider } from '../../context/themeContext';
import { selectedCharactersReducer, clearSelectedCards, SelectedState } from '../../store/selectedCharactersSlice';

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

describe('FlyoutElement component', () => {
  const mockSelectedCharacters = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: 172,
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
    },
    { name: 'Darth Vader', gender: 'male', height: 202, birth_year: '41.9BBY', url: 'https://swapi.dev/api/people/2/' },
  ];

  const renderWithProviders = (ui: JSX.Element, store: AppStore) => {
    return render(
      <Provider store={store}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>
    );
  };

  test('displays the correct number of selected cards', () => {
    const store = createTestStore({ selected: { selectedCharacters: mockSelectedCharacters } });
    renderWithProviders(<FlyoutElement />, store);
    expect(screen.getByText(/2 cards are selected:/)).toBeInTheDocument();
  });

  test('clicking "Unselect all" button clears selected cards', () => {
    const store = createTestStore({ selected: { selectedCharacters: mockSelectedCharacters } });
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    renderWithProviders(<FlyoutElement />, store);

    const unselectButton = screen.getByText(/Unselect all/);
    fireEvent.click(unselectButton);

    expect(dispatchSpy).toHaveBeenCalledWith(clearSelectedCards());
  });

  test('download link has correct href attribute and download attribute', () => {
    const store = createTestStore({ selected: { selectedCharacters: mockSelectedCharacters } });
    renderWithProviders(<FlyoutElement />, store);

    const downloadLink: HTMLAnchorElement = screen.getByText(/Download/);

    expect(downloadLink).toHaveAttribute('href', 'http://mock-url.com');
    expect(downloadLink).toHaveAttribute('download', '2_cards.csv');
  });
});
