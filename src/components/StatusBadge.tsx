import { STATUS_LABELS } from "@/books";
import { Badge } from "@/components/ui/badge";
import type { Status } from "@/types";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_CLASSES: Record<Status, string> = {
  "want-to-read": "bg-status-want text-status-want-foreground",
  reading: "bg-status-reading text-status-reading-foreground",
  done: "bg-status-done text-status-done-foreground",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={STATUS_CLASSES[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
