import React from "react";
import { render, screen } from "@testing-library/react";
import { CardGrid } from "./CardGrid.component";
import { Card as CardType } from "../../types";

const mockCards: CardType[] = [
  {
    id: "1",
    suit: "Hearts",
    rank: "A",
    display: "A♥",
  },
  {
    id: "2",
    suit: "Spades",
    rank: "K",
    display: "K♠",
  },
  {
    id: "3",
    suit: "Diamonds",
    rank: "Q",
    display: "Q♦",
  },
];

describe("CardGrid", () => {
  it("renders loading state", () => {
    render(<CardGrid cards={[]} isLoading={true} />);
    expect(screen.getByText("Processing deck...")).toBeInTheDocument();
  });

  it("renders empty state when no cards", () => {
    render(<CardGrid cards={[]} isLoading={false} />);
    expect(screen.getByText("No cards to display")).toBeInTheDocument();
    expect(screen.getByText("🃏")).toBeInTheDocument();
    expect(
      screen.getByText(/The deck appears to be empty/)
    ).toBeInTheDocument();
  });

  it("renders empty state when cards array is null", () => {
    render(<CardGrid cards={null as any} isLoading={false} />);
    expect(screen.getByText("No cards to display")).toBeInTheDocument();
  });

  it("renders cards when provided", () => {
    render(<CardGrid cards={mockCards} isLoading={false} />);
    expect(screen.getByTitle("A♥")).toBeInTheDocument();
    expect(screen.getByTitle("K♠")).toBeInTheDocument();
    expect(screen.getByTitle("Q♦")).toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    render(<CardGrid cards={mockCards} isLoading={false} />);
    const cards = screen.getAllByTitle(/^[A-KQ0-9]+[♠♥♦♣]$/);
    expect(cards).toHaveLength(3);
  });

  it("does not render loading state when not loading", () => {
    render(<CardGrid cards={mockCards} isLoading={false} />);
    expect(screen.queryByText("Processing deck...")).not.toBeInTheDocument();
  });

  it("does not render empty state when cards exist", () => {
    render(<CardGrid cards={mockCards} isLoading={false} />);
    expect(screen.queryByText("No cards to display")).not.toBeInTheDocument();
  });

  it("renders single card correctly", () => {
    const singleCard = [mockCards[0]];
    render(<CardGrid cards={singleCard} isLoading={false} />);
    expect(screen.getByTitle("A♥")).toBeInTheDocument();
    expect(screen.queryByTitle("K♠")).not.toBeInTheDocument();
  });

  it("has correct CSS classes", () => {
    const { container } = render(
      <CardGrid cards={mockCards} isLoading={false} />
    );
    expect(container.querySelector(".cardGrid")).toBeInTheDocument();
    expect(container.querySelector(".cardGridContainer")).toBeInTheDocument();
  });

  it("loading state has correct CSS classes", () => {
    const { container } = render(<CardGrid cards={[]} isLoading={true} />);
    expect(container.querySelector(".cardGridLoading")).toBeInTheDocument();
  });

  it("empty state has correct CSS classes", () => {
    const { container } = render(<CardGrid cards={[]} isLoading={false} />);
    expect(container.querySelector(".cardGridEmpty")).toBeInTheDocument();
    expect(container.querySelector(".emptyState")).toBeInTheDocument();
    expect(container.querySelector(".emptyIcon")).toBeInTheDocument();
  });
});
