import React, { memo } from "react";
import { Card } from "../Card";
import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./CardGrid.module.scss";
import { Card as CardType } from "../../types";

interface CardGridProps {
  cards: CardType[];
  isLoading: boolean;
}

export const CardGrid = memo(({ cards, isLoading }: CardGridProps) => {
  if (isLoading) {
    return (
      <div className={styles.cardGridLoading}>
        <LoadingSpinner />
        <p>Processing deck...</p>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className={styles.cardGridEmpty}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🃏</span>
          <h3>No cards to display</h3>
          <p>
            The deck appears to be empty. Try refreshing or check your
            connection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cardGrid}>
      <div className={styles.cardGridContainer}>
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
});
