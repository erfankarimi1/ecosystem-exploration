import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  onAdd: () => void;
};

export default function Header({ onAdd }: HeaderProps) {
  return (
    <Stack
      component="header"
      direction="row"
      sx={{
        mb: 3,
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
        Reading List
      </Typography>
      <Button variant="contained" onClick={onAdd}>
        + Add book
      </Button>
    </Stack>
  );
}
