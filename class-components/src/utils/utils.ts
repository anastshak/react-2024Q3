import { Character } from '../types/types';

export const idFromUrl = (url: string) => {
  const num = url.match(/\/(\d+)\/$/);
  return num ? num[1] : null;
};

export const convertToCSV = (cards: Character[]): string => {
  const array = typeof cards !== 'object' ? JSON.parse(cards) : cards;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') line += ', ';

      line += array[i][index];
    }
    str += line + '\r\n';
  }

  const headers = [
    'name',
    'height',
    'mass',
    'hair color',
    'skin color',
    'eye color',
    'birth year',
    'gender',
    'homeworld',
    'films',
    'species',
    'vehicles',
    'starships',
    'created',
    'edited',
    'url',
  ];

  const csvContent = [headers.join(', '), str].join('\n');
  return csvContent;
};

type CheckAppFunctionParams = Record<string, unknown>;

type AppSearchParams = {
  searchDetails: string;
  currentPage: number;
  searchQuery: string;
};

export function checkTypesSearchParams({ details, page, query }: CheckAppFunctionParams): AppSearchParams {
  return {
    searchDetails: typeof details === 'string' ? details : '',
    currentPage: typeof page === 'string' ? +page : 1,
    searchQuery: typeof query === 'string' ? query : '',
  };
}
