export interface Character {
  name: string;
  gender: string;
  height: number;
  birth_year: string;
  url: string;
  isSelected?: boolean;
}

export interface CharacterDetails {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

export interface DataFetch {
  cards: Character[];
  totalPages: number;
}

export interface CharactersPerPage {
  count: number;
  results: Character[];
}
