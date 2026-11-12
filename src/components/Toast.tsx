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
    <div className="toast-container position-fixed bottom-0 end-0 p-3">
      <div role="status" aria-live="polite">
        {message && (
          <div className="toast show align-items-center text-bg-dark border-0">
            <div className="d-flex">
              <div className="toast-body">{message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
