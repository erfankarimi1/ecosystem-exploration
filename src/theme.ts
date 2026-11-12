import { createTheme } from "@mui/material/styles";

// One place for colors, fonts and shape. Components use these values only.
export const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    // The default MUI orange is too light for white text (contrast < 4.5).
    warning: { main: "#9a5200" },
    background: { default: "#f5f5f7" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    // Sentence case labels instead of MUI's default ALL CAPS.
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
    MuiToggleButton: { styleOverrides: { root: { textTransform: "none" } } },
  },
});
