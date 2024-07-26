import { configureStore } from '@reduxjs/toolkit';
import { swapiApi } from './swapiApi';
import { charactersReducer } from './charactersSlice';
import { selectedCharactersReducer } from './selectedCharactersSlice';

export const store = configureStore({
  reducer: {
    [swapiApi.reducerPath]: swapiApi.reducer,
    characters: charactersReducer,
    selected: selectedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swapiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
