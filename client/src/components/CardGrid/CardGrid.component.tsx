import React, { memo } from "react";
import { Card } from "../Card";
import { LoadingSpinner } from "../LoadingSpinner";
import "./CardGrid.module.scss";
import { Card as CardType } from "../../types";

interface CardGridProps {
  cards: CardType[];
  isLoading: boolean;
}

export const CardGrid = memo(({ cards, isLoading }: CardGridProps) => {
  if (isLoading) {
    return (
      <div className="card-grid-loading">
        <LoadingSpinner />
        <p>Processing deck...</p>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="card-grid-empty">
        <p>No cards to display</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      <div className="card-grid-container">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} />
        ))}
      </div>
    </div>
  );
});
