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

**Approach for this branch: Bootstrap 5.3 (CSS only).**

- Import `bootstrap/dist/css/bootstrap.min.css` once in `src/index.tsx`, before `./index.css`.
- Do not import Bootstrap's JavaScript. Dialogs, toasts and dropdowns are React components (state-driven) that use Bootstrap's classes (`modal`, `toast`, `btn`, `badge`, `card`, `row`/`col`).
- Use Bootstrap utility classes and components first. `src/index.css` only holds small overrides, set through Bootstrap CSS variables (`--bs-*`) on `:root`.
- No inline `style` props, no other CSS libraries, no `react-bootstrap`.
- Reuse components. Do not repeat long class lists, extract a component.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
