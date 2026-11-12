import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_CLASSES: Record<Status, string> = {
  "want-to-read": "text-bg-secondary",
  reading: "text-bg-warning",
  done: "text-bg-success",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge ${STATUS_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
