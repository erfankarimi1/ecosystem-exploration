import { useState } from "react";
import { toast } from "sonner";

import { filterBooks } from "./books";
import BookCard from "./components/BookCard";
import BookFormDialog from "./components/BookFormDialog";
import DeleteDialog from "./components/DeleteDialog";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";
import { Toaster } from "./components/ui/sonner";
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

  const closeDialog = () => setDialog(null);

  const visibleBooks = filterBooks(books, { status, query });

  function handleSave(values: NewBook) {
    if (dialog?.kind === "form" && dialog.book) {
      updateBook(dialog.book.id, values);
      toast("Book updated");
    } else {
      addBook(values);
      toast("Book added");
    }
    closeDialog();
  }

  function handleDelete() {
    if (dialog?.kind === "delete") {
      deleteBook(dialog.book.id);
      toast("Book deleted");
    }
    closeDialog();
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Header onAdd={() => setDialog({ kind: "form", book: null })} />
        <Toolbar
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />
        <p className="mb-3 text-sm text-muted-foreground">
          {visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"}
        </p>
        {visibleBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleBooks.map((book) => (
              <li key={book.id}>
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
      <Toaster theme="light" />
    </div>
  );
}
