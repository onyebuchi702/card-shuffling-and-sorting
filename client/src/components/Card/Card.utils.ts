import { Suit, Rank } from "../../types";

export const getSuitSymbol = (suit: Suit): string => {
  const symbols: Record<Suit, string> = {
    Spades: "♠",
    Hearts: "♥",
    Diamonds: "♦",
    Clubs: "♣",
  };
  return symbols[suit] || suit;
};

export const getSuitColor = (suit: Suit): string => {
  return suit === "Hearts" || suit === "Diamonds" ? "red" : "black";
};

export const getRankDisplay = (rank: Rank): string => {
  const displayRanks: Record<string, string> = {
    A: "A",
    J: "J",
    Q: "Q",
    K: "K",
  };
  return displayRanks[rank] || rank;
};
