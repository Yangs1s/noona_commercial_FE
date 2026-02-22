import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import type { RootState } from "@/features/store";
import { hideToastMessage } from "@/features/common/uiSlice";

export const ToastMessage = () => {
  const dispatch = useDispatch();
  const { toastMessage } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (toastMessage) {
      const { message, status } = toastMessage;
      if (message !== "" && status !== "") {
        toast[status](message, { theme: "colored" });
        // 토스트 표시 후 즉시 Redux 스토어 초기화
        dispatch(hideToastMessage());
      }
    }
  }, [toastMessage, dispatch]);
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
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
