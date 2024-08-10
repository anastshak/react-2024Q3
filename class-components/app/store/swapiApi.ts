import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataFetch, CharacterDetails, CharactersPerPage } from '../types/types';

const BASE_URL = 'https://swapi.dev/api/people/';

const transformData = (response: CharactersPerPage): DataFetch => ({
  cards: response.results,
  totalPages: Math.ceil(response.count / 10),
});

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<DataFetch, { searchQuery: string; page?: number }>({
      query: ({ searchQuery, page }) => `?search=${searchQuery}&page=${page}`,
      transformResponse: (response: CharactersPerPage) => transformData(response),
    }),
    getCharacterById: builder.query<CharacterDetails, string>({
      query: (id) => `${id}`,
    }),
  }),
});

type UseGetCharactersQueryResult = ReturnType<typeof swapiApi.endpoints.getCharacters.useQuery>;
type UseGetCharacterByIdQueryResult = ReturnType<typeof swapiApi.endpoints.getCharacterById.useQuery>;

export const useGetCharactersQuery: (args: { searchQuery: string; page?: number }) => UseGetCharactersQueryResult =
  swapiApi.endpoints.getCharacters.useQuery;
export const useGetCharacterByIdQuery: (args: string) => UseGetCharacterByIdQueryResult =
  swapiApi.endpoints.getCharacterById.useQuery;
