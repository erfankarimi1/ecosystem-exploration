import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

type StarRatingProps = {
  rating: number | null;
};

export default function StarRating({ rating }: StarRatingProps) {
  if (rating === null) {
    return (
      <Typography variant="body2" color="text.secondary">
        Not rated
      </Typography>
    );
  }

  return <Rating value={rating} readOnly size="small" />;
}
