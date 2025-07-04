import {
  createDeck,
  getRankValue,
  getSuitValue,
  shuffleDeck,
  sortByRankThenSuit,
  sortBySuitThenRank,
  sortDeck,
  getRandomSortMethod,
} from "../utils/card";
import { SUITS, RANKS, SORT_METHODS } from "../constants/sortMethods";
import { Card, Suit, SortMethod } from "../types";

describe("Card Utils", () => {
  describe("createDeck", () => {
    it("creates a deck with 52 cards", () => {
      const deck = createDeck();
      expect(deck).toHaveLength(52);
    });

    it("creates cards with all suits and ranks", () => {
      const deck = createDeck();

      SUITS.forEach((suit) => {
        RANKS.forEach((rank) => {
          const card = deck.find((c) => c.suit === suit && c.rank === rank);
          expect(card).toBeDefined();
          expect(card?.id).toBe(`${rank}_${suit}`);
          expect(card?.display).toBe(`${rank} of ${suit}`);
        });
      });
    });

    it("assigns correct values to all cards", () => {
      const deck = createDeck();

      deck.forEach((card) => {
        expect(card.value).toBe(getRankValue(card.rank));
        expect(card.value).toBeGreaterThan(0);
        expect(card.value).toBeLessThanOrEqual(13);
      });
    });

    it("creates unique card IDs", () => {
      const deck = createDeck();
      const ids = deck.map((card) => card.id);
      const uniqueIds = [...new Set(ids)];

      expect(uniqueIds).toHaveLength(52);
    });

    it("creates cards with proper structure", () => {
      const deck = createDeck();

      deck.forEach((card) => {
        expect(card).toHaveProperty("suit");
        expect(card).toHaveProperty("rank");
        expect(card).toHaveProperty("value");
        expect(card).toHaveProperty("id");
        expect(card).toHaveProperty("display");
        expect(typeof card.suit).toBe("string");
        expect(typeof card.rank).toBe("string");
        expect(typeof card.value).toBe("number");
        expect(typeof card.id).toBe("string");
        expect(typeof card.display).toBe("string");
      });
    });
  });

  describe("getRankValue", () => {
    it("returns correct value for Ace", () => {
      expect(getRankValue("A")).toBe(1);
    });

    it("returns correct values for number cards", () => {
      expect(getRankValue("2")).toBe(2);
      expect(getRankValue("3")).toBe(3);
      expect(getRankValue("4")).toBe(4);
      expect(getRankValue("5")).toBe(5);
      expect(getRankValue("6")).toBe(6);
      expect(getRankValue("7")).toBe(7);
      expect(getRankValue("8")).toBe(8);
      expect(getRankValue("9")).toBe(9);
      expect(getRankValue("10")).toBe(10);
    });

    it("returns correct values for face cards", () => {
      expect(getRankValue("J")).toBe(11);
      expect(getRankValue("Q")).toBe(12);
      expect(getRankValue("K")).toBe(13);
    });

    it("returns values in ascending order for all ranks", () => {
      const values = RANKS.map(getRankValue);

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe("getSuitValue", () => {
    it("returns correct value for Clubs", () => {
      expect(getSuitValue("Clubs")).toBe(1);
    });

    it("returns correct value for Diamonds", () => {
      expect(getSuitValue("Diamonds")).toBe(2);
    });

    it("returns correct value for Hearts", () => {
      expect(getSuitValue("Hearts")).toBe(3);
    });

    it("returns correct value for Spades", () => {
      expect(getSuitValue("Spades")).toBe(4);
    });

    it("returns unique values for all suits", () => {
      const values = SUITS.map(getSuitValue);
      const uniqueValues = [...new Set(values)];

      expect(uniqueValues).toHaveLength(4);
    });

    it("returns values in ascending order", () => {
      const suitOrder: Suit[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
      const values = suitOrder.map(getSuitValue);

      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });
  });

  describe("shuffleDeck", () => {
    it("returns deck with same length", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);

      expect(shuffled).toHaveLength(deck.length);
    });

    it("contains all original cards", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);

      deck.forEach((card) => {
        const foundCard = shuffled.find((c) => c.id === card.id);
        expect(foundCard).toBeDefined();
        expect(foundCard).toEqual(card);
      });
    });

    it("does not mutate original deck", () => {
      const deck = createDeck();
      const originalOrder = [...deck];
      shuffleDeck(deck);

      expect(deck).toEqual(originalOrder);
    });

    it("produces different order most of the time", () => {
      const deck = createDeck();
      const shuffled1 = shuffleDeck(deck);
      const shuffled2 = shuffleDeck(deck);

      const isDifferent = shuffled1.some(
        (card, index) => card.id !== shuffled2[index].id
      );

      expect(isDifferent).toBe(true);
    });

    it("handles empty deck", () => {
      const emptyDeck: Card[] = [];
      const shuffled = shuffleDeck(emptyDeck);

      expect(shuffled).toHaveLength(0);
    });

    it("handles single card deck", () => {
      const singleCard = createDeck().slice(0, 1);
      const shuffled = shuffleDeck(singleCard);

      expect(shuffled).toHaveLength(1);
      expect(shuffled[0]).toEqual(singleCard[0]);
    });
  });

  describe("sortByRankThenSuit", () => {
    it("sorts cards by rank first", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      const sorted = sortByRankThenSuit(shuffled);

      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].value).toBeGreaterThanOrEqual(sorted[i - 1].value);
      }
    });

    it("sorts cards by suit when ranks are equal", () => {
      const deck = createDeck();
      const sorted = sortByRankThenSuit(deck);

      const aceCards = sorted.filter((card) => card.rank === "A");
      expect(aceCards[0].suit).toBe("Clubs");
      expect(aceCards[1].suit).toBe("Diamonds");
      expect(aceCards[2].suit).toBe("Hearts");
      expect(aceCards[3].suit).toBe("Spades");
    });

    it("maintains correct deck length", () => {
      const deck = createDeck();
      const sorted = sortByRankThenSuit(deck);

      expect(sorted).toHaveLength(52);
    });

    it("preserves all cards", () => {
      const deck = createDeck();
      const sorted = sortByRankThenSuit(deck);

      deck.forEach((card) => {
        const foundCard = sorted.find((c) => c.id === card.id);
        expect(foundCard).toBeDefined();
      });
    });

    it("places Ace of Clubs first", () => {
      const deck = createDeck();
      const sorted = sortByRankThenSuit(deck);

      expect(sorted[0].rank).toBe("A");
      expect(sorted[0].suit).toBe("Clubs");
    });

    it("places King of Spades last", () => {
      const deck = createDeck();
      const sorted = sortByRankThenSuit(deck);

      expect(sorted[51].rank).toBe("K");
      expect(sorted[51].suit).toBe("Spades");
    });
  });

  describe("sortBySuitThenRank", () => {
    it("sorts cards by suit first", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      const sorted = sortBySuitThenRank(shuffled);

      let currentSuitValue = 0;
      sorted.forEach((card) => {
        const suitValue = getSuitValue(card.suit);
        expect(suitValue).toBeGreaterThanOrEqual(currentSuitValue);
        currentSuitValue = suitValue;
      });
    });

    it("sorts cards by rank within same suit", () => {
      const deck = createDeck();
      const sorted = sortBySuitThenRank(deck);

      const clubCards = sorted.filter((card) => card.suit === "Clubs");
      for (let i = 1; i < clubCards.length; i++) {
        expect(clubCards[i].value).toBeGreaterThan(clubCards[i - 1].value);
      }
    });

    it("maintains correct deck length", () => {
      const deck = createDeck();
      const sorted = sortBySuitThenRank(deck);

      expect(sorted).toHaveLength(52);
    });

    it("preserves all cards", () => {
      const deck = createDeck();
      const sorted = sortBySuitThenRank(deck);

      deck.forEach((card) => {
        const foundCard = sorted.find((c) => c.id === card.id);
        expect(foundCard).toBeDefined();
      });
    });

    it("places Ace of Clubs first", () => {
      const deck = createDeck();
      const sorted = sortBySuitThenRank(deck);

      expect(sorted[0].rank).toBe("A");
      expect(sorted[0].suit).toBe("Clubs");
    });

    it("places King of Spades last", () => {
      const deck = createDeck();
      const sorted = sortBySuitThenRank(deck);

      expect(sorted[51].rank).toBe("K");
      expect(sorted[51].suit).toBe("Spades");
    });
  });

  describe("sortDeck", () => {
    it("sorts by rank then suit when method is rank_then_suit", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      const sorted = sortDeck(shuffled, SORT_METHODS.RANK_THEN_SUIT);
      const expectedSort = sortByRankThenSuit([...shuffled]);

      expect(sorted).toEqual(expectedSort);
    });

    it("sorts by suit then rank when method is suit_then_rank", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      const sorted = sortDeck(shuffled, SORT_METHODS.SUIT_THEN_RANK);
      const expectedSort = sortBySuitThenRank([...shuffled]);

      expect(sorted).toEqual(expectedSort);
    });

    it("defaults to rank then suit for unknown method", () => {
      const deck = createDeck();
      const shuffled = shuffleDeck(deck);
      const sorted = sortDeck(shuffled, "unknown" as SortMethod);
      const expectedSort = sortByRankThenSuit([...shuffled]);

      expect(sorted).toEqual(expectedSort);
    });

    it("maintains correct deck length", () => {
      const deck = createDeck();
      const sorted = sortDeck(deck, SORT_METHODS.RANK_THEN_SUIT);

      expect(sorted).toHaveLength(52);
    });

    it("preserves all cards", () => {
      const deck = createDeck();
      const sorted = sortDeck(deck, SORT_METHODS.SUIT_THEN_RANK);

      deck.forEach((card) => {
        const foundCard = sorted.find((c) => c.id === card.id);
        expect(foundCard).toBeDefined();
      });
    });
  });

  describe("getRandomSortMethod", () => {
    it("returns a valid sort method", () => {
      const method = getRandomSortMethod();
      const validMethods = Object.values(SORT_METHODS);

      expect(validMethods).toContain(method);
    });

    it("returns different methods over multiple calls", () => {
      const methods = new Set();

      for (let i = 0; i < 20; i++) {
        methods.add(getRandomSortMethod());
      }

      expect(methods.size).toBeGreaterThan(1);
    });

    it("only returns defined sort methods", () => {
      for (let i = 0; i < 10; i++) {
        const method = getRandomSortMethod();
        expect(method).toBeDefined();
        expect(typeof method).toBe("string");
      }
    });
  });
});
