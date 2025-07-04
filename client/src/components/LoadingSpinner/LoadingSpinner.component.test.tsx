import { render } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner.component";

describe("LoadingSpinner", () => {
  it("renders loading spinner", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector(".loadingSpinner")).toBeInTheDocument();
    expect(container.querySelector(".spinnerRing")).toBeInTheDocument();
  });

  it("renders with medium size by default", () => {
    const { container } = render(<LoadingSpinner />);
    expect(
      container.querySelector(".loadingSpinnerMedium")
    ).toBeInTheDocument();
  });

  it("renders with small size", () => {
    const { container } = render(<LoadingSpinner size="small" />);
    expect(container.querySelector(".loadingSpinnerSmall")).toBeInTheDocument();
  });

  it("renders with large size", () => {
    const { container } = render(<LoadingSpinner size="large" />);
    expect(container.querySelector(".loadingSpinnerLarge")).toBeInTheDocument();
  });

  it("has correct number of spinner elements", () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerElements = container.querySelectorAll(".spinnerRing > div");
    expect(spinnerElements).toHaveLength(4);
  });

  it("applies both base and size classes", () => {
    const { container } = render(<LoadingSpinner size="small" />);
    const spinner = container.querySelector(".loadingSpinner");
    expect(spinner).toHaveClass("loadingSpinner", "loadingSpinnerSmall");
  });

  it("maintains consistent structure across sizes", () => {
    const sizes = ["small", "medium", "large"] as const;
    sizes.forEach((size) => {
      const { container } = render(<LoadingSpinner size={size} />);
      expect(container.querySelector(".loadingSpinner")).toBeInTheDocument();
      expect(container.querySelector(".spinnerRing")).toBeInTheDocument();
      expect(container.querySelectorAll(".spinnerRing > div")).toHaveLength(4);
    });
  });
});
