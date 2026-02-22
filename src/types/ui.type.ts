export type ToastStatus = "success" | "error" | "warning" | "";

export interface ToastMessage {
  message: string;
  status: ToastStatus;
}
