import { formatSortMethod, getActionIcon } from "./StatusBar.utils";

describe("StatusBar.utils", () => {
  describe("formatSortMethod", () => {
    it("formats rank_then_suit correctly", () => {
      expect(formatSortMethod("rank_then_suit")).toBe("Rank → Suit");
    });

    it("formats suit_then_rank correctly", () => {
      expect(formatSortMethod("suit_then_rank")).toBe("Suit → Rank");
    });

    it("returns original method for unknown methods", () => {
      expect(formatSortMethod("unknown_method")).toBe("unknown_method");
    });

    it("returns empty string for undefined method", () => {
      expect(formatSortMethod(undefined)).toBe("");
    });

    it("returns empty string for null method", () => {
      expect(formatSortMethod(null as any)).toBe("");
    });

    it("returns empty string for empty string method", () => {
      expect(formatSortMethod("")).toBe("");
    });
  });

  describe("getActionIcon", () => {
    it("returns correct icon for shuffled action", () => {
      expect(getActionIcon("shuffled")).toBe("🔀");
    });

    it("returns correct icon for sorted action", () => {
      expect(getActionIcon("sorted")).toBe("📊");
    });

    it("returns correct icon for reset action", () => {
      expect(getActionIcon("reset")).toBe("🔄");
    });

    it("returns empty string for unknown action", () => {
      expect(getActionIcon("unknown")).toBe("");
    });

    it("returns empty string for empty string action", () => {
      expect(getActionIcon("")).toBe("");
    });
  });
});
