import { useId } from "react";

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
  const searchId = useId();
  const groupName = useId();

  return (
    <div className="row g-2 align-items-center mb-4">
      <div className="col-12 col-md">
        <label htmlFor={searchId} className="visually-hidden">
          Search by title
        </label>
        <input
          id={searchId}
          type="search"
          className="form-control"
          placeholder="Search by title..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div
        className="col-12 col-md-auto d-flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {FILTER_OPTIONS.map((option) => {
          const optionId = `${groupName}-${option.value}`;
          return (
            <span key={option.value}>
              <input
                id={optionId}
                type="radio"
                className="btn-check"
                name={groupName}
                checked={status === option.value}
                onChange={() => onStatusChange(option.value)}
              />
              <label className="btn btn-outline-primary" htmlFor={optionId}>
                {option.label}
              </label>
            </span>
          );
        })}
      </div>
    </div>
  );
}
