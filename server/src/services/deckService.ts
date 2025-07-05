import {
  createDeck,
  shuffleDeck,
  sortDeck,
  getRandomSortMethod,
} from "../utils/card";
import { Card, SortMethod } from "../types";

class DeckService {
  private currentDeck: Card[];

  constructor() {
    this.currentDeck = createDeck();
  }

  getDeck(): Card[] {
    return [...this.currentDeck];
  }

  shuffle(): Card[] {
    this.currentDeck = shuffleDeck([...this.currentDeck]);
    return [...this.currentDeck];
  }

  sort(): { deck: Card[]; method: SortMethod } {
    const method = getRandomSortMethod();
    this.currentDeck = sortDeck([...this.currentDeck], method);
    return { deck: [...this.currentDeck], method };
  }

  reset(): Card[] {
    this.currentDeck = createDeck();
    return [...this.currentDeck];
  }

  getCount(): number {
    return this.currentDeck.length;
  }
}

export const deckService = new DeckService();
