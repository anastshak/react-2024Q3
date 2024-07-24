import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import CardList from './Card-list';
import { Character } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';

describe('CardList component', () => {
  const mockCharacters: Character[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: 172,
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
    },
    { name: 'Darth Vader', gender: 'male', height: 202, birth_year: '41.9BBY', url: 'https://swapi.dev/api/people/2/' },
  ];

  const mockHandleCardClick = vi.fn();

  const renderWithTheme = (ui: JSX.Element) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test('renders the specified number of cards', () => {
    renderWithTheme(<CardList cards={mockCharacters} handleCardClick={mockHandleCardClick} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getAllByText(/Skywalker|Vader/)).toHaveLength(2);
  });

  test('displays message if no cards are present', () => {
    render(<CardList cards={[]} handleCardClick={mockHandleCardClick} />);
    expect(screen.getByText('No characters found')).toBeInTheDocument();
  });
});
