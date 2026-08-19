# رولز سينابون — Rolls Cinnabon

An Arabic-language (RTL) cinnamon rolls & desserts shop site: browse the menu,
order a ready-made box, or build your own box with a custom mix of rolls and
add-ons.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React, SSR)
- TypeScript
- Tailwind CSS
- [TanStack Router](https://tanstack.com/router) + [TanStack Query](https://tanstack.com/query)
- shadcn/ui (Radix UI primitives)
- Motion for animations

## Getting started

Requires Node.js.

```sh
npm install
npm run dev
```

The dev server prints a local URL to open in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

## Project structure

- `src/routes/` — file-based routes (TanStack Router). `__root.tsx` is the app shell.
- `src/components/site/` — page sections: nav, hero, marquee, menu, boxes, builder, add-ons, cart, footer.
- `src/components/ui/` — shadcn/ui primitives.
- `src/lib/` — utilities, menu data, and SSR error handling.
- `src/styles.css` — Tailwind config and design tokens (colors, typography).

The site renders right-to-left (`dir="rtl"`, `lang="ar"`) and uses the Cairo /
Baloo Bhaijaan 2 Arabic web fonts.
