import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_CLASSES: Record<Status, string> = {
  "want-to-read": "bg-status-want-soft text-status-want",
  reading: "bg-status-reading-soft text-status-reading",
  done: "bg-status-done-soft text-status-done",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
