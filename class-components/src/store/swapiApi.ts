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

export const {
  useGetCharacterByIdQuery,
  useGetCharactersQuery,
  util: { getRunningQueriesThunk },
} = swapiApi;
