# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR (localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

This is a React 19 + Vite 8 single-page application. There is no backend, router, or state management library — all state lives in React component state.

- Entry: [src/main.jsx](src/main.jsx) mounts `<App />` into `#root` inside `StrictMode`
- App shell: [src/App.jsx](src/App.jsx) is the single top-level component where all features will be built
- Styles: [src/App.css](src/App.css) for component styles, [src/index.css](src/index.css) for global/reset styles
- Static assets served from `public/` (e.g. `public/icons.svg` for SVG sprite icons)

The ESLint config ([eslint.config.js](eslint.config.js)) enforces React Hooks rules and React Refresh constraints. TypeScript is not configured — the project uses plain `.jsx`/`.js` files.

## 프로젝트 목적

한국어 가계부 앱. 수입/지출 기록, 잔액 자동 계산, localStorage로 데이터 저장.

## 규칙

- 모든 UI 텍스트는 한국어로 작성
- 수입은 초록색, 지출은 빨간색으로 표시
- 깔끔하고 모던한 디자인
- 데이터는 항상 localStorage에 저장해서 새로고침해도 유지

## Notes

- The React Compiler is intentionally not enabled (performance impact on dev/build).
- SVG icons are referenced via a sprite sheet at `/icons.svg` using `<use href="/icons.svg#icon-name">`.
- If the project grows to need routing or global state, add those libraries explicitly — none are present.
