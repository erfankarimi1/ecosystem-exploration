import { useCallback, useState } from "react";

import { filterBooks } from "./books";
import BookCard from "./components/BookCard";
import BookFormDialog from "./components/BookFormDialog";
import DeleteDialog from "./components/DeleteDialog";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import Toast from "./components/Toast";
import Toolbar from "./components/Toolbar";
import type { Book, NewBook, StatusFilter } from "./types";
import { useBooks } from "./useBooks";

type Dialog =
  | { kind: "form"; book: Book | null }
  | { kind: "delete"; book: Book }
  | null;

export default function App() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [dialog, setDialog] = useState<Dialog>(null);
  const [toast, setToast] = useState<string | null>(null);

  const closeDialog = () => setDialog(null);
  const closeToast = useCallback(() => setToast(null), []);

  const visibleBooks = filterBooks(books, { status, query });

  function handleSave(values: NewBook) {
    if (dialog?.kind === "form" && dialog.book) {
      updateBook(dialog.book.id, values);
      setToast("Book updated");
    } else {
      addBook(values);
      setToast("Book added");
    }
    closeDialog();
  }

  function handleDelete() {
    if (dialog?.kind === "delete") {
      deleteBook(dialog.book.id);
      setToast("Book deleted");
    }
    closeDialog();
  }

  return (
    <div className="bg-body-tertiary min-vh-100">
      <main className="container py-4">
        <Header onAdd={() => setDialog({ kind: "form", book: null })} />
        <Toolbar
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />
        <p className="text-body-secondary">
          {visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"}
        </p>
        {visibleBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 list-unstyled">
            {visibleBooks.map((book) => (
              <li key={book.id} className="col">
                <BookCard
                  book={book}
                  onEdit={(target) => setDialog({ kind: "form", book: target })}
                  onDelete={(target) =>
                    setDialog({ kind: "delete", book: target })
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      {dialog?.kind === "form" && (
        <BookFormDialog
          book={dialog.book}
          onSave={handleSave}
          onClose={closeDialog}
        />
      )}
      {dialog?.kind === "delete" && (
        <DeleteDialog
          book={dialog.book}
          onConfirm={handleDelete}
          onClose={closeDialog}
        />
      )}
      <Toast message={toast} onClose={closeToast} />
    </div>
  );
}
