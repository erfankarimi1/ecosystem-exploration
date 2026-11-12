import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";

import { STATUS_LABELS } from "../books";
import type { Book, NewBook, Status } from "../types";
import Button from "./Button";
import { controlClass, ERROR_CLASS, LABEL_CLASS } from "./formStyles";
import Modal from "./Modal";

type BookFormDialogProps = {
  /** The book to edit, or `null` to add a new one. */
  book: Book | null;
  onSave: (values: NewBook) => void;
  onClose: () => void;
};

type Errors = {
  title?: string;
  author?: string;
};

const STATUSES = Object.keys(STATUS_LABELS) as Status[];
const RATINGS = [1, 2, 3, 4, 5];

export default function BookFormDialog({
  book,
  onSave,
  onClose,
}: BookFormDialogProps) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [status, setStatus] = useState<Status>(book?.status ?? "want-to-read");
  const [rating, setRating] = useState(book?.rating?.toString() ?? "");
  const [notes, setNotes] = useState(book?.notes ?? "");
  const [errors, setErrors] = useState<Errors>({});

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  const id = useId();
  const titleId = `${id}-title`;
  const authorId = `${id}-author`;
  const statusId = `${id}-status`;
  const ratingId = `${id}-rating`;
  const notesId = `${id}-notes`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!title.trim()) {
      nextErrors.title = "Title is required.";
    }
    if (!author.trim()) {
      nextErrors.author = "Author is required.";
    }
    setErrors(nextErrors);

    if (nextErrors.title) {
      titleRef.current?.focus();
      return;
    }
    if (nextErrors.author) {
      authorRef.current?.focus();
      return;
    }

    onSave({
      title: title.trim(),
      author: author.trim(),
      status,
      rating: rating === "" ? null : Number(rating),
      notes: notes.trim(),
    });
  }

  return (
    <Modal title={book ? "Edit book" : "Add book"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4 px-5 py-4">
          <div>
            <label htmlFor={titleId} className={LABEL_CLASS}>
              Title
            </label>
            <input
              id={titleId}
              ref={titleRef}
              type="text"
              className={controlClass(Boolean(errors.title))}
              value={title}
              aria-required="true"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? `${titleId}-error` : undefined}
              autoFocus
              onChange={(event) => setTitle(event.target.value)}
            />
            {errors.title && (
              <p id={`${titleId}-error`} className={ERROR_CLASS}>
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={authorId} className={LABEL_CLASS}>
              Author
            </label>
            <input
              id={authorId}
              ref={authorRef}
              type="text"
              className={controlClass(Boolean(errors.author))}
              value={author}
              aria-required="true"
              aria-invalid={errors.author ? true : undefined}
              aria-describedby={errors.author ? `${authorId}-error` : undefined}
              onChange={(event) => setAuthor(event.target.value)}
            />
            {errors.author && (
              <p id={`${authorId}-error`} className={ERROR_CLASS}>
                {errors.author}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={statusId} className={LABEL_CLASS}>
                Status
              </label>
              <select
                id={statusId}
                className={controlClass()}
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
              >
                {STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={ratingId} className={LABEL_CLASS}>
                Rating
              </label>
              <select
                id={ratingId}
                className={controlClass()}
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="">Not rated</option>
                {RATINGS.map((value) => (
                  <option key={value} value={value}>
                    {value} {value === 1 ? "star" : "stars"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor={notesId} className={LABEL_CLASS}>
              Notes
            </label>
            <textarea
              id={notesId}
              className={controlClass()}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
