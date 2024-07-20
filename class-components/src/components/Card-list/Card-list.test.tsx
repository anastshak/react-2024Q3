import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardList from './Card-list';
import { Character } from '../../types/types';

describe('CardList component', () => {
  const mockCharacters: Character[] = [
    { name: 'Luke Skywalker', gender: 'male', height: 172, birth_year: '19BBY' },
    { name: 'Darth Vader', gender: 'male', height: 202, birth_year: '41.9BBY' },
  ];

  it('renders the specified number of cards', () => {
    render(<CardList cards={mockCharacters} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getAllByText(/Skywalker|Vader/)).toHaveLength(2);
  });

  it('displays message if no cards are present', () => {
    render(<CardList cards={[]} />);
    expect(screen.getByText('No characters found')).toBeInTheDocument();
  });
});
