import type { Book } from "../types";
import Button from "./Button";
import Modal from "./Modal";

type DeleteDialogProps = {
  book: Book;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteDialog({
  book,
  onConfirm,
  onClose,
}: DeleteDialogProps) {
  return (
    <Modal title="Delete book" onClose={onClose}>
      <div className="px-5 py-4">
        <p>
          Do you really want to delete <strong>{book.title}</strong>?
        </p>
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
        <Button variant="secondary" autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
