import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../types/types';

export type SelectedState = {
  selectedCharacters: Character[];
};

const initialState: SelectedState = {
  selectedCharacters: [],
};

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<{ id: string; card: Character }>) {
      const { card } = action.payload;
      const index = state.selectedCharacters.findIndex((item) => item.url === card.url);

      if (index >= 0 && !card.isSelected) {
        state.selectedCharacters.splice(index, 1);
      } else {
        state.selectedCharacters.push({ ...card, isSelected: true });
      }
    },
    clearSelectedCards(state) {
      state.selectedCharacters = [];
    },
  },
});

export const { toggleSelected, clearSelectedCards } = selectedCharactersSlice.actions;
export const selectedCharactersReducer = selectedCharactersSlice.reducer;
