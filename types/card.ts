export type SortMethod = "rank_then_suit" | "suit_then_rank";
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

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
  id: string;
  display: string;
}
