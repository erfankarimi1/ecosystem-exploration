import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import type { Book } from "@/types";

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
  const returnFocus = useReturnFocus();

  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent onCloseAutoFocus={returnFocus}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete book</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete <strong>{book.title}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
