import { Character, CharactersPerPage } from '../types/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CharactersState = {
  cards: Character[] | null;
  totalPages: number;
  isLoading: boolean;
};

const initialState: CharactersState = {
  cards: [],
  totalPages: 0,
  isLoading: false,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharactersPerPage>) {
      state.totalPages = Math.ceil(action.payload.count / 10);
      state.cards = action.payload.results;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setCharacters, setLoading } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
