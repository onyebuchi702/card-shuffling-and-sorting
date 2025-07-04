import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button.component";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("renders primary variant by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btnPrimary");
  });

  it("renders secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btnSecondary");
  });

  it("renders with icon", () => {
    render(<Button icon="🔀">Shuffle</Button>);
    expect(screen.getByText("🔀")).toBeInTheDocument();
    expect(screen.getByText("Shuffle")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("forwards HTML attributes", () => {
    render(
      <Button data-testid="test-button" title="Test title">
        Button
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-testid", "test-button");
    expect(button).toHaveAttribute("title", "Test title");
  });
});
