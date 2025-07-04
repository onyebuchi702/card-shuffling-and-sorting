import { render, screen, fireEvent } from "@testing-library/react";
import { StatusBar } from "./StatusBar.component";

describe("StatusBar", () => {
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders card count", () => {
    render(<StatusBar cardCount={52} />);
    expect(screen.getByText("Cards:")).toBeInTheDocument();
    expect(screen.getByText("52")).toBeInTheDocument();
  });

  it("renders zero card count", () => {
    render(<StatusBar cardCount={0} />);
    expect(screen.getByText("Cards:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders last action when provided", () => {
    render(<StatusBar cardCount={52} lastAction="shuffled" />);
    expect(screen.getByText("Last Action:")).toBeInTheDocument();
    expect(screen.getByText("shuffled")).toBeInTheDocument();
  });

  it("does not render last action when not provided", () => {
    render(<StatusBar cardCount={52} />);
    expect(screen.queryByText("Last Action:")).not.toBeInTheDocument();
  });

  it("renders sort method when provided", () => {
    render(<StatusBar cardCount={52} sortMethod="rank_then_suit" />);
    expect(screen.getByText("Sort Method:")).toBeInTheDocument();
    expect(screen.getByText("Rank → Suit")).toBeInTheDocument();
  });

  it("does not render sort method when not provided", () => {
    render(<StatusBar cardCount={52} />);
    expect(screen.queryByText("Sort Method:")).not.toBeInTheDocument();
  });

  it("renders refresh button when card count is 0 and onRefresh is provided", () => {
    render(<StatusBar cardCount={0} onRefresh={mockOnRefresh} />);
    const refreshButton = screen.getByRole("button", { name: "🔄" });
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveAttribute("title", "Refresh deck");
  });

  it("does not render refresh button when card count is not 0", () => {
    render(<StatusBar cardCount={52} onRefresh={mockOnRefresh} />);
    expect(
      screen.queryByRole("button", { name: "Refresh deck" })
    ).not.toBeInTheDocument();
  });

  it("does not render refresh button when onRefresh is not provided", () => {
    render(<StatusBar cardCount={0} />);
    expect(
      screen.queryByRole("button", { name: "Refresh deck" })
    ).not.toBeInTheDocument();
  });

  it("calls onRefresh when refresh button is clicked", () => {
    render(<StatusBar cardCount={0} onRefresh={mockOnRefresh} />);
    const refreshButton = screen.getByRole("button", { name: "🔄" });
    fireEvent.click(refreshButton);
    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it("renders all status items when all props are provided", () => {
    render(
      <StatusBar
        cardCount={52}
        lastAction="sorted"
        sortMethod="suit_then_rank"
        onRefresh={mockOnRefresh}
      />
    );

    expect(screen.getByText("Cards:")).toBeInTheDocument();
    expect(screen.getByText("52")).toBeInTheDocument();
    expect(screen.getByText("Last Action:")).toBeInTheDocument();
    expect(screen.getByText("sorted")).toBeInTheDocument();
    expect(screen.getByText("Sort Method:")).toBeInTheDocument();
    expect(screen.getByText("Suit → Rank")).toBeInTheDocument();
  });

  it("has correct CSS structure", () => {
    const { container } = render(
      <StatusBar
        cardCount={52}
        lastAction="shuffled"
        sortMethod="rank_then_suit"
      />
    );

    expect(container.querySelector(".statusBar")).toBeInTheDocument();
    const statusItems = container.querySelectorAll(".statusItem");
    expect(statusItems.length).toBeGreaterThan(0);
  });

  it("displays action icon for last action", () => {
    render(<StatusBar cardCount={52} lastAction="shuffled" />);
    const statusIcon = screen.getByText("🔀");
    expect(statusIcon).toBeInTheDocument();
  });

  it("formats different sort methods correctly", () => {
    const { rerender } = render(
      <StatusBar cardCount={52} sortMethod="rank_then_suit" />
    );
    expect(screen.getByText("Rank → Suit")).toBeInTheDocument();

    rerender(<StatusBar cardCount={52} sortMethod="suit_then_rank" />);
    expect(screen.getByText("Suit → Rank")).toBeInTheDocument();
  });

  it("handles unknown sort methods gracefully", () => {
    render(<StatusBar cardCount={52} sortMethod="unknown_method" />);
    expect(screen.getByText("unknown_method")).toBeInTheDocument();
  });
});
