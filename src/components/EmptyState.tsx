export default function EmptyState() {
  return (
    <div className="py-12 text-center text-muted-foreground">
      <p className="text-lg font-semibold text-foreground">No books found</p>
      <p>Try a different search or filter, or add a new book.</p>
    </div>
  );
}
