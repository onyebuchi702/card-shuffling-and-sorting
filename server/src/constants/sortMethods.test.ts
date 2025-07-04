import { SUITS, RANKS, SORT_METHODS } from "./sortMethods";
import { Suit, Rank, SortMethod } from "../types";

describe("Sort Methods Constants", () => {
  describe("SUITS", () => {
    it("contains all 4 suits", () => {
      expect(SUITS).toHaveLength(4);
    });

    it("contains Spades", () => {
      expect(SUITS).toContain("Spades");
    });

    it("contains Hearts", () => {
      expect(SUITS).toContain("Hearts");
    });

    it("contains Diamonds", () => {
      expect(SUITS).toContain("Diamonds");
    });

    it("contains Clubs", () => {
      expect(SUITS).toContain("Clubs");
    });

    it("has no duplicate suits", () => {
      const uniqueSuits = [...new Set(SUITS)];
      expect(uniqueSuits).toHaveLength(SUITS.length);
    });

    it("all items are valid Suit types", () => {
      const validSuits: Suit[] = ["Spades", "Hearts", "Diamonds", "Clubs"];
      SUITS.forEach((suit) => {
        expect(validSuits).toContain(suit);
      });
    });
  });

  describe("RANKS", () => {
    it("contains all 13 ranks", () => {
      expect(RANKS).toHaveLength(13);
    });

    it("contains Ace", () => {
      expect(RANKS).toContain("A");
    });

    it("contains all number cards", () => {
      const numberCards = ["2", "3", "4", "5", "6", "7", "8", "9", "10"];
      numberCards.forEach((rank) => {
        expect(RANKS).toContain(rank);
      });
    });

    it("contains all face cards", () => {
      const faceCards = ["J", "Q", "K"];
      faceCards.forEach((rank) => {
        expect(RANKS).toContain(rank);
      });
    });

    it("has no duplicate ranks", () => {
      const uniqueRanks = [...new Set(RANKS)];
      expect(uniqueRanks).toHaveLength(RANKS.length);
    });

    it("all items are valid Rank types", () => {
      const validRanks: Rank[] = [
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
      RANKS.forEach((rank) => {
        expect(validRanks).toContain(rank);
      });
    });

    it("maintains expected order", () => {
      const expectedOrder: Rank[] = [
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
      expect(RANKS).toEqual(expectedOrder);
    });
  });

  describe("SORT_METHODS", () => {
    it("contains RANK_THEN_SUIT method", () => {
      expect(SORT_METHODS).toHaveProperty("RANK_THEN_SUIT");
      expect(SORT_METHODS.RANK_THEN_SUIT).toBe("rank_then_suit");
    });

    it("contains SUIT_THEN_RANK method", () => {
      expect(SORT_METHODS).toHaveProperty("SUIT_THEN_RANK");
      expect(SORT_METHODS.SUIT_THEN_RANK).toBe("suit_then_rank");
    });

    it("has exactly 2 sort methods", () => {
      const keys = Object.keys(SORT_METHODS);
      expect(keys).toHaveLength(2);
    });

    it("all values are valid SortMethod types", () => {
      const validMethods: SortMethod[] = ["rank_then_suit", "suit_then_rank"];
      Object.values(SORT_METHODS).forEach((method) => {
        expect(validMethods).toContain(method);
      });
    });

    it("has no duplicate values", () => {
      const values = Object.values(SORT_METHODS);
      const uniqueValues = [...new Set(values)];
      expect(uniqueValues).toHaveLength(values.length);
    });

    it("keys are in UPPER_CASE format", () => {
      Object.keys(SORT_METHODS).forEach((key) => {
        expect(key).toMatch(/^[A-Z_]+$/);
      });
    });

    it("values are in snake_case format", () => {
      Object.values(SORT_METHODS).forEach((value) => {
        expect(value).toMatch(/^[a-z_]+$/);
      });
    });
  });
});
