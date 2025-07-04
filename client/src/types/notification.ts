export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationData {
  message: string;
  type: NotificationType;
}
