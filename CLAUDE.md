# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server with HMR
pnpm build        # tsc -b + vite build (type-check + bundle)
pnpm lint         # ESLint on all TS/TSX files
pnpm preview      # Preview production build
```

## Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- Package manager: **pnpm**
- React Compiler enabled via `babel-plugin-react-compiler` — do NOT add manual `useMemo`/`useCallback`/`memo` calls; the compiler handles memoization automatically

## TypeScript Config

Strict mode active with `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`. All unused vars/params break the build.

## ESLint

Flat config format (`eslint.config.js`). Extends typescript-eslint recommended + react-hooks + react-refresh.

## Architecture

Project is early-stage. As features are added, follow:
- `src/components/` — shared UI components
- `src/pages/` or `src/routes/` — route-level components
- `src/hooks/` — custom hooks
- `src/services/` or `src/api/` — API layer
- `src/store/` — state management (if added)

## Guidelines
- Debes eliminar cualquier comentario co authored de cualquier IA
- Debes escribir componentes Pages limpios, estos componentes no deben estar llenos de lógica
- Si un componente necesita lógica compleja
- Debes programar usando español, esto es porque el proyecto es un hackathon, y no todos mis compañeros saben inglés
