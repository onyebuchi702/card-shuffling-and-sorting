import { CardAction, Suit, Rank, SortMethod, Card } from "./card";

export { Card, Suit, Rank, SortMethod, CardAction };

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
