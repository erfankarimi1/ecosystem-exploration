# Reading List

A reading list built with React 19, TypeScript and Vite. No backend, the data is kept in `localStorage`. Read `SPEC.md` before you build anything.

## Commands

- `npm run dev`: start the app on http://localhost:3000
- `npm run test:run`: run the tests once
- `npm run check`: check the types
- `npm run build`: build the app

## Rules

- **Do not change** `src/useBooks.ts`, `src/books.ts`, `src/types.ts` or `src/seed.json`. They are tested and shared between all versions of the app. Only build the view layer.
- Use function components and hooks. No class components.
- No `any`. Type props explicitly.
- Keep components small. One component per file in `src/components`.
- Run `npm run check` and `npm run test:run` before you say a task is done.

## Styling

<!-- TODO: Replace this section with the rules for the approach you chose. -->

**Approach for this branch: Material UI (`@mui/material`, Emotion).**

- Build the UI from MUI components (Container, Card, Chip, Rating, TextField, ToggleButtonGroup, Dialog, Snackbar, Alert). Do not hand-write look-alikes.
- Colors, fonts, shape and spacing come from one place: the theme in `src/theme.ts` (`createTheme`). Components use theme values (`color="primary"`, `sx={{ p: 2 }}` spacing units), not raw hex values or pixels.
- Use the `sx` prop only for small layout tweaks (grid, spacing). It is MUI's styling API, not an inline `style` prop. No `style` props, no CSS files for components, no other CSS libraries.
- Dialog focus handling (trap, Escape, return focus) comes from MUI's Dialog. Do not re-implement it.
- `src/index.css` stays empty. `CssBaseline` provides the reset.
- Reuse components. Do not repeat long `sx` blocks, extract a component.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
