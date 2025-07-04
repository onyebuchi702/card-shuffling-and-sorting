const { SUITS, RANKS, SORT_METHODS } = require("../constants/sortMethods");

export const createDeck = () => {
  const deck = [];
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

export const getRankValue = (rank) => {
  const rankValues = {
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

export const getSuitValue = (suit) => {
  const suitValues = {
    Spades: 4,
    Hearts: 3,
    Diamonds: 2,
    Clubs: 1,
  };
  return suitValues[suit];
};

export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sortByRankThenSuit = (deck) => {
  return deck.sort((a, b) => {
    if (a.value !== b.value) {
      return a.value - b.value;
    }
    return getSuitValue(a.suit) - getSuitValue(b.suit);
  });
};

export const sortBySuitThenRank = (deck) => {
  return deck.sort((a, b) => {
    if (a.suit !== b.suit) {
      return getSuitValue(a.suit) - getSuitValue(b.suit);
    }
    return a.value - b.value;
  });
};

export const sortDeck = (deck, method) => {
  switch (method) {
    case SORT_METHODS.RANK_THEN_SUIT:
      return sortByRankThenSuit(deck);
    case SORT_METHODS.SUIT_THEN_RANK:
      return sortBySuitThenRank(deck);
    default:
      return sortByRankThenSuit(deck);
  }
};
