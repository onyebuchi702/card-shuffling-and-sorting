import React, { memo, useEffect } from "react";
import styles from "./Notification.module.scss";

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
      <div
        className={`${styles.notification} ${
          styles[
            `notification${type?.charAt(0).toUpperCase() + type?.slice(1)}`
          ]
        }`}
      >
        <div className={styles.notificationContent}>
          <span className={styles.notificationIcon}>
            {getNotificationIcon(type)}
          </span>
          <span className={styles.notificationMessage}>{message}</span>
        </div>
        <button
          className={styles.notificationClose}
          onClick={handleClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    );
  }
);
