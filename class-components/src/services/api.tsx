import { Character } from '../components/Card/Card';

const BASE_URL = 'https://swapi.dev/api/people/';

export type Data = {
  count: number;
  next: string;
  previous: number;
  results: Character[];
};

export async function getAllCharacters(pageNumber: number = 1): Promise<Data> {
  const url = `${BASE_URL}?page=${pageNumber}`;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();

  return data;
}

export async function getSearchResult(query: string): Promise<Data> {
  const url = `${BASE_URL}?search=${query}`;
  const response = await fetch(url);
  const result = await response.json();

  return result;
}

export async function fetchData(pageNumber: number = 1) {
  let cards: Character[] = [];
  const value: string | null = localStorage.getItem('searchValue');
  if (value === '') {
    try {
      const data: Data = await getAllCharacters(pageNumber);
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
