import { useState, useCallback } from "react";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationData {
  message: string;
  type: NotificationType;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationData | null>(
    null
  );

  const showNotification = useCallback(
    (message: string, type: NotificationType = "info") => {
      setNotification({ message, type });
    },
    []
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
