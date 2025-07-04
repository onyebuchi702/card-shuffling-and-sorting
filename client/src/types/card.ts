export enum CardAction {
  SHUFFLED = "shuffled",
  SORTED = "sorted",
  RESET = "reset",
}

export interface Card {
  id: string;
  suit: Suit;
  rank: Rank;
  display: string;
}

export type Suit = "Spades" | "Hearts" | "Diamonds" | "Clubs";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";
export type SortMethod =
  | "default"
  | "shuffle"
  | "bubble"
  | "quick"
  | "merge"
  | "heap";

export interface GameState {
  deck: Card[];
  isLoading: boolean;
  error: string | null;
  lastAction: string | null;
  sortMethod: string | null;
}

export interface CardComponentProps {
  card: Card;
  index: number;
}

export interface DeckDisplayProps {
  deck: Card[];
  isLoading: boolean;
}
