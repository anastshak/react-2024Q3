import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Card from './Card';
import { Character } from '../../types/types';

describe('Card component', () => {
  const mockCharacter: Character = {
    name: 'Harry Potter',
    gender: 'male',
    height: 170,
    birth_year: '1980',
  };

  test('renders character name', () => {
    render(<Card card={mockCharacter} />);
    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  });

  test('renders character gender', () => {
    render(<Card card={mockCharacter} />);
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  test('renders character height', () => {
    render(<Card card={mockCharacter} />);
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByText('170')).toBeInTheDocument();
  });

  test('renders character birth year', () => {
    render(<Card card={mockCharacter} />);
    expect(screen.getByText(/Birth year:/)).toBeInTheDocument();
    expect(screen.getByText('1980')).toBeInTheDocument();
  });
});
