# ACEPTE — Design System

ACEPTE is a PTE Academic test-preparation platform. The design language is **professional, trustworthy, and focused** — optimised for long reading/listening sessions where visual clutter hurts concentration.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 15 (App Router, RSC) |
| Styling | Tailwind CSS v4 — CSS variables via `@theme inline` |
| Components | shadcn/ui (New York style) + Radix UI primitives |
| Icons | Lucide React |
| Fonts | Geist Sans (`font-sans`), Geist Mono (`font-mono`) |
| Class utility | `cn()` from `@/lib/utils` — always use this for conditional classes |

---

## Color System

All colors live as CSS custom properties in `src/app/globals.css`.  
**Never hardcode hex/oklch values in components.** Always use the Tailwind semantic class.  
To retheme the entire app, edit only the `:root {}` (light) and `.dark {}` blocks in that file.

### Semantic tokens

| Token | Light value | Usage | Tailwind class |
|-------|-------------|-------|----------------|
| `--background` | slate-50 | Page canvas | `bg-background` |
| `--foreground` | slate-950 | Body text | `text-foreground` |
| `--card` | white | Card surfaces | `bg-card` |
| `--card-foreground` | slate-950 | Text inside cards | `text-card-foreground` |
| `--primary` | **blue-600** | Brand, CTAs, active nav, links | `bg-primary` / `text-primary` |
| `--primary-foreground` | white | Text on primary bg | `text-primary-foreground` |
| `--secondary` | slate-100 | Ghost buttons, tag backgrounds | `bg-secondary` / `text-secondary` |
| `--secondary-foreground` | slate-700 | Text on secondary | `text-secondary-foreground` |
| `--muted` | slate-100 | Disabled/empty areas | `bg-muted` |
| `--muted-foreground` | slate-500 | Captions, placeholders, metadata | `text-muted-foreground` |
| `--accent` | sky-500 | Hover states, selected items | `bg-accent` / `text-accent` |
| `--accent-foreground` | white | Text on accent | `text-accent-foreground` |
| `--destructive` | red-600 | Errors, delete, wrong answers | `bg-destructive` / `text-destructive` |
| `--border` | slate-200 | Dividers, card borders | `border-border` |
| `--input` | slate-200 | Input borders | `border-input` |
| `--ring` | blue-600 | Focus rings | `ring-ring` |

Dark mode flips automatically — no `dark:` overrides needed for any of these tokens.

### Quick brand reference

```
Light primary:  blue-600  #2563eb  oklch(0.546 0.245 262.881)
Dark primary:   blue-400  #60a5fa  oklch(0.707 0.165 254.624)
Accent:         sky-500   #0ea5e9  oklch(0.685 0.169 237.323)
```

---

## PTE Section Color Coding

Each of the four PTE sections has a fixed color accent used on badges, left-borders, and progress indicators. These use Tailwind static colors (not variables) because they are semantic to the content domain, not the theme.

| Section | Badge | Left-border accent |
|---------|-------|--------------------|
| **Speaking** | `bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300` | `border-l-4 border-l-blue-500` |
| **Writing** | `bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300` | `border-l-4 border-l-violet-500` |
| **Reading** | `bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300` | `border-l-4 border-l-emerald-500` |
| **Listening** | `bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300` | `border-l-4 border-l-amber-500` |

---

## Typography

Font family is `font-sans` (Geist) everywhere. `font-mono` (Geist Mono) for audio transcripts, code, and timer displays.

| Role | Classes | When to use |
|------|---------|-------------|
| Page title | `text-3xl font-bold tracking-tight` | One per page, `<h1>` |
| Section heading | `text-xl font-semibold` | `<h2>` inside page sections |
| Card title | `text-base font-semibold` | Inside cards, `<h3>` |
| Body | `text-base` (default) | Paragraphs, question text |
| Label | `text-sm font-medium` | Form labels, column headers |
| Caption / meta | `text-sm text-muted-foreground` | Timestamps, counts, hints |
| Micro | `text-xs text-muted-foreground` | Badges, status chips |

---

## Spacing

Tailwind default scale (1 unit = 4 px). Common conventions:

| Context | Classes |
|---------|---------|
| Page wrapper padding | `px-4 py-8 sm:px-6 sm:py-12` |
| Card padding | `p-6` |
| Form field stack | `space-y-4` |
| Section gap | `gap-6` or `gap-8` |
| Inline icon + text | `gap-2` |
| Button group | `gap-3` |

---

## Border Radius

| Class | Size | Use |
|-------|------|-----|
| `rounded-sm` | 4 px | Badges, small chips |
| `rounded-md` | 6 px | Inputs, small buttons |
| `rounded-lg` | 10 px | Cards, dialogs (default) |
| `rounded-xl` | 14 px | Large feature panels |
| `rounded-full` | pill | Tags, avatars, radio pills |

---

## Shadows

| Class | Use |
|-------|-----|
| `shadow-sm` | Default card lift |
| `shadow-md` | Elevated dropdowns, selected cards |
| `shadow-lg` | Modals, command palettes |

---

## Component Patterns

### Page shell

```tsx
<div className="min-h-screen bg-background">
  <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6">
    {children}
  </div>
</div>
```

### Page header

```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold tracking-tight text-foreground">Title</h1>
  <p className="mt-1 text-muted-foreground">Description or instructions</p>
</div>
```

### Card

```tsx
<div className="rounded-lg border border-border bg-card p-6 shadow-sm">
  <h3 className="text-base font-semibold text-card-foreground">Card title</h3>
  <p className="mt-2 text-sm text-muted-foreground">Supporting text</p>
</div>
```

### Section badge (PTE section)

```tsx
/* Example for Speaking */
<span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
  Speaking
</span>
```

### Question card with section accent

```tsx
<div className="rounded-lg border border-border bg-card shadow-sm border-l-4 border-l-blue-500">
  <div className="p-6">
    {/* question content */}
  </div>
</div>
```

### Form field

```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-foreground">Email</label>
  <Input placeholder="you@example.com" />
  <p className="text-xs text-muted-foreground">Helper text</p>
</div>
```

### Primary CTA button

```tsx
<Button>Submit Answer</Button>
/* bg-primary text-primary-foreground — inherited from shadcn Button default variant */
```

### Answer status feedback

```tsx
<p className="text-sm font-medium text-green-600 dark:text-green-400">Correct</p>
<p className="text-sm font-medium text-destructive">Incorrect</p>
<p className="text-sm font-medium text-amber-600 dark:text-amber-400">Partial credit</p>
```

### Score / stat chip

```tsx
<div className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
  79 / 90
</div>
```

---

## Rules

1. **Semantic tokens only** — `text-foreground`, `bg-card`, `border-border`, never `text-gray-900`, `bg-white`.
2. **No hardcoded colors** in component files. All brand colors flow through CSS variables in `globals.css`.
3. **Dark mode is free** — the token system handles it; you do not need `dark:` overrides for core layout colors.
4. **Section colors are static** — Speaking/Writing/Reading/Listening colors use plain Tailwind (e.g. `blue-500`) because they are content-semantic, not theme-semantic.
5. **Always `cn()`** for conditional classes: `import { cn } from "@/lib/utils"`.
6. **shadcn/ui first** — check `@/components/ui/` before writing a custom component.
7. **Mobile-first responsive** — write base styles for mobile, add `sm:` / `md:` / `lg:` breakpoints as needed.
8. **Accessible contrast** — primary blue-600 on white passes WCAG AA. Do not reduce opacity below 70% on interactive text.
