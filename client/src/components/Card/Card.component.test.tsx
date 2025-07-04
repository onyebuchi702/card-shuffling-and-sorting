import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card.component";
import { Card as CardType } from "../../types";

const mockCard: CardType = {
  id: "1",
  suit: "Hearts",
  rank: "A",
  display: "A♥",
};

describe("Card", () => {
  it("renders card with correct rank and suit", () => {
    render(<Card card={mockCard} index={0} />);
    expect(screen.getAllByText("A")).toHaveLength(2);
    expect(screen.getAllByText("♥")).toHaveLength(2);
  });

  it("applies red color class for Hearts", () => {
    render(<Card card={mockCard} index={0} />);
    const cardElement = screen.getByTitle("A♥");
    expect(cardElement).toHaveClass("cardRed");
  });

  it("applies black color class for Spades", () => {
    const spadeCard: CardType = {
      id: "2",
      suit: "Spades",
      rank: "K",
      display: "K♠",
    };
    render(<Card card={spadeCard} index={0} />);
    const cardElement = screen.getByTitle("K♠");
    expect(cardElement).toHaveClass("cardBlack");
  });

  it("applies black color class for Clubs", () => {
    const clubCard: CardType = {
      id: "3",
      suit: "Clubs",
      rank: "Q",
      display: "Q♣",
    };
    render(<Card card={clubCard} index={0} />);
    const cardElement = screen.getByTitle("Q♣");
    expect(cardElement).toHaveClass("cardBlack");
  });

  it("applies red color class for Diamonds", () => {
    const diamondCard: CardType = {
      id: "4",
      suit: "Diamonds",
      rank: "J",
      display: "J♦",
    };
    render(<Card card={diamondCard} index={0} />);
    const cardElement = screen.getByTitle("J♦");
    expect(cardElement).toHaveClass("cardRed");
  });

  it("displays numeric ranks correctly", () => {
    const numericCard: CardType = {
      id: "5",
      suit: "Hearts",
      rank: "10",
      display: "10♥",
    };
    render(<Card card={numericCard} index={0} />);
    expect(screen.getAllByText("10")).toHaveLength(2);
  });

  it("applies animation delay based on index", () => {
    render(<Card card={mockCard} index={5} />);
    const cardElement = screen.getByTitle("A♥");
    expect(cardElement).toHaveStyle("animation-delay: 0.1s");
  });

  it("has correct title attribute", () => {
    render(<Card card={mockCard} index={0} />);
    expect(screen.getByTitle("A♥")).toBeInTheDocument();
  });

  it("renders all required card elements", () => {
    const { container } = render(<Card card={mockCard} index={0} />);
    expect(container.querySelector(".cardContent")).toBeInTheDocument();
    expect(container.querySelector(".cardRank")).toBeInTheDocument();
    expect(container.querySelector(".cardSuit")).toBeInTheDocument();
    expect(container.querySelector(".cardFooter")).toBeInTheDocument();
    expect(container.querySelector(".cardSuitSmall")).toBeInTheDocument();
    expect(container.querySelector(".cardRankSmall")).toBeInTheDocument();
  });
});
