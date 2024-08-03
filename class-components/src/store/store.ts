import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './swapiApi';
import { charactersReducer } from './charactersSlice';
import { selectedCharactersReducer } from './selectedCharactersSlice';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      characters: charactersReducer,
      selected: selectedCharactersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
