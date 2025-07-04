import { useState, useCallback } from "react";
import { apiService } from "../services";
import { CardAction, Card, NotificationType } from "../types";

interface UseDeckReturn {
  deck: Card[];
  isLoading: boolean;
  lastAction: CardAction | null;
  sortMethod: string | null;
  fetchDeck: () => Promise<void>;
  shuffleDeck: () => Promise<void>;
  sortDeck: () => Promise<void>;
  resetDeck: () => Promise<void>;
}

export const useDeck = (
  showNotification: (message: string, type?: NotificationType) => void
): UseDeckReturn => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState<CardAction | null>(null);
  const [sortMethod, setSortMethod] = useState<string | null>(null);

  const fetchDeck = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getDeck();
      setDeck(response.deck);
      console.log(`Successfully fetched ${response.deck.length} cards`);
    } catch (error: any) {
      console.error("Error details:", {
        message: error?.message,
        status: error?.status,
        stack: error?.stack,
      });
      const errorMessage = error?.message || "Failed to fetch deck";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const shuffleDeck = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiService.shuffleDeck();
      setDeck(response.deck);
      setLastAction(CardAction.SHUFFLED);
      setSortMethod(null);
      showNotification("Deck shuffled successfully!", "success");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to shuffle deck";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const sortDeck = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiService.sortDeck();
      setDeck(response.deck);
      setLastAction(CardAction.SORTED);
      setSortMethod(response.method);
      showNotification(
        `Deck sorted using ${response.method} method!`,
        "success"
      );
    } catch (error: any) {
      console.error("Failed to sort deck:", error);
      const errorMessage = error?.message || "Failed to sort deck";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const resetDeck = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiService.resetDeck();
      setDeck(response.deck);
      setLastAction(CardAction.RESET);
      setSortMethod(null);
      showNotification("Deck reset to original order!", "success");
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to reset deck";
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  return {
    deck,
    isLoading,
    lastAction,
    sortMethod,
    fetchDeck,
    shuffleDeck,
    sortDeck,
    resetDeck,
  };
};
