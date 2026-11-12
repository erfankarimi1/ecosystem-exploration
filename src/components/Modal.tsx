import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({ title, onClose, children }: ModalProps) {
  const titleId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  // Read during the first render, before any child moves the focus.
  const openerRef = useRef<Element | null>(document.activeElement);

  useEffect(() => {
    const content = contentRef.current;
    if (content && !content.contains(document.activeElement)) {
      content.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }
    document.body.classList.add("overflow-hidden");
    const opener = openerRef.current;

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus();
      }
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !contentRef.current) {
      return;
    }
    const items = contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={contentRef}
        className="my-auto w-full max-w-lg rounded-xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            className="rounded px-2 text-2xl leading-none text-slate-600 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-600"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
