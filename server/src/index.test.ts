import request from "supertest";
import app from "./index";
import { SORT_METHODS } from "./constants/sortMethods";
import {
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
  CardAction,
  Card,
} from "./types";

describe("Card Shuffling API", () => {
  describe("GET /api/deck", () => {
    it("returns a deck with 52 cards", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      expect(body.success).toBe(true);
      expect(body.deck).toHaveLength(52);
      expect(body.count).toBe(52);
      expect(body.error).toBeUndefined();
    });

    it("returns cards with correct structure", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      body.deck.forEach((card: Card) => {
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

    it("returns all 4 suits", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      const suits = [...new Set(body.deck.map((card: Card) => card.suit))];
      expect(suits).toHaveLength(4);
      expect(suits).toContain("Spades");
      expect(suits).toContain("Hearts");
      expect(suits).toContain("Diamonds");
      expect(suits).toContain("Clubs");
    });

    it("returns all 13 ranks", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      const ranks = [...new Set(body.deck.map((card: Card) => card.rank))];
      expect(ranks).toHaveLength(13);
      expect(ranks).toContain("A");
      expect(ranks).toContain("K");
      expect(ranks).toContain("Q");
      expect(ranks).toContain("J");
      expect(ranks).toContain("10");
    });

    it("returns cards with unique IDs", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      const ids = body.deck.map((card: Card) => card.id);
      const uniqueIds = [...new Set(ids)];
      expect(uniqueIds).toHaveLength(52);
    });
  });

  describe("POST /api/shuffle", () => {
    it("returns shuffled deck with 52 cards", async () => {
      const response = await request(app).post("/api/shuffle").expect(200);

      const body: ShuffleResponse = response.body;
      expect(body.success).toBe(true);
      expect(body.deck).toHaveLength(52);
      expect(body.action).toBe(CardAction.SHUFFLED);
      expect(body.error).toBeUndefined();
    });

    it("maintains all cards after shuffle", async () => {
      const originalResponse = await request(app).get("/api/deck");
      const originalDeck = originalResponse.body.deck;

      const shuffleResponse = await request(app)
        .post("/api/shuffle")
        .expect(200);

      const body: ShuffleResponse = shuffleResponse.body;

      originalDeck.forEach((card: Card) => {
        const foundCard = body.deck.find((c: Card) => c.id === card.id);
        expect(foundCard).toBeDefined();
        expect(foundCard).toEqual(card);
      });
    });

    it("changes deck order", async () => {
      const originalResponse = await request(app).get("/api/deck");
      const originalDeck = originalResponse.body.deck;

      const shuffleResponse = await request(app)
        .post("/api/shuffle")
        .expect(200);

      const body: ShuffleResponse = shuffleResponse.body;

      const isDifferent = originalDeck.some(
        (card: Card, index: number) => card.id !== body.deck[index].id
      );

      expect(isDifferent).toBe(true);
    });

    it("updates server state", async () => {
      await request(app).post("/api/shuffle");

      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      expect(body.deck).toHaveLength(52);
    });
  });

  describe("POST /api/sort", () => {
    it("returns sorted deck with 52 cards", async () => {
      await request(app).post("/api/shuffle");

      const response = await request(app).post("/api/sort").expect(200);

      const body: SortResponse = response.body;
      expect(body.success).toBe(true);
      expect(body.deck).toHaveLength(52);
      expect(body.action).toBe(CardAction.SORTED);
      expect(body.error).toBeUndefined();
    });

    it("returns valid sort method", async () => {
      const response = await request(app).post("/api/sort").expect(200);

      const body: SortResponse = response.body;
      const validMethods = Object.values(SORT_METHODS);
      expect(validMethods).toContain(body.method);
    });

    it("sorts deck correctly by rank then suit", async () => {
      await request(app).post("/api/shuffle");

      let sortResponse;
      do {
        sortResponse = await request(app).post("/api/sort");
      } while (sortResponse.body.method !== SORT_METHODS.RANK_THEN_SUIT);

      const body: SortResponse = sortResponse.body;

      for (let i = 1; i < body.deck.length; i++) {
        if (body.deck[i].value === body.deck[i - 1].value) {
          expect(body.deck[i].suit).not.toBe(body.deck[i - 1].suit);
        } else {
          expect(body.deck[i].value).toBeGreaterThan(body.deck[i - 1].value);
        }
      }
    });

    it("sorts deck correctly by suit then rank", async () => {
      await request(app).post("/api/shuffle");

      let sortResponse;
      do {
        sortResponse = await request(app).post("/api/sort");
      } while (sortResponse.body.method !== SORT_METHODS.SUIT_THEN_RANK);

      const body: SortResponse = sortResponse.body;

      let currentSuitValue = 0;
      let currentRankValue = 0;

      body.deck.forEach((card: Card) => {
        const suitValues = { Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 };
        const suitValue = suitValues[card.suit as keyof typeof suitValues];

        if (suitValue > currentSuitValue) {
          currentSuitValue = suitValue;
          currentRankValue = card.value;
        } else if (suitValue === currentSuitValue) {
          expect(card.value).toBeGreaterThanOrEqual(currentRankValue);
          currentRankValue = card.value;
        }
      });
    });

    it("maintains all cards after sort", async () => {
      const originalResponse = await request(app).get("/api/deck");
      const originalDeck = originalResponse.body.deck;

      const sortResponse = await request(app).post("/api/sort").expect(200);

      const body: SortResponse = sortResponse.body;

      originalDeck.forEach((card: Card) => {
        const foundCard = body.deck.find((c: Card) => c.id === card.id);
        expect(foundCard).toBeDefined();
        expect(foundCard).toEqual(card);
      });
    });

    it("updates server state", async () => {
      await request(app).post("/api/sort");

      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      expect(body.deck).toHaveLength(52);
    });
  });

  describe("POST /api/reset", () => {
    it("returns reset deck with 52 cards", async () => {
      await request(app).post("/api/shuffle");

      const response = await request(app).post("/api/reset").expect(200);

      const body: ResetResponse = response.body;
      expect(body.success).toBe(true);
      expect(body.deck).toHaveLength(52);
      expect(body.action).toBe(CardAction.RESET);
      expect(body.error).toBeUndefined();
    });

    it("resets deck to original order", async () => {
      await request(app).post("/api/shuffle");

      const resetResponse = await request(app).post("/api/reset").expect(200);

      const body: ResetResponse = resetResponse.body;

      expect(body.deck[0].rank).toBe("A");
      expect(body.deck[0].suit).toBe("Spades");
      expect(body.deck[51].rank).toBe("K");
      expect(body.deck[51].suit).toBe("Clubs");
    });

    it("maintains all cards after reset", async () => {
      await request(app).post("/api/shuffle");

      const resetResponse = await request(app).post("/api/reset").expect(200);

      const body: ResetResponse = resetResponse.body;

      expect(body.deck).toHaveLength(52);

      const suits = [...new Set(body.deck.map((card: Card) => card.suit))];
      const ranks = [...new Set(body.deck.map((card: Card) => card.rank))];

      expect(suits).toHaveLength(4);
      expect(ranks).toHaveLength(13);
    });

    it("updates server state", async () => {
      await request(app).post("/api/shuffle");
      await request(app).post("/api/reset");

      const response = await request(app).get("/api/deck").expect(200);

      const body: DeckResponse = response.body;
      expect(body.deck).toHaveLength(52);
    });
  });

  describe("Error Handling", () => {
    it("returns 404 for unknown endpoints", async () => {
      const response = await request(app).get("/api/unknown").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Endpoint not found");
    });

    it("returns 404 for POST to unknown endpoints", async () => {
      const response = await request(app).post("/api/unknown").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Endpoint not found");
    });

    it("handles invalid HTTP methods", async () => {
      const response = await request(app).put("/api/deck").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Endpoint not found");
    });
  });

  describe("API Response Format", () => {
    it("all responses have success field", async () => {
      const endpoints = [
        { method: "get", path: "/api/deck" },
        { method: "post", path: "/api/shuffle" },
        { method: "post", path: "/api/sort" },
        { method: "post", path: "/api/reset" },
      ];

      for (const endpoint of endpoints) {
        const response = await request(app)[endpoint.method as "get" | "post"](
          endpoint.path
        );
        expect(response.body).toHaveProperty("success");
        expect(typeof response.body.success).toBe("boolean");
      }
    });

    it("all successful responses have deck field", async () => {
      const endpoints = [
        { method: "get", path: "/api/deck" },
        { method: "post", path: "/api/shuffle" },
        { method: "post", path: "/api/sort" },
        { method: "post", path: "/api/reset" },
      ];

      for (const endpoint of endpoints) {
        const response = await request(app)[endpoint.method as "get" | "post"](
          endpoint.path
        );
        expect(response.body).toHaveProperty("deck");
        expect(Array.isArray(response.body.deck)).toBe(true);
      }
    });

    it("action endpoints have action field", async () => {
      const endpoints = [
        { method: "post", path: "/api/shuffle", action: CardAction.SHUFFLED },
        { method: "post", path: "/api/sort", action: CardAction.SORTED },
        { method: "post", path: "/api/reset", action: CardAction.RESET },
      ];

      for (const endpoint of endpoints) {
        const response = await request(app)[endpoint.method as "post"](
          endpoint.path
        );
        expect(response.body).toHaveProperty("action");
        expect(response.body.action).toBe(endpoint.action);
      }
    });

    it("sort endpoint has method field", async () => {
      const response = await request(app).post("/api/sort").expect(200);

      expect(response.body).toHaveProperty("method");
      expect(typeof response.body.method).toBe("string");
    });

    it("deck endpoint has count field", async () => {
      const response = await request(app).get("/api/deck").expect(200);

      expect(response.body).toHaveProperty("count");
      expect(typeof response.body.count).toBe("number");
      expect(response.body.count).toBe(response.body.deck.length);
    });
  });
});
