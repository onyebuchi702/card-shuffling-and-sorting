import { useState, useCallback } from "react";
import { NotificationData, NotificationType } from "../types";

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
