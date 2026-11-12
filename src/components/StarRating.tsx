type StarRatingProps = {
  rating: number | null;
};

const MAX_STARS = 5;

export default function StarRating({ rating }: StarRatingProps) {
  if (rating === null) {
    return <span className="small text-body-secondary">Not rated</span>;
  }

  return (
    <span
      className="text-warning-emphasis text-nowrap"
      role="img"
      aria-label={`Rating: ${rating} out of ${MAX_STARS}`}
    >
      {"★".repeat(rating)}
      {"☆".repeat(MAX_STARS - rating)}
    </span>
  );
}
