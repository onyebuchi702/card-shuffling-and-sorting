import { Request, Response } from "express";
import { deckService } from "../services/deckService";
import {
  CardAction,
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
} from "../types";

export const getDeck = (req: Request, res: Response<DeckResponse>) => {
  try {
    const deck = deckService.getDeck();
    res.json({
      success: true,
      deck,
      count: deckService.getCount(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      deck: [],
      count: 0,
      error: "Failed to retrieve deck",
    });
  }
};

export const shuffleCards = (req: Request, res: Response<ShuffleResponse>) => {
  try {
    const deck = deckService.shuffle();
    res.json({
      success: true,
      deck,
      action: CardAction.SHUFFLED,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      deck: [],
      action: CardAction.SHUFFLED,
      error: "Failed to shuffle deck",
    });
  }
};

export const sortCards = (req: Request, res: Response<SortResponse>) => {
  try {
    const { deck, method } = deckService.sort();
    res.json({
      success: true,
      deck,
      action: CardAction.SORTED,
      method,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      deck: [],
      action: CardAction.SORTED,
      method: "rank_then_suit",
      error: "Failed to sort deck",
    });
  }
};

export const resetDeck = (req: Request, res: Response<ResetResponse>) => {
  try {
    const deck = deckService.reset();
    res.json({
      success: true,
      deck,
      action: CardAction.RESET,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      deck: [],
      action: CardAction.RESET,
      error: "Failed to reset deck",
    });
  }
};
