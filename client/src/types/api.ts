import { Card, SortMethod } from "../../../types/card";
import { CardAction } from "../../../enums/card";

export interface DeckResponse {
  success: boolean;
  deck: Card[];
  count: number;
  error?: string;
}

export interface ShuffleResponse {
  success: boolean;
  deck: Card[];
  action: CardAction.SHUFFLED;
  error?: string;
}

export interface SortResponse {
  success: boolean;
  deck: Card[];
  action: CardAction.SORTED;
  method: SortMethod;
  error?: string;
}

export interface ResetResponse {
  success: boolean;
  deck: Card[];
  action: CardAction.RESET;
  error?: string;
}

export interface ApiService {
  getDeck: () => Promise<DeckResponse>;
  shuffleDeck: () => Promise<ShuffleResponse>;
  sortDeck: () => Promise<SortResponse>;
  resetDeck: () => Promise<ResetResponse>;
}

export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}
