import { screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import CardList from './Card-list';
import { Character } from '../../types/types';
import { renderWithProviders } from '../../test/render-with-providers';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(() => ''),
  })),
}));

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

  const pushMock = vi.fn();
  const mockedUseRouter = useRouter as Mock;

  beforeEach(() => {
    pushMock.mockClear();
    mockedUseRouter.mockReturnValue({
      push: pushMock,
    });
  });

  test('renders the specified number of cards', () => {
    renderWithProviders(<CardList cards={mockCharacters} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getAllByText(/Skywalker|Vader/)).toHaveLength(2);
  });

  test('displays message if no cards are present', () => {
    renderWithProviders(<CardList cards={[]} />);
    expect(screen.getByText('No characters found')).toBeInTheDocument();
  });

  test('navigates to the correct URL when a card is clicked', async () => {
    renderWithProviders(<CardList cards={mockCharacters} />);

    const lukeSkywalkerCard = screen.getByText('Luke Skywalker');
    await userEvent.click(lukeSkywalkerCard);

    expect(pushMock).toHaveBeenCalledWith('/?page=1&search=&details=1');
  });
});
