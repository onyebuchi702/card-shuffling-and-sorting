import { Router } from "express";
import {
  getDeck,
  shuffleCards,
  sortCards,
  resetDeck,
} from "../controllers/deckController";

const router = Router();

router.get("/deck", getDeck);
router.post("/shuffle", shuffleCards);
router.post("/sort", sortCards);
router.post("/reset", resetDeck);

export default router;
