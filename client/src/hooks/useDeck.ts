import { useState, useCallback } from "react";
import { apiService } from "../services";
import { CardAction, Card } from "../types";

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
  showNotification: (message: string, type?: any) => void
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
    } catch (error) {
      showNotification("Failed to fetch deck", "error");
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
    } catch (error) {
      showNotification("Failed to shuffle deck", "error");
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
    } catch (error) {
      showNotification("Failed to sort deck", "error");
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
    } catch (error) {
      showNotification("Failed to reset deck", "error");
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
