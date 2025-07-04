import { SUITS, RANKS, SORT_METHODS } from "../constants/sortMethods";
import { Card, Suit, Rank, SortMethod } from "../types";

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  SUITS.forEach((suit) => {
    RANKS.forEach((rank) => {
      deck.push({
        suit,
        rank,
        value: getRankValue(rank),
        id: `${rank}_${suit}`,
        display: `${rank} of ${suit}`,
      });
    });
  });
  return deck;
};

export const getRankValue = (rank: Rank): number => {
  const rankValues: Record<Rank, number> = {
    A: 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
  };
  return rankValues[rank];
};

export const getSuitValue = (suit: Suit): number => {
  const suitValues: Record<Suit, number> = {
    Spades: 4,
    Hearts: 3,
    Diamonds: 2,
    Clubs: 1,
  };
  return suitValues[suit];
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sortByRankThenSuit = (deck: Card[]): Card[] => {
  return deck.sort((a, b) => {
    if (a.value !== b.value) {
      return a.value - b.value;
    }
    return getSuitValue(a.suit) - getSuitValue(b.suit);
  });
};

export const sortBySuitThenRank = (deck: Card[]): Card[] => {
  return deck.sort((a, b) => {
    if (a.suit !== b.suit) {
      return getSuitValue(a.suit) - getSuitValue(b.suit);
    }
    return a.value - b.value;
  });
};

export const sortDeck = (deck: Card[], method: SortMethod): Card[] => {
  switch (method) {
    case SORT_METHODS.RANK_THEN_SUIT:
      return sortByRankThenSuit(deck);
    case SORT_METHODS.SUIT_THEN_RANK:
      return sortBySuitThenRank(deck);
    default:
      return sortByRankThenSuit(deck);
  }
};

export const getRandomSortMethod = (): SortMethod => {
  const methods = Object.values(SORT_METHODS);
  return methods[Math.floor(Math.random() * methods.length)];
};
