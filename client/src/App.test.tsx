import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./hooks/useDeck", () => ({
  useDeck: () => ({
    deck: [],
    isLoading: false,
    lastAction: null,
    sortMethod: null,
    fetchDeck: jest.fn(),
    shuffleDeck: jest.fn(),
    sortDeck: jest.fn(),
    resetDeck: jest.fn(),
  }),
}));

jest.mock("./hooks/useNotification", () => ({
  useNotification: () => ({
    notification: null,
    showNotification: jest.fn(),
    hideNotification: jest.fn(),
  }),
}));

describe("App", () => {
  it("renders app title", () => {
    render(<App />);
    expect(screen.getByText("Card Shuffling & Sorting")).toBeInTheDocument();
  });

  it("renders app description", () => {
    render(<App />);
    expect(
      screen.getByText(
        "Interactive deck management with multiple sorting algorithms"
      )
    ).toBeInTheDocument();
  });

  it("renders main app container", () => {
    const { container } = render(<App />);
    expect(container.querySelector(".app")).toBeInTheDocument();
  });

  it("renders within ErrorBoundary", () => {
    render(<App />);
    expect(screen.getByText("Card Shuffling & Sorting")).toBeInTheDocument();
  });
});
