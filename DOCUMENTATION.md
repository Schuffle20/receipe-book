# Recipe Book — Project & Tailwind Documentation

This doc describes the tech stack used in this project and how **Tailwind CSS** (and `className`) are used to build the UI. Use it to relearn and practice.

---

## 1. Project overview

**Recipe Book** is a small React app that lists recipes, with search and category filter.

| Layer | What you use |
|-------|----------------|
| **Runtime** | React 19 |
| **Build** | Vite 7 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI system** | shadcn (components + design tokens) |
| **Icons** | lucide-react |
| **Utilities** | tailwind-merge, clsx (via `cn()`) |

---

## 2. Project structure (relevant parts)

```
receipe-book/
├── src/
│   ├── App.tsx              # Main app: recipes list, search, filter, cards
│   ├── main.tsx
│   ├── index.css            # Tailwind imports + theme (shadcn CSS variables)
│   ├── components/
│   │   └── ui/              # shadcn components
│   │       ├── input.tsx
│   │       ├── button.tsx
│   │       └── card.tsx
│   └── lib/
│       └── utils.ts         # cn() for merging classNames
├── package.json
└── DOCUMENTATION.md         # This file
```

- **App.tsx**: All UI is built here with Tailwind `className`s.
- **index.css**: Imports Tailwind, shadcn theme, and defines CSS variables (`--background`, `--foreground`, `--border`, etc.) used by Tailwind and shadcn.
- **components/ui**: Reusable pieces (e.g. `Input`) that already have Tailwind classes; you pass extra classes via `className`.
- **lib/utils.ts**: `cn(...inputs)` merges and deduplicates Tailwind classes (clsx + tailwind-merge).

---

## 3. How Tailwind is used in this project

Tailwind is **utility-first**: you style by adding **class names** to HTML/JSX. Each class usually does one thing (e.g. `p-4` = padding, `text-gray-900` = text color).

### 3.1 Where Tailwind comes from

- **index.css**: `@import "tailwindcss"`, `@import "shadcn/tailwind.css"`, and `@theme inline { ... }` so Tailwind knows your colors (e.g. `--color-background` → `bg-background`).
- **Vite**: `@tailwindcss/vite` compiles Tailwind at build time.

So in any `.tsx` file you can use Tailwind classes in the `className` prop.

---

## 4. Layout & spacing (used in your UI)

| Purpose | Classes | Meaning |
|--------|--------|--------|
| Full-height page | `min-h-screen` | Minimum height = 100vh |
| Padding around page | `p-4` | Padding 1rem (16px) all sides |
| Margin top | `mt-8` | Margin-top 2rem |
| Width | `w-full` | 100% width |
| Max width | `max-w-md` | Max width ~28rem (448px) |
| Gap between flex/grid children | `gap-2`, `gap-6` | 0.5rem, 1.5rem |
| Padding inside card | `p-6` | 1.5rem padding |
| Padding input | `py-2 px-3` | Vertical 0.5rem, horizontal 0.75rem |
| Margin bottom | `mb-2` | Margin-bottom 0.5rem |

**Practice:** Change `p-4` to `p-6` on the main container and see the page padding grow. Try `gap-4` vs `gap-6` on the recipe grid.

---

## 5. Flexbox & Grid

| Purpose | Classes | Meaning |
|--------|--------|--------|
| Flex container | `flex` | display: flex |
| Align items vertically | `items-center` | align-items: center |
| Grid layout | `grid` | display: grid |
| Grid columns | `grid-cols-1 md:grid-cols-3` | 1 column by default; 3 columns from `md` breakpoint up |
| Don’t shrink | `shrink-0` | flex-shrink: 0 (e.g. icon keeps size) |
| Fill remaining space | `min-w-0` + `w-full` | Lets flex child shrink and take remaining width |

**In your app:** The search bar is `flex items-center` (icon + input in a row). The recipe list is `grid grid-cols-1 md:grid-cols-3 gap-6`.

**Practice:** Change to `grid-cols-2` or `md:grid-cols-4` and see how the cards reflow.

---

## 6. Colors

### 6.1 Tailwind palette (gray, slate, etc.)

Used directly in your App.tsx:

| Class | Role |
|-------|------|
| `bg-gray-100` | Page background (light gray) |
| `bg-white` | Card / input background |
| `text-gray-900` | Primary text (dark) |
| `text-gray-600` | Secondary text (e.g. ingredients) |
| `text-gray-500` | Muted (e.g. placeholder, icon) |
| `border-gray-300` | Border color |
| `border-t-slate-800` | Top border accent on cards |

Number scale: 50 (lightest) … 900 (darkest). Same for `slate`, `blue`, etc.

### 6.2 shadcn / theme colors (from index.css)

Defined as CSS variables and mapped in `@theme inline` so you can use:

