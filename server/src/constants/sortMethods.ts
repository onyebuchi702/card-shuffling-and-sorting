import { Suit, Rank, SortMethod } from "../types";

export const SUITS: Suit[] = ["Spades", "Hearts", "Diamonds", "Clubs"];

export const RANKS: Rank[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const SORT_METHODS: Record<string, SortMethod> = {
  RANK_THEN_SUIT: "rank_then_suit",
  SUIT_THEN_RANK: "suit_then_rank",
};
