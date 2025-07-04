import { getSuitSymbol, getSuitColor, getRankDisplay } from "./Card.utils";
import { Suit, Rank } from "../../types";

describe("Card.utils", () => {
  describe("getSuitSymbol", () => {
    it("returns correct symbol for Spades", () => {
      expect(getSuitSymbol("Spades")).toBe("♠");
    });

    it("returns correct symbol for Hearts", () => {
      expect(getSuitSymbol("Hearts")).toBe("♥");
    });

    it("returns correct symbol for Diamonds", () => {
      expect(getSuitSymbol("Diamonds")).toBe("♦");
    });

    it("returns correct symbol for Clubs", () => {
      expect(getSuitSymbol("Clubs")).toBe("♣");
    });

    it("returns original suit if not found", () => {
      expect(getSuitSymbol("Unknown" as Suit)).toBe("Unknown");
    });
  });

  describe("getSuitColor", () => {
    it("returns red for Hearts", () => {
      expect(getSuitColor("Hearts")).toBe("red");
    });

    it("returns red for Diamonds", () => {
      expect(getSuitColor("Diamonds")).toBe("red");
    });

    it("returns black for Spades", () => {
      expect(getSuitColor("Spades")).toBe("black");
    });

    it("returns black for Clubs", () => {
      expect(getSuitColor("Clubs")).toBe("black");
    });

    it("returns black for unknown suit", () => {
      expect(getSuitColor("Unknown" as Suit)).toBe("black");
    });
  });

  describe("getRankDisplay", () => {
    it("returns A for Ace", () => {
      expect(getRankDisplay("A")).toBe("A");
    });

    it("returns J for Jack", () => {
      expect(getRankDisplay("J")).toBe("J");
    });

    it("returns Q for Queen", () => {
      expect(getRankDisplay("Q")).toBe("Q");
    });

    it("returns K for King", () => {
      expect(getRankDisplay("K")).toBe("K");
    });

    it("returns numeric ranks unchanged", () => {
      expect(getRankDisplay("2")).toBe("2");
      expect(getRankDisplay("3")).toBe("3");
      expect(getRankDisplay("4")).toBe("4");
      expect(getRankDisplay("5")).toBe("5");
      expect(getRankDisplay("6")).toBe("6");
      expect(getRankDisplay("7")).toBe("7");
      expect(getRankDisplay("8")).toBe("8");
      expect(getRankDisplay("9")).toBe("9");
      expect(getRankDisplay("10")).toBe("10");
    });

    it("returns unknown rank unchanged", () => {
      expect(getRankDisplay("Unknown" as Rank)).toBe("Unknown");
    });
  });
});
