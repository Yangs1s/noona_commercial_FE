import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import type { RootState } from "@/features/store";

export const ToastMessage = () => {
  const { toastMessage } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;
      if (message !== "" && status !== "") {
        toast[status](message, { theme: "colored" });
      }
    }
  }, [toastMessage]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
