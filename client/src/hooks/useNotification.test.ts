import { renderHook, act } from "@testing-library/react";
import { useNotification } from "./useNotification";
import { NotificationType } from "../types";

describe("useNotification", () => {
  it("should initialize with no notification", () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current.notification).toBeNull();
  });

  it("should show notification with default type", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("Test message");
    });

    expect(result.current.notification).toEqual({
      message: "Test message",
      type: "info",
    });
  });

  it("should show notification with specified type", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("Success message", "success");
    });

    expect(result.current.notification).toEqual({
      message: "Success message",
      type: "success",
    });
  });

  it("should show notification with error type", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("Error message", "error");
    });

    expect(result.current.notification).toEqual({
      message: "Error message",
      type: "error",
    });
  });

  it("should show notification with warning type", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("Warning message", "warning");
    });

    expect(result.current.notification).toEqual({
      message: "Warning message",
      type: "warning",
    });
  });

  it("should hide notification", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("Test message");
    });

    expect(result.current.notification).not.toBeNull();

    act(() => {
      result.current.hideNotification();
    });

    expect(result.current.notification).toBeNull();
  });

  it("should update notification when showing new one", () => {
    const { result } = renderHook(() => useNotification());

    act(() => {
      result.current.showNotification("First message", "info");
    });

    expect(result.current.notification).toEqual({
      message: "First message",
      type: "info",
    });

    act(() => {
      result.current.showNotification("Second message", "error");
    });

    expect(result.current.notification).toEqual({
      message: "Second message",
      type: "error",
    });
  });

  it("should handle all notification types", () => {
    const { result } = renderHook(() => useNotification());
    const types: NotificationType[] = ["info", "success", "warning", "error"];

    types.forEach((type) => {
      act(() => {
        result.current.showNotification(`${type} message`, type);
      });

      expect(result.current.notification).toEqual({
        message: `${type} message`,
        type: type,
      });
    });
  });

  it("should maintain callback stability", () => {
    const { result, rerender } = renderHook(() => useNotification());

    const initialShowNotification = result.current.showNotification;
    const initialHideNotification = result.current.hideNotification;

    rerender();

    expect(result.current.showNotification).toBe(initialShowNotification);
    expect(result.current.hideNotification).toBe(initialHideNotification);
  });
});
