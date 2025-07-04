import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Controls } from "./Controls.component";

describe("Controls", () => {
  const mockOnShuffle = jest.fn();
  const mockOnSort = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all control buttons", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    expect(
      screen.getByRole("button", { name: "🔀 Shuffle" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "📊 Sort" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "🔄 Reset" })
    ).toBeInTheDocument();
  });

  it("renders buttons with correct icons", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    expect(screen.getByText("🔀")).toBeInTheDocument();
    expect(screen.getByText("📊")).toBeInTheDocument();
    expect(screen.getByText("🔄")).toBeInTheDocument();
  });

  it("calls onShuffle when shuffle button is clicked", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "🔀 Shuffle" }));
    expect(mockOnShuffle).toHaveBeenCalledTimes(1);
  });

  it("calls onSort when sort button is clicked", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "📊 Sort" }));
    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when reset button is clicked", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "🔄 Reset" }));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("disables all buttons when loading", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={true}
      />
    );

    expect(screen.getByRole("button", { name: "🔀 Shuffle" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "📊 Sort" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "🔄 Reset" })).toBeDisabled();
  });

  it("enables all buttons when not loading", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    expect(screen.getByRole("button", { name: "🔀 Shuffle" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "📊 Sort" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "🔄 Reset" })).toBeEnabled();
  });

  it("does not call handlers when buttons are disabled", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "🔀 Shuffle" }));
    fireEvent.click(screen.getByRole("button", { name: "📊 Sort" }));
    fireEvent.click(screen.getByRole("button", { name: "🔄 Reset" }));

    expect(mockOnShuffle).not.toHaveBeenCalled();
    expect(mockOnSort).not.toHaveBeenCalled();
    expect(mockOnReset).not.toHaveBeenCalled();
  });

  it("has correct button variants", () => {
    render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    const shuffleButton = screen.getByRole("button", { name: "🔀 Shuffle" });
    const sortButton = screen.getByRole("button", { name: "📊 Sort" });
    const resetButton = screen.getByRole("button", { name: "🔄 Reset" });

    expect(shuffleButton).toHaveClass("btnPrimary");
    expect(sortButton).toHaveClass("btnSecondary");
    expect(resetButton).toHaveClass("btnSecondary");
  });

  it("has correct CSS structure", () => {
    const { container } = render(
      <Controls
        onShuffle={mockOnShuffle}
        onSort={mockOnSort}
        onReset={mockOnReset}
        isLoading={false}
      />
    );

    expect(container.querySelector(".controls")).toBeInTheDocument();
    expect(container.querySelector(".controlsGroup")).toBeInTheDocument();
  });
});
