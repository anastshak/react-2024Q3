import { DataFetch } from '../types/types';

const BASE_URL = 'https://swapi.dev/api/people/';

export async function fetchData(searchQuery: string, page: number = 1): Promise<DataFetch> {
  return fetch(`${BASE_URL}?search=${searchQuery}&page=${page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => ({
      cards: data.results,
      totalPages: Math.ceil(data.count / 10),
    }))
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export async function fetchDetails(id: string) {
  return fetch(`${BASE_URL}${id}/`)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      throw error;
    });
}
