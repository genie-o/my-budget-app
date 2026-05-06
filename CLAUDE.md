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

React 19 + Vite 8 SPA. No backend, no router, no state management library — all state lives in `useState` inside `App.jsx`.

- Entry: [src/main.jsx](src/main.jsx) mounts `<App />` into `#root` inside `StrictMode`
- All logic and UI: [src/App.jsx](src/App.jsx) — single component, no sub-components
- Styles: [src/App.css](src/App.css) (component styles), [src/index.css](src/index.css) (global reset only)

### 데이터 모델

`transactions` 배열을 `localStorage` 키 `"transactions"`에 JSON으로 저장. 각 항목 구조:

```js
{ id: Date.now(), type: '수입'|'지출', amount: Number, category: String, memo: String, date: String }
```

카테고리 목록: `식비 / 교통 / 주거 / 쇼핑 / 월급 / 투자 / 기타` (`CATEGORIES` 상수로 관리)

## 프로젝트 목적

한국어 가계부 앱. 수입/지출 기록, 잔액 자동 계산, localStorage로 데이터 저장.

배포 주소: https://my-budget-app.vercel.app

## 규칙

- 모든 UI 텍스트는 한국어로 작성
- 수입은 초록색, 지출은 빨간색으로 표시
- 깔끔하고 모던한 디자인
- 데이터는 항상 localStorage에 저장해서 새로고침해도 유지

## Notes

- The React Compiler is intentionally not enabled (performance impact on dev/build).
- TypeScript is not configured — plain `.jsx`/`.js` files only.
- If the project grows to need routing or global state, add those libraries explicitly — none are present.
