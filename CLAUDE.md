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

**Approach for this branch: shadcn/ui (on Tailwind CSS v4).**

- Add UI primitives with the shadcn CLI (`npx shadcn@latest add <component>`). They live in `src/components/ui/` and are generated code: use them, do not hand-write look-alikes.
- Compose the app components in `src/components/` from the `ui/` primitives (Button, Card, Badge, Dialog, AlertDialog, Input, Select, Textarea, Label, ToggleGroup, Sonner).
- Theme with the shadcn CSS variables (`--primary`, `--background`, ...) in `src/index.css`. No `tailwind.config.js`, no raw hex values or arbitrary values in components.
- Dialog focus handling (trap, Escape, return focus) comes from the Radix primitives under shadcn. Do not re-implement it.
- No inline `style` props, no other CSS libraries.
- Reuse components. Do not repeat long class lists, extract a component.

Rules for every approach:

- Every interactive element must work with the keyboard and show a visible focus.
- Colors and spacing come from one place (theme, variables or design scale), do not invent new values.
- Check the layout at 360px and at 1280px.
