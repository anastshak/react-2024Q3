import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './swapiApi';
import { charactersReducer } from './charactersSlice';
import { selectedCharactersReducer } from './selectedCharactersSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      [swapiApi.reducerPath]: swapiApi.reducer,
      characters: charactersReducer,
      selected: selectedCharactersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper(makeStore);
