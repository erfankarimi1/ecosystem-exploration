import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Book } from "@/types";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <h2 className="text-base font-semibold">{book.title}</h2>
        </CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <StatusBadge status={book.status} />
          <StarRating rating={book.rating} />
        </div>
        {book.notes && <p className="text-sm">{book.notes}</p>}
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label={`Edit ${book.title}`}
          onClick={() => onEdit(book)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          aria-label={`Delete ${book.title}`}
          onClick={() => onDelete(book)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
