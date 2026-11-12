import { useId } from "react";

import type { Book } from "../types";
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
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <h2 id={titleId} className="card-title h5">
          {book.title}
        </h2>
        <p className="card-subtitle mb-3 text-body-secondary">{book.author}</p>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <StatusBadge status={book.status} />
          <StarRating rating={book.rating} />
        </div>
        {book.notes && <p className="card-text small mb-0">{book.notes}</p>}
      </div>
      <div className="card-footer bg-transparent d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          aria-describedby={titleId}
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          aria-describedby={titleId}
          onClick={() => onDelete(book)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
