import { Card, Suit, Rank, SortMethod } from "../../../types/card";
import { CardAction } from "../../../enums/card";

export * from "./api";

export type { Card, Suit, Rank, SortMethod };
export { CardAction };

export interface GameState {
  deck: Card[];
  isLoading: boolean;
  error: string | null;
  lastAction: string | null;
  sortMethod: string | null;
}

export interface CardComponentProps {
  card: Card;
  index: number;
}

export interface DeckDisplayProps {
  deck: Card[];
  isLoading: boolean;
}
