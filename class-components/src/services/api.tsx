import { Character } from '../components/Card/Card';

const BASE_URL = 'https://swapi.dev/api/people/';

export type Data = {
  count: number;
  next: string;
  previous: number;
  results: Character[];
};

export async function getAllCharacters(): Promise<Data> {
  const url = `${BASE_URL}`;
  const response = await fetch(url, { method: 'GET' });
  const allCharacters = await response.json();

  return allCharacters;
}

export async function getSearchResult(query: string): Promise<Data> {
  const url = `${BASE_URL}?search=${query}`;
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export async function fetchData() {
  let cards: Character[] = [];
  const value: string | null = localStorage.getItem('searchValue');
  if (value === '') {
    try {
      const data: Data = await getAllCharacters();
      cards = data.results;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  } else {
    try {
      const data: Data = await getSearchResult(value ? value : '');
      cards = data.results;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }
  return cards;
}
