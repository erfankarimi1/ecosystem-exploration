import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { STATUS_LABELS } from "../books";
import type { StatusFilter } from "../types";

type ToolbarProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
};

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "want-to-read", label: STATUS_LABELS["want-to-read"] },
  { value: "reading", label: STATUS_LABELS.reading },
  { value: "done", label: STATUS_LABELS.done },
];

export default function Toolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: ToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <TextField
        type="search"
        size="small"
        label="Search by title"
        fullWidth
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <ToggleButtonGroup
        exclusive
        color="primary"
        size="small"
        aria-label="Filter by status"
        value={status}
        onChange={(_event, value: StatusFilter | null) => {
          // MUI sends null when the active button is clicked again: keep the filter.
          if (value) {
            onStatusChange(value);
          }
        }}
        sx={{ flexShrink: 0 }}
      >
        {FILTER_OPTIONS.map((option) => (
          <ToggleButton key={option.value} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
