import { renderHook, act } from "@testing-library/react";
import { useDeck } from "./useDeck";
import { apiService } from "../services";
import { CardAction, Card, Suit, Rank } from "../types";
import {
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
} from "../types/api";

jest.mock("../services", () => ({
  apiService: {
    getDeck: jest.fn(),
    shuffleDeck: jest.fn(),
    sortDeck: jest.fn(),
    resetDeck: jest.fn(),
  },
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe("useDeck", () => {
  const mockShowNotification = jest.fn();
  const mockCards: Card[] = [
    { id: "1", suit: "Hearts" as Suit, rank: "A" as Rank, display: "A♥" },
    { id: "2", suit: "Spades" as Suit, rank: "K" as Rank, display: "K♠" },
  ];
  const mockDeckResponse: DeckResponse = {
    success: true,
    deck: mockCards,
    count: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty deck and default state", () => {
    const { result } = renderHook(() => useDeck(mockShowNotification));

    expect(result.current.deck).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.lastAction).toBeNull();
    expect(result.current.sortMethod).toBeNull();
  });

  describe("fetchDeck", () => {
    it("should fetch deck successfully", async () => {
      mockApiService.getDeck.mockResolvedValue(mockDeckResponse);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.fetchDeck();
      });

      expect(mockApiService.getDeck).toHaveBeenCalledTimes(1);
      expect(result.current.deck).toEqual(mockDeckResponse.deck);
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle fetch deck error", async () => {
      const errorMessage = "Network error";
      mockApiService.getDeck.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.fetchDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(errorMessage, "error");
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle fetch deck error with API error object", async () => {
      const apiError = { message: "API Error", status: 500 };
      mockApiService.getDeck.mockRejectedValue(apiError);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.fetchDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith("API Error", "error");
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle fetch deck error without message", async () => {
      mockApiService.getDeck.mockRejectedValue({});

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.fetchDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(
        "Failed to fetch deck",
        "error"
      );
      expect(result.current.isLoading).toBe(false);
    });

    it("should set loading state during fetch", async () => {
      let resolvePromise: (value: DeckResponse) => void;
      const promise = new Promise<DeckResponse>((resolve) => {
        resolvePromise = resolve;
      });
      mockApiService.getDeck.mockReturnValue(promise);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      act(() => {
        result.current.fetchDeck();
      });

      expect(result.current.isLoading).toBe(true);

      await act(async () => {
        resolvePromise(mockDeckResponse);
        await promise;
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("shuffleDeck", () => {
    it("should shuffle deck successfully", async () => {
      const shuffleResponse: ShuffleResponse = {
        success: true,
        deck: [
          { id: "2", suit: "Spades" as Suit, rank: "K" as Rank, display: "K♠" },
          { id: "1", suit: "Hearts" as Suit, rank: "A" as Rank, display: "A♥" },
        ],
        action: CardAction.SHUFFLED,
      };
      mockApiService.shuffleDeck.mockResolvedValue(shuffleResponse);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.shuffleDeck();
      });

      expect(mockApiService.shuffleDeck).toHaveBeenCalledTimes(1);
      expect(result.current.deck).toEqual(shuffleResponse.deck);
      expect(result.current.lastAction).toBe(CardAction.SHUFFLED);
      expect(result.current.sortMethod).toBeNull();
      expect(mockShowNotification).toHaveBeenCalledWith(
        "Deck shuffled successfully!",
        "success"
      );
    });

    it("should handle shuffle deck error", async () => {
      const errorMessage = "Shuffle failed";
      mockApiService.shuffleDeck.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.shuffleDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(errorMessage, "error");
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle shuffle deck error without message", async () => {
      mockApiService.shuffleDeck.mockRejectedValue({});

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.shuffleDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(
        "Failed to shuffle deck",
        "error"
      );
    });
  });

  describe("sortDeck", () => {
    it("should sort deck successfully", async () => {
      const sortResponse: SortResponse = {
        success: true,
        deck: [
          { id: "1", suit: "Hearts" as Suit, rank: "A" as Rank, display: "A♥" },
          { id: "2", suit: "Spades" as Suit, rank: "K" as Rank, display: "K♠" },
        ],
        action: CardAction.SORTED,
        method: "bubble",
      };
      mockApiService.sortDeck.mockResolvedValue(sortResponse);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.sortDeck();
      });

      expect(mockApiService.sortDeck).toHaveBeenCalledTimes(1);
      expect(result.current.deck).toEqual(sortResponse.deck);
      expect(result.current.lastAction).toBe(CardAction.SORTED);
      expect(result.current.sortMethod).toBe("bubble");
      expect(mockShowNotification).toHaveBeenCalledWith(
        "Deck sorted using bubble method!",
        "success"
      );
    });

    it("should handle sort deck error", async () => {
      const errorMessage = "Sort failed";
      mockApiService.sortDeck.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.sortDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(errorMessage, "error");
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle sort deck error without message", async () => {
      mockApiService.sortDeck.mockRejectedValue({});

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.sortDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(
        "Failed to sort deck",
        "error"
      );
    });
  });

  describe("resetDeck", () => {
    it("should reset deck successfully", async () => {
      const resetResponse: ResetResponse = {
        success: true,
        deck: [
          { id: "1", suit: "Hearts" as Suit, rank: "A" as Rank, display: "A♥" },
          { id: "2", suit: "Spades" as Suit, rank: "K" as Rank, display: "K♠" },
        ],
        action: CardAction.RESET,
      };
      mockApiService.resetDeck.mockResolvedValue(resetResponse);

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.resetDeck();
      });

      expect(mockApiService.resetDeck).toHaveBeenCalledTimes(1);
      expect(result.current.deck).toEqual(resetResponse.deck);
      expect(result.current.lastAction).toBe(CardAction.RESET);
      expect(result.current.sortMethod).toBeNull();
      expect(mockShowNotification).toHaveBeenCalledWith(
        "Deck reset to original order!",
        "success"
      );
    });

    it("should handle reset deck error", async () => {
      const errorMessage = "Reset failed";
      mockApiService.resetDeck.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.resetDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(errorMessage, "error");
      expect(result.current.isLoading).toBe(false);
    });

    it("should handle reset deck error without message", async () => {
      mockApiService.resetDeck.mockRejectedValue({});

      const { result } = renderHook(() => useDeck(mockShowNotification));

      await act(async () => {
        await result.current.resetDeck();
      });

      expect(mockShowNotification).toHaveBeenCalledWith(
        "Failed to reset deck",
        "error"
      );
    });
  });

  it("should maintain callback stability", () => {
    const { result, rerender } = renderHook(() =>
      useDeck(mockShowNotification)
    );

    const initialFetchDeck = result.current.fetchDeck;
    const initialShuffleDeck = result.current.shuffleDeck;
    const initialSortDeck = result.current.sortDeck;
    const initialResetDeck = result.current.resetDeck;

    rerender();

    expect(result.current.fetchDeck).toBe(initialFetchDeck);
    expect(result.current.shuffleDeck).toBe(initialShuffleDeck);
    expect(result.current.sortDeck).toBe(initialSortDeck);
    expect(result.current.resetDeck).toBe(initialResetDeck);
  });

  it("should handle loading states correctly across operations", async () => {
    let resolvePromise: (value: ShuffleResponse) => void;
    const promise = new Promise<ShuffleResponse>((resolve) => {
      resolvePromise = resolve;
    });
    mockApiService.shuffleDeck.mockReturnValue(promise);

    const { result } = renderHook(() => useDeck(mockShowNotification));

    act(() => {
      result.current.shuffleDeck();
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolvePromise({
        success: true,
        deck: mockDeckResponse.deck,
        action: CardAction.SHUFFLED,
      });
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
