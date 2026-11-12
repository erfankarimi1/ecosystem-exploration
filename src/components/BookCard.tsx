import { useId } from "react";

import type { Book } from "../types";
import Button from "./Button";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const titleId = useId();

  return (
    <article className="flex h-full flex-col rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex-1 p-4">
        <h2 id={titleId} className="text-lg font-semibold">
          {book.title}
        </h2>
        <p className="mb-3 text-slate-600">{book.author}</p>
        <div className="mb-2 flex items-center justify-between gap-2">
          <StatusBadge status={book.status} />
          <StarRating rating={book.rating} />
        </div>
        {book.notes && <p className="text-sm text-slate-700">{book.notes}</p>}
      </div>
      <div className="flex gap-2 border-t border-slate-200 p-4">
        <Button
          variant="secondary"
          size="sm"
          aria-describedby={titleId}
          onClick={() => onEdit(book)}
        >
          Edit
        </Button>
        <Button
          variant="danger-outline"
          size="sm"
          aria-describedby={titleId}
          onClick={() => onDelete(book)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
