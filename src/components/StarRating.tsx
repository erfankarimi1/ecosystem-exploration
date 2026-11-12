type StarRatingProps = {
  rating: number | null;
};

const MAX_STARS = 5;

export default function StarRating({ rating }: StarRatingProps) {
  if (rating === null) {
    return <span className="text-sm text-slate-600">Not rated</span>;
  }

  return (
    <span
      className="whitespace-nowrap text-amber-700"
      role="img"
      aria-label={`Rating: ${rating} out of ${MAX_STARS}`}
    >
      {"★".repeat(rating)}
      {"☆".repeat(MAX_STARS - rating)}
    </span>
  );
}
