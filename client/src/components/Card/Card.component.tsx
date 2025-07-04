import React, { memo } from "react";
import styles from "./Card.module.scss";
import { getSuitSymbol, getSuitColor, getRankDisplay } from "./Card.utils";
import { Card as CardType } from "../../types";

interface CardProps {
  card: CardType;
  index: number;
}

export const Card = memo(({ card, index }: CardProps) => {
  const suitSymbol = getSuitSymbol(card.suit);
  const suitColor = getSuitColor(card.suit);
  const rankDisplay = getRankDisplay(card.rank);

  return (
    <div
      className={`${styles.card} ${
        suitColor === "red" ? styles.cardRed : styles.cardBlack
      }`}
      style={{
        animationDelay: `${index * 0.02}s`,
      }}
      title={card.display}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardRank}>{rankDisplay}</div>
        <div className={styles.cardSuit}>{suitSymbol}</div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardSuitSmall}>{suitSymbol}</div>
        <div className={styles.cardRankSmall}>{rankDisplay}</div>
      </div>
    </div>
  );
});
