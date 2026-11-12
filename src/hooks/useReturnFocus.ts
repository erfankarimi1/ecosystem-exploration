import { useRef } from "react";

/**
 * Radix only returns focus to a `DialogTrigger`. Our dialogs are opened from
 * ordinary buttons, so we remember the focused element ourselves and focus it
 * again when the dialog closes. Pass the result to `onCloseAutoFocus`.
 */
export function useReturnFocus() {
  // Read during the first render, before the dialog moves the focus.
  const openerRef = useRef<Element | null>(document.activeElement);

  return (event: Event) => {
    event.preventDefault();
    const opener = openerRef.current;
    if (opener instanceof HTMLElement && opener.isConnected) {
      opener.focus();
    }
  };
}
