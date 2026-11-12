import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function EmptyState() {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h6">No books found</Typography>
      <Typography color="text.secondary">
        Try a different search or filter, or add a new book.
      </Typography>
    </Box>
  );
}
