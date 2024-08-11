import { configureStore } from '@reduxjs/toolkit';
import { selectedCharactersReducer } from './selectedCharactersSlice';

export const store = configureStore({
  reducer: {
    selected: selectedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
