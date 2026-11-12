import { useId } from "react";

import { STATUS_LABELS } from "../books";
import type { StatusFilter } from "../types";
import { controlClass } from "./formStyles";

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
  const searchId = useId();
  const groupName = useId();

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
      <div className="md:flex-1">
        <label htmlFor={searchId} className="sr-only">
          Search by title
        </label>
        <input
          id={searchId}
          type="search"
          className={controlClass()}
          placeholder="Search by title..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {FILTER_OPTIONS.map((option) => {
          const optionId = `${groupName}-${option.value}`;
          return (
            <div key={option.value}>
              <input
                id={optionId}
                type="radio"
                className="peer sr-only"
                name={groupName}
                checked={status === option.value}
                onChange={() => onStatusChange(option.value)}
              />
              <label
                htmlFor={optionId}
                className="block cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