- `bg-background`, `text-foreground` — page/content
- `border-input`, `border-border` — borders
- `text-muted-foreground` — secondary text
- `focus-visible:ring-ring/50` — focus ring

These respect light/dark if you add a `.dark` class later.

---

## 7. Typography

| Class | Effect |
|-------|--------|
| `text-xl` | Larger title (e.g. recipe name) |
| `text-sm` | Smaller body text |
| `font-bold` | font-weight: 700 |

**Practice:** Use `text-2xl` on the recipe title or `text-xs` on the ingredients line.

---

## 8. Borders & radius

| Class | Meaning |
|-------|--------|
| `border` | 1px border all sides |
| `border-t-4` | 4px top border only |
| `border-0` | No border (e.g. input inside wrapper) |
| `rounded-md` | Border radius ~0.375rem |
| `rounded-xl` | Larger radius (cards) |
| `rounded-lg` | Between md and xl (shadcn inputs) |

---

## 9. Focus & interaction (accessibility)

| Class | When it applies |
|-------|------------------|
| `focus:outline-none` | Remove default browser focus outline |
| `focus:ring-2` | Add a 2px “ring” (box-shadow) on focus |
| `focus:ring-gray-400` | Ring color |
| `focus-within:ring-2` | Ring when any **child** is focused (e.g. wrapper of icon + input) |

**In your app:** The search wrapper uses `focus-within:` so when the input is focused, the whole bar (icon + input) gets the ring. The inner input uses `focus:ring-0` so only the wrapper shows the ring.

---

## 10. Responsive design (breakpoints)

Tailwind breakpoints (min-width):

- `sm`: 640px  
- `md`: 768px  
- `lg`: 1024px  
- `xl`: 1280px  
- `2xl`: 1536px  

**Prefix:** `md:grid-cols-3` = “use 3 columns from 768px upward”.

**Practice:** Use `md:text-2xl` so titles are bigger on medium screens and up.

---

## 11. How your recipe UI is built (class by class)

### Page container

```tsx
className="min-h-screen bg-gray-100 p-4 text-gray-900"
```

- Full viewport height, light gray background, padding, dark text.

### Search bar wrapper (icon + input as one control)

```tsx
className="mt-8 w-full max-w-md flex items-center rounded-md border border-gray-300 bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-0 mb-2"
```

- Top margin, constrained width, flex row, rounded bordered white box, focus ring on the whole bar when the input is focused.

### Search icon

```tsx
className="w-4 h-4 text-gray-500 shrink-0 ml-3"
```

- 16×16px, gray, no shrink, left margin.

### Search input (inside wrapper)

```tsx
className="w-full min-w-0 py-2 px-3 rounded-md border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0"
```

- Full width, no border/background (wrapper provides the “input” look), dark text and placeholder, no extra focus ring.

### Select (category)

```tsx
className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 mb-2"
```

- Full width, padding, border, white background, dark text, simple focus ring.

### Recipe card

```tsx
className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-slate-800 text-gray-900"
```

- White card, rounded corners, shadow, padding, dark top border, dark text.

### Card title & secondary text

```tsx
// Title
className="text-xl font-bold text-gray-900"
// Ingredients
className="text-gray-600"
```

### Empty state

```tsx
className="text-center mt-10 text-gray-600 text-xl"
```

- Centered, top margin, muted larger text.

---

## 12. The `cn()` helper (components & overrides)

In `lib/utils.ts`:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- **clsx**: Builds a string from conditional classes (e.g. `cn("p-4", isActive && "bg-blue-500")`).
- **twMerge**: Resolves Tailwind conflicts (e.g. `cn("p-4", "p-6")` → `p-6`).

**Usage:** In shadcn components you pass `className` to add or override styles:

```tsx
<Input className="border-0 bg-transparent" />
```

The component merges your classes with its defaults via `cn()`.

---

## 13. Quick reference for practice

- **Layout:** `flex`, `grid`, `items-center`, `gap-*`, `w-full`, `max-w-*`
- **Spacing:** `p-*`, `m-*`, `px-*`, `py-*`, `mt-*`, `mb-*`
- **Colors:** `bg-*`, `text-*`, `border-*`
- **Sizing:** `w-4`, `h-4`, `size-4`, `min-w-0`, `shrink-0`
- **Typography:** `text-sm`, `text-xl`, `font-bold`
- **Borders:** `border`, `border-0`, `rounded-md`, `rounded-xl`, `border-t-4`
- **Focus:** `focus:outline-none`, `focus:ring-2`, `focus-within:ring-2`
- **Responsive:** `md:grid-cols-3`, `md:text-2xl`

---

## 14. Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npm run format   # Prettier
npm run typecheck # TypeScript check
```

---

You can use this file to look up how each part of the UI is built and to experiment by changing the listed classes in `App.tsx` and observing the result.
