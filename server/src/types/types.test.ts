import { Card, Suit, Rank, SortMethod, CardAction } from "./card";
import {
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
} from "./index";

describe("Card Types", () => {
  describe("Card interface", () => {
    it("accepts valid card structure", () => {
      const card: Card = {
        suit: "Spades",
        rank: "A",
        value: 1,
        id: "A_Spades",
        display: "A of Spades",
      };

      expect(card.suit).toBe("Spades");
      expect(card.rank).toBe("A");
      expect(card.value).toBe(1);
      expect(card.id).toBe("A_Spades");
      expect(card.display).toBe("A of Spades");
    });

    it("requires all properties", () => {
      const card: Card = {
        suit: "Hearts",
        rank: "K",
        value: 13,
        id: "K_Hearts",
        display: "K of Hearts",
      };

      expect(card).toHaveProperty("suit");
      expect(card).toHaveProperty("rank");
      expect(card).toHaveProperty("value");
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("display");
    });
  });

  describe("Suit type", () => {
    it("accepts valid suit values", () => {
      const spades: Suit = "Spades";
      const hearts: Suit = "Hearts";
      const diamonds: Suit = "Diamonds";
      const clubs: Suit = "Clubs";

      expect(spades).toBe("Spades");
      expect(hearts).toBe("Hearts");
      expect(diamonds).toBe("Diamonds");
      expect(clubs).toBe("Clubs");
    });
  });

  describe("Rank type", () => {
    it("accepts all valid rank values", () => {
      const ace: Rank = "A";
      const two: Rank = "2";
      const ten: Rank = "10";
      const jack: Rank = "J";
      const queen: Rank = "Q";
      const king: Rank = "K";

      expect(ace).toBe("A");
      expect(two).toBe("2");
      expect(ten).toBe("10");
      expect(jack).toBe("J");
      expect(queen).toBe("Q");
      expect(king).toBe("K");
    });
  });

  describe("SortMethod type", () => {
    it("accepts valid sort method values", () => {
      const rankThenSuit: SortMethod = "rank_then_suit";
      const suitThenRank: SortMethod = "suit_then_rank";

      expect(rankThenSuit).toBe("rank_then_suit");
      expect(suitThenRank).toBe("suit_then_rank");
    });
  });

  describe("CardAction enum", () => {
    it("contains SHUFFLED action", () => {
      expect(CardAction.SHUFFLED).toBe("shuffled");
    });

    it("contains SORTED action", () => {
      expect(CardAction.SORTED).toBe("sorted");
    });

    it("contains RESET action", () => {
      expect(CardAction.RESET).toBe("reset");
    });

    it("has exactly 3 actions", () => {
      const actions = Object.values(CardAction);
      expect(actions).toHaveLength(3);
    });
  });
});

describe("Response Types", () => {
  describe("DeckResponse interface", () => {
    it("accepts valid deck response structure", () => {
      const response: DeckResponse = {
        success: true,
        deck: [],
        count: 0,
      };

      expect(response.success).toBe(true);
      expect(response.deck).toEqual([]);
      expect(response.count).toBe(0);
    });

    it("accepts optional error field", () => {
      const response: DeckResponse = {
        success: false,
        deck: [],
        count: 0,
        error: "Test error",
      };

      expect(response.error).toBe("Test error");
    });
  });

  describe("ShuffleResponse interface", () => {
    it("accepts valid shuffle response structure", () => {
      const response: ShuffleResponse = {
        success: true,
        deck: [],
        action: CardAction.SHUFFLED,
      };

      expect(response.success).toBe(true);
      expect(response.deck).toEqual([]);
      expect(response.action).toBe(CardAction.SHUFFLED);
    });

    it("accepts optional error field", () => {
      const response: ShuffleResponse = {
        success: false,
        deck: [],
        action: CardAction.SHUFFLED,
        error: "Shuffle error",
      };

      expect(response.error).toBe("Shuffle error");
    });
  });

  describe("SortResponse interface", () => {
    it("accepts valid sort response structure", () => {
      const response: SortResponse = {
        success: true,
        deck: [],
        action: CardAction.SORTED,
        method: "rank_then_suit",
      };

      expect(response.success).toBe(true);
      expect(response.deck).toEqual([]);
      expect(response.action).toBe(CardAction.SORTED);
      expect(response.method).toBe("rank_then_suit");
    });

    it("accepts optional error field", () => {
      const response: SortResponse = {
        success: false,
        deck: [],
        action: CardAction.SORTED,
        method: "suit_then_rank",
        error: "Sort error",
      };

      expect(response.error).toBe("Sort error");
    });
  });

  describe("ResetResponse interface", () => {
    it("accepts valid reset response structure", () => {
      const response: ResetResponse = {
        success: true,
        deck: [],
        action: CardAction.RESET,
      };

      expect(response.success).toBe(true);
      expect(response.deck).toEqual([]);
      expect(response.action).toBe(CardAction.RESET);
    });

    it("accepts optional error field", () => {
      const response: ResetResponse = {
        success: false,
        deck: [],
        action: CardAction.RESET,
        error: "Reset error",
      };

      expect(response.error).toBe("Reset error");
    });
  });
});
