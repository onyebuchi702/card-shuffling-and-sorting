import { apiService } from "./api";
import {
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
} from "../types/api";
import { CardAction, Card, Suit, Rank } from "../types";

global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe("ApiService", () => {
  const mockCards: Card[] = [
    { id: "1", suit: "Hearts" as Suit, rank: "A" as Rank, display: "A♥" },
    { id: "2", suit: "Spades" as Suit, rank: "K" as Rank, display: "K♠" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getDeck", () => {
    it("should fetch deck successfully", async () => {
      const mockResponse: DeckResponse = {
        success: true,
        deck: mockCards,
        count: 2,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      const result = await apiService.getDeck();

      expect(mockFetch).toHaveBeenCalledWith("/api/deck", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle HTTP error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      } as Response);

      await expect(apiService.getDeck()).rejects.toEqual({
        message: "HTTP error! status: 404",
        status: 404,
      });
    });

    it("should handle API error response", async () => {
      const errorResponse = {
        success: false,
        error: "Internal server error",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => errorResponse,
      } as Response);

      await expect(apiService.getDeck()).rejects.toEqual({
        message: "Internal server error",
        status: 200,
      });
    });

    it("should handle network error", async () => {
      mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

      await expect(apiService.getDeck()).rejects.toEqual({
        message: "Network error - Unable to connect to server",
        status: 0,
      });
    });

    it("should handle generic error", async () => {
      const genericError = new Error("Something went wrong");
      mockFetch.mockRejectedValueOnce(genericError);

      await expect(apiService.getDeck()).rejects.toEqual(genericError);
    });
  });

  describe("shuffleDeck", () => {
    it("should shuffle deck successfully", async () => {
      const mockResponse: ShuffleResponse = {
        success: true,
        deck: [...mockCards].reverse(),
        action: CardAction.SHUFFLED,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      const result = await apiService.shuffleDeck();

      expect(mockFetch).toHaveBeenCalledWith("/api/shuffle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle shuffle error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response);

      await expect(apiService.shuffleDeck()).rejects.toEqual({
        message: "HTTP error! status: 500",
        status: 500,
      });
    });
  });

  describe("sortDeck", () => {
    it("should sort deck successfully", async () => {
      const mockResponse: SortResponse = {
        success: true,
        deck: mockCards,
        action: CardAction.SORTED,
        method: "bubble",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      const result = await apiService.sortDeck();

      expect(mockFetch).toHaveBeenCalledWith("/api/sort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle sort error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({}),
      } as Response);

      await expect(apiService.sortDeck()).rejects.toEqual({
        message: "HTTP error! status: 400",
        status: 400,
      });
    });
  });

  describe("resetDeck", () => {
    it("should reset deck successfully", async () => {
      const mockResponse: ResetResponse = {
        success: true,
        deck: mockCards,
        action: CardAction.RESET,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      const result = await apiService.resetDeck();

      expect(mockFetch).toHaveBeenCalledWith("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle reset error", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({}),
      } as Response);

      await expect(apiService.resetDeck()).rejects.toEqual({
        message: "HTTP error! status: 503",
        status: 503,
      });
    });
  });

  describe("request method", () => {
    it("should handle API error without error message", async () => {
      const errorResponse = {
        success: false,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => errorResponse,
      } as Response);

      await expect(apiService.request("/test")).rejects.toEqual({
        message: "API request failed",
        status: 200,
      });
    });

    it("should log response status", async () => {
      const mockResponse = { success: true, data: "test" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      await apiService.request("/test");

      expect(console.log).toHaveBeenCalledWith("Response status: 200");
    });

    it("should log API and request errors", async () => {
      const genericError = new Error("Something went wrong");
      mockFetch.mockRejectedValueOnce(genericError);

      await expect(apiService.request("/test")).rejects.toEqual(genericError);
      expect(console.error).toHaveBeenCalledWith(
        "API request failed:",
        genericError
      );
    });

    it("should handle different HTTP methods", async () => {
      const mockResponse = { success: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      await apiService.request("/test", { method: "PUT" });

      expect(mockFetch).toHaveBeenCalledWith("/api/test", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should handle request with body", async () => {
      const mockResponse = { success: true };
      const requestBody = { data: "test" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      } as Response);

      await apiService.request("/test", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      expect(mockFetch).toHaveBeenCalledWith("/api/test", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("environment configuration", () => {
    it("should use environment variable for API URL", () => {
      const originalEnv = process.env.REACT_APP_API_URL;

      jest.resetModules();

      process.env.REACT_APP_API_URL = "https://custom-api.com/api";

      const { apiService: customApiService } = require("./api");

      expect(customApiService.baseUrl).toBe("https://custom-api.com/api");

      process.env.REACT_APP_API_URL = originalEnv;
    });

    it("should use default API URL when environment variable is not set", () => {
      const originalEnv = process.env.REACT_APP_API_URL;

      jest.resetModules();
      delete process.env.REACT_APP_API_URL;

      const { apiService: defaultApiService } = require("./api");

      expect(defaultApiService.baseUrl).toBe("/api");

      process.env.REACT_APP_API_URL = originalEnv;
    });
  });
});
