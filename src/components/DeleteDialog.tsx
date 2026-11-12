import type { Book } from "../types";
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
      <div className="modal-body">
        <p className="mb-0">
          Do you really want to delete <strong>{book.title}</strong>?
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          autoFocus
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
