## 🚀 Getting Started

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun dev
```

Run for production:

```bash
bun start
```

Build your project:

```bash
bun run build
```

---

## 🧼 Code Quality: Biome

This project uses [Biome](https://biomejs.dev) for fast, unified linting & formatting.

### ✨ Format & Fix Code

```bash
bun run fix       # Auto-fixes formatting + unsafe lint issues
bun run lint      # Just check for issues
bun run format    # Format only
```

Biome automatically ignores `node_modules`, `dist`, and `src/components/ui/**/*` via `biome.json`.

---

## 🔒 Pre-commit Hook (Husky)

Fixes run automatically on commit:

```bash
# If not installed yet
bunx husky-init && bun install
```

Hook config lives in `.husky/pre-commit` and runs:

```bash
bun run fix
```

---

## ✅ Continuous Integration (CI)

This project includes a GitHub Actions workflow to lint and fix all files on every push and pull request:

📁 `.github/workflows/lint.yml`

```yaml
bunx biome check . --write
bunx biome check . --fix --unsafe --max-diagnostics=1000
```

---

## 🧰 Tech Stack

- ⚡ [Bun](https://bun.sh) — all-in-one JS runtime
- ⚛️ React 19 — with the latest hooks
- 🎨 [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- 🧩 [ShadCN UI](https://ui.shadcn.dev) — accessible design system
- 🧠 [Biome](https://biomejs.dev) — linting, formatting, and code analysis
