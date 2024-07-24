import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Card from './Card';
import { Character } from '../../types/types';
import { ThemeProvider } from '../../context/themeContext';

describe('Card component', () => {
  const mockCharacter: Character = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: 172,
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  };

  const mockOnCardClick = vi.fn();

  const renderWithTheme = (ui: JSX.Element) => {
    return render(<ThemeProvider>{ui}</ThemeProvider>);
  };

  test('renders character name', () => {
    renderWithTheme(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('renders character gender', () => {
    renderWithTheme(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  test('renders character height', () => {
    renderWithTheme(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  test('renders character birth year', () => {
    renderWithTheme(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    expect(screen.getByText(/Birth year:/)).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
  });

  test('calls onCardClick with correct id when card is clicked', () => {
    renderWithTheme(<Card card={mockCharacter} onCardClick={mockOnCardClick} />);
    const cardElement = screen.getByTestId('card');

    fireEvent.click(cardElement);
    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith('1');
  });
});
