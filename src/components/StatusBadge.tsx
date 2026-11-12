import Chip from "@mui/material/Chip";

import { STATUS_LABELS } from "../books";
import type { Status } from "../types";

type StatusBadgeProps = {
  status: Status;
};

const STATUS_COLORS: Record<Status, "default" | "warning" | "success"> = {
  "want-to-read": "default",
  reading: "warning",
  done: "success",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      size="small"
      color={STATUS_COLORS[status]}
      label={STATUS_LABELS[status]}
    />
  );
}
