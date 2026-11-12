import { useEffect } from "react";

type ToastProps = {
  message: string | null;
  onClose: () => void;
};

const TOAST_DURATION_MS = 4000;

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) {
      return;
    }
    const timer = setTimeout(onClose, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div
      className="fixed right-4 bottom-4 left-4 z-50 sm:left-auto"
      role="status"
      aria-live="polite"
    >
      {message && (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
          <span>{message}</span>
          <button
            type="button"
            className="rounded px-1 text-lg leading-none hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
