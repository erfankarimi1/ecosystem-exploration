import Box from "@mui/material/Box";
import type { ReactNode } from "react";

type BookGridProps = {
  children: ReactNode;
};

/** One column on small screens, two on medium, three on large. */
export default function BookGrid({ children }: BookGridProps) {
  return (
    <Box
      component="ul"
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        listStyle: "none",
        m: 0,
        p: 0,
      }}
    >
      {children}
    </Box>
  );
}
