import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";

import { STATUS_LABELS } from "@/books";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import type { Book, NewBook, Status } from "@/types";

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
/** Radix Select does not allow an empty item value, so "not rated" is "none". */
const NO_RATING = "none";

export default function BookFormDialog({
  book,
  onSave,
  onClose,
}: BookFormDialogProps) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [status, setStatus] = useState<Status>(book?.status ?? "want-to-read");
  const [rating, setRating] = useState(book?.rating?.toString() ?? NO_RATING);
  const [notes, setNotes] = useState(book?.notes ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const returnFocus = useReturnFocus();

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
      rating: rating === NO_RATING ? null : Number(rating),
      notes: notes.trim(),
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg" onCloseAutoFocus={returnFocus}>
        <DialogHeader>
          <DialogTitle>{book ? "Edit book" : "Add book"}</DialogTitle>
          <DialogDescription>
            Title and author are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor={titleId}>Title</Label>
            <Input
              id={titleId}
              ref={titleRef}
              value={title}
              aria-required="true"
              aria-invalid={errors.title ? true : undefined}
              aria-describedby={errors.title ? `${titleId}-error` : undefined}
              onChange={(event) => setTitle(event.target.value)}
            />
            {errors.title && (
              <p id={`${titleId}-error`} className="text-sm text-destructive">
                {errors.title}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={authorId}>Author</Label>
            <Input
              id={authorId}
              ref={authorRef}
              value={author}
              aria-required="true"
              aria-invalid={errors.author ? true : undefined}
              aria-describedby={errors.author ? `${authorId}-error` : undefined}
              onChange={(event) => setAuthor(event.target.value)}
            />
            {errors.author && (
              <p id={`${authorId}-error`} className="text-sm text-destructive">
                {errors.author}
              </p>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={statusId}>Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as Status)}
              >
                <SelectTrigger id={statusId} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {STATUS_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={ratingId}>Rating</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger id={ratingId} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_RATING}>Not rated</SelectItem>
                  {RATINGS.map((value) => (
                    <SelectItem key={value} value={String(value)}>
                      {value} {value === 1 ? "star" : "stars"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={notesId}>Notes</Label>
            <Textarea
              id={notesId}
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
