import React, { memo, useEffect } from "react";
import "./Notification.module.scss";

interface NotificationProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  onClose: () => void;
  autoClose?: boolean;
}

export const Notification = memo(
  ({
    message,
    type = "info",
    onClose,
    autoClose = true,
  }: NotificationProps) => {
    useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, 4000);

        return () => clearTimeout(timer);
      }
    }, [autoClose, onClose]);

    const handleClose = () => {
      onClose();
    };

    const getNotificationIcon = (type: NotificationProps["type"]) => {
      const icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️",
      };
      return icons[type!] || icons.info;
    };

    return (
      <div className={`notification notification-${type}`}>
        <div className="notification-content">
          <span className="notification-icon">{getNotificationIcon(type)}</span>
          <span className="notification-message">{message}</span>
        </div>
        <button
          className="notification-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    );
  }
);
