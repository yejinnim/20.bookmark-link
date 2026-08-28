"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onDismiss: () => void;
  duration?: number;
  variant?: "error" | "success";
};

export default function Toast({
  message,
  onDismiss,
  duration = 4000,
  variant = "error",
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  const bgColor =
    variant === "success" ? "bg-[var(--success)]" : "bg-[var(--error)]";

  return (
    <div
      role="alert"
      className={`toast fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-[12px] px-5 py-3 text-[15px] font-medium text-white shadow-[0_4px_16px_rgba(0,0,0,0.16)] ${bgColor}`}
    >
      {message}
    </div>
  );
}
