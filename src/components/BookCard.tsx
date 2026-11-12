import { useId } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { Book } from "../types";
import StarRating from "./StarRating";
import StatusBadge from "./StatusBadge";

type BookCardProps = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  const titleId = useId();

  return (
    <Card
      component="article"
      variant="outlined"
      sx={{ height: 1, display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography id={titleId} component="h2" variant="h6">
          {book.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 1, justifyContent: "space-between", alignItems: "center" }}
        >
          <StatusBadge status={book.status} />
          <StarRating rating={book.rating} />
        </Stack>
        {book.notes && <Typography variant="body2">{book.notes}</Typography>}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="outlined"
          aria-describedby={titleId}
          onClick={() => onEdit(book)}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          aria-describedby={titleId}
          onClick={() => onDelete(book)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
