export type Character = {
  name: string;
  gender: string;
  height: number;
  birth_year: string;
};

export interface DataFetch {
  cards: Character[];
  totalPages: number;
}
