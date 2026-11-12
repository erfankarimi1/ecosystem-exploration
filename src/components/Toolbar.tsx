import { STATUS_LABELS } from "@/books";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { StatusFilter } from "@/types";

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
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
      <Input
        type="search"
        aria-label="Search by title"
        placeholder="Search by title..."
        className="md:flex-1"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <ToggleGroup
        type="single"
        variant="outline"
        aria-label="Filter by status"
        className="flex-wrap"
        value={status}
        onValueChange={(value) => {
          // Radix sends "" when the active item is clicked again: keep the filter.
          if (value) {
            onStatusChange(value as StatusFilter);
          }
        }}
      >
        {FILTER_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
