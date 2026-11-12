import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { STATUS_LABELS } from "../books";
import type { Book, NewBook, Status } from "../types";

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

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

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
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="book-form-title"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <DialogTitle id="book-form-title">
          {book ? "Edit book" : "Add book"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Title"
              autoFocus
              fullWidth
              value={title}
              inputRef={titleRef}
              error={Boolean(errors.title)}
              helperText={errors.title}
              slotProps={{ htmlInput: { "aria-required": true } }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              label="Author"
              fullWidth
              value={author}
              inputRef={authorRef}
              error={Boolean(errors.author)}
              helperText={errors.author}
              slotProps={{ htmlInput: { "aria-required": true } }}
              onChange={(event) => setAuthor(event.target.value)}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Status"
                fullWidth
                value={status}
                onChange={(event) => setStatus(event.target.value as Status)}
              >
                {STATUSES.map((value) => (
                  <MenuItem key={value} value={value}>
                    {STATUS_LABELS[value]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Rating"
                fullWidth
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <MenuItem value={NO_RATING}>Not rated</MenuItem>
                {RATINGS.map((value) => (
                  <MenuItem key={value} value={String(value)}>
                    {value} {value === 1 ? "star" : "stars"}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField
              label="Notes"
              multiline
              minRows={3}
              fullWidth
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
