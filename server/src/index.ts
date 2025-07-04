import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import {
  createDeck,
  shuffleDeck,
  sortDeck,
  getRandomSortMethod,
} from "./utils/card";
import {
  Card,
  SortMethod,
  CardAction,
  DeckResponse,
  ShuffleResponse,
  SortResponse,
  ResetResponse,
} from "./types";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let currentDeck: Card[] = createDeck();

app.get("/api/deck", (req: Request, res: Response<DeckResponse>) => {
  try {
    res.json({
      success: true,
      deck: currentDeck,
      count: currentDeck.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      deck: [],
      count: 0,
      error: "Failed to retrieve deck",
    });
  }
});

app.post("/api/shuffle", (req: Request, res: Response<ShuffleResponse>) => {
  try {
    currentDeck = shuffleDeck([...currentDeck]);
    res.json({
      success: true,
      deck: currentDeck,
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
});

app.post("/api/sort", (req: Request, res: Response<SortResponse>) => {
  try {
    const sortMethod = getRandomSortMethod();
    currentDeck = sortDeck([...currentDeck], sortMethod);
    res.json({
      success: true,
      deck: currentDeck,
      action: CardAction.SORTED,
      method: sortMethod,
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
});

app.post("/api/reset", (req: Request, res: Response<ResetResponse>) => {
  try {
    currentDeck = createDeck();
    res.json({
      success: true,
      deck: currentDeck,
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
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
