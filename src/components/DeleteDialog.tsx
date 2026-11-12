import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import type { Book } from "../types";

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
    <Dialog open onClose={onClose} aria-labelledby="delete-title">
      <DialogTitle id="delete-title">Delete book</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you really want to delete <strong>{book.title}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
