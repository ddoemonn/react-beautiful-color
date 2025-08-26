# Contributing to react-beautiful-color

Thanks for your interest in contributing! 🎨

## 🚀 Quick Start

1. **Fork and clone:**

   ```bash
   git clone https://github.com/your-username/react-beautiful-color.git
   cd react-beautiful-color
   ```

2. **Install dependencies:**

   ```bash
   bun install
   cd website && bun install && cd ..
   ```

3. **Start development:**

   ```bash
   bun run dev        # Library in watch mode
   cd website && bun run dev  # Website dev server
   ```

## 🛠️ Development Commands

```bash
bun run build     # Build library
bun run test      # Run tests
bun run lint      # Lint & fix code
bun run typecheck # TypeScript check
```

## 📝 Contributing

1. **Create a branch:** `git checkout -b feature/my-feature`
2. **Make changes** following our code style
3. **Test:** `bun run test && bun run lint && bun run typecheck`
4. **Commit:** Use conventional commits (`feat:`, `fix:`, `docs:`)
5. **Push and create PR**

## 🎯 Code Style

- Single quotes, 2 spaces, semicolons required
- Use TypeScript for all components
- Accept `className` prop for styling
- Follow compound components pattern
- Run `bun run lint` before submitting

## 📁 Key Files

- `src/components/` - React components
- `src/hooks/` - Custom hooks
- `src/types.ts` - TypeScript types
- `src/utils.ts` - Utility functions
- `website/` - Next.js documentation site

## 🐛 Issues & Features

- Use GitHub issues for bugs and feature requests
- Include reproduction steps for bugs
- Provide clear use cases for features

Thanks for contributing! 🌈
