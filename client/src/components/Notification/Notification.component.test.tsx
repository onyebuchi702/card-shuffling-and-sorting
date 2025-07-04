import { render, screen, fireEvent } from "@testing-library/react";
import { Notification } from "./Notification.component";

describe("Notification", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders notification with message", () => {
    render(<Notification message="Test message" onClose={mockOnClose} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders info notification by default", () => {
    render(<Notification message="Info message" onClose={mockOnClose} />);
    expect(screen.getByText("ℹ️")).toBeInTheDocument();
  });

  it("renders success notification", () => {
    render(
      <Notification
        message="Success message"
        type="success"
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("✅")).toBeInTheDocument();
  });

  it("renders error notification", () => {
    render(
      <Notification
        message="Error message"
        type="error"
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("❌")).toBeInTheDocument();
  });

  it("renders warning notification", () => {
    render(
      <Notification
        message="Warning message"
        type="warning"
        onClose={mockOnClose}
      />
    );
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(<Notification message="Test message" onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button", {
      name: "Close notification",
    });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("auto-closes after 4 seconds by default", () => {
    render(<Notification message="Test message" onClose={mockOnClose} />);
    expect(mockOnClose).not.toHaveBeenCalled();
    jest.advanceTimersByTime(4000);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not auto-close when autoClose is false", () => {
    render(
      <Notification
        message="Test message"
        onClose={mockOnClose}
        autoClose={false}
      />
    );
    jest.advanceTimersByTime(5000);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("has correct CSS classes for different types", () => {
    const { container, rerender } = render(
      <Notification message="Test" type="info" onClose={mockOnClose} />
    );
    expect(container.querySelector(".notificationInfo")).toBeInTheDocument();

    rerender(
      <Notification message="Test" type="success" onClose={mockOnClose} />
    );
    expect(container.querySelector(".notificationSuccess")).toBeInTheDocument();

    rerender(
      <Notification message="Test" type="error" onClose={mockOnClose} />
    );
    expect(container.querySelector(".notificationError")).toBeInTheDocument();

    rerender(
      <Notification message="Test" type="warning" onClose={mockOnClose} />
    );
    expect(container.querySelector(".notificationWarning")).toBeInTheDocument();
  });

  it("has correct structure", () => {
    const { container } = render(
      <Notification message="Test message" onClose={mockOnClose} />
    );
    expect(container.querySelector(".notification")).toBeInTheDocument();
    expect(container.querySelector(".notificationContent")).toBeInTheDocument();
    expect(container.querySelector(".notificationIcon")).toBeInTheDocument();
    expect(container.querySelector(".notificationMessage")).toBeInTheDocument();
    expect(container.querySelector(".notificationClose")).toBeInTheDocument();
  });

  it("close button has correct accessibility attributes", () => {
    render(<Notification message="Test message" onClose={mockOnClose} />);
    const closeButton = screen.getByRole("button", {
      name: "Close notification",
    });
    expect(closeButton).toHaveAttribute("aria-label", "Close notification");
  });

  it("cleans up timer on unmount", () => {
    const { unmount } = render(
      <Notification message="Test message" onClose={mockOnClose} />
    );
    unmount();
    jest.advanceTimersByTime(4000);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
