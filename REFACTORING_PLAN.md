# Eufemia v11 Refactoring Plan

> Generated from codebase analysis on `v11` branch — April 2026
> **Status: PLAN ONLY — not yet executed**

---

## Table of Contents

1. [Repeated Patterns to Abstract](#1-repeated-patterns-to-abstract)
2. [Naming Convention Inconsistencies](#2-naming-convention-inconsistencies)
3. [Performance Bottlenecks](#3-performance-bottlenecks)
4. [Missing Industry Standards](#4-missing-industry-standards)
5. [React v19 Modernization](#5-react-v19-modernization)
6. [Prioritized Execution Plan](#6-prioritized-execution-plan)

---

## 1. Repeated Patterns to Abstract

### 1.1 Prop Extraction with Context (21+ components)

Nearly every component repeats this exact pattern:

```tsx
const props = extendPropsWithContext(
  { ...defaults, ...removeUndefinedProps({ ...restProps }) },
  defaultProps,
  { skeleton: context?.skeleton },
  pickFormElementProps(context?.formElement),
  context.ComponentName,
)
```

**Found in:** Button, Input, Checkbox, Dropdown, Slider, Radio, Textarea, FormStatus, Pagination, ToggleButton, and more.

**Proposal:** Create a `useComponentProps<T>(restProps, defaultProps, componentName)` hook that encapsulates:
- `extendPropsWithContext` call
- `removeUndefinedProps` wrapping
- Skeleton context injection
- Form element prop picking
- Translation lookup

### 1.2 Ref Forwarding with Callback (10+ components)

```tsx
const combinedRef = useCallback(
  (instance: HTMLElement | null) => {
    elementRef.current = instance
    if (typeof ref === 'function') {
      ref(instance)
    } else if (ref) {
      ref.current = instance
    }
  },
  [ref],
)
```

**Proposal:** Create a `useCombinedRef(...refs)` hook (or adopt React 19's native ref-as-prop which eliminates this entirely).

### 1.3 ID Generation Inconsistency

Two approaches used interchangeably:
- `useId(props.id)` — modern hook-based (preferred)
- `useRef(props.id || makeUniqueId()).current` — legacy ref-based (Accordion, etc.)

**Proposal:** Standardize on `useId()` everywhere and remove direct `makeUniqueId()` calls from components.

### 1.4 Status/Validation Rendering (15+ components)

Every form-related component repeats:

```tsx
{getStatusState(status) && (
  <FormStatus
    id={id + '-status'}
    status={status}
    statusState={statusState}
    globalStatus={globalStatus}
    {...statusProps}
  />
)}
```

**Proposal:** Create a `useFormStatus(id, statusProps)` hook that returns `{ statusElement, hasStatus }` — or a `<ComponentStatus>` wrapper.

### 1.5 className Construction (every component)

All components build class names with the same BEM structure:

```tsx
const className = clsx(
  'dnb-component',
  `dnb-component--variant-${variant}`,
  `dnb-component--size-${size}`,
  skeleton && createSkeletonClass('shape', skeleton, context),
  createSpacingClasses(props),
  className,
)
```

**Proposal:** Create a `useComponentClassName('component-name', modifiers, props)` utility that handles BEM class generation, skeleton classes, and spacing classes uniformly.

---

## 2. Naming Convention Inconsistencies

### 2.1 Hook Export Style (Minor)

| File | Pattern |
|------|---------|
| `useMounted.ts` | `export default function` |
| `useId.ts` | `export default function` |
| `useIsomorphicLayoutEffect.ts` | `export const` |

**Proposal:** Standardize to `export default function` for all hooks.

### 2.2 DefaultProps Constant Naming

Mixed naming for default props constants:

- `buttonDefaultProps` (prefixed with component name)
- `defaultProps` (generic — in InfoCard, InputMasked)

**Proposal:** Standardize to `{componentName}DefaultProps` pattern, though the ultimate fix is migrating to parameter defaults (see React v19 section).

### 2.3 Underscore Prefix Convention

`_text`, `_icon`, `_supportsSpacingProps` used for unused destructured variables but not documented in AGENTS.md.

**Proposal:** Add this convention to AGENTS.md for consistency.

**Overall:** Naming is 95% consistent. These are minor polish items.

---

## 3. Performance Bottlenecks

### 3.1 DrawerListProvider — Class Component (CRITICAL)

**File:** `src/fragments/drawer-list/DrawerListProvider.tsx` (1200+ lines)

- Class component with `static getDerivedStateFromProps`
- `setDirectionObserver()` is ~250 lines with nested DOM calculations
- `onKeyDownHandler()` is ~250 lines with massive switch statement
- Event listeners (scroll, resize, viewport) are not gated on `open` state — they fire continuously
- No proper memoization (class components lack `useMemo`/`useCallback`)

**Impact:** Every Dropdown, Autocomplete, and select-type component uses this.

**Proposal:**
1. Refactor to function component with hooks
2. Split into focused hooks: `useDrawerListDirection`, `useDrawerListKeyboard`, `useDrawerListScrollObserver`
3. Gate event listeners on `open` state
4. Debounce scroll/resize handlers

### 3.2 Monolithic Context Objects

**DrawerListContext** bundles unrelated values (activeItem, direction, data, open, callbacks) into a single context. Any change to `activeItem` re-renders ALL consumers even if they only use `data`.

**Provider context** (`src/shared/Provider.tsx`) creates a large object with many dependencies, causing frequent re-renders of all context consumers.

**Proposal:**
- Split DrawerListContext into `DrawerListDataContext`, `DrawerListUIContext`, `DrawerListEventsContext`
- Memoize Provider context sub-objects independently

### 3.3 DrawerListPortal — Listener Management

**File:** `src/fragments/drawer-list/DrawerListPortal.tsx`

- Position observer added every time `open` changes without checking if already added
- `makeStyle()` callback has 7+ dependencies — changes on nearly every render
- Effect cleanup runs too frequently due to unstable `init` dependency

**Proposal:** Stabilize `init` callback, use a ref to track observer state, reduce `makeStyle` dependencies.

### 3.4 Large Component Files

| Component | Lines | Reason |
|-----------|-------|--------|
| DrawerListProvider | 1200+ | Class component, should be hooks |
| Autocomplete | 1000+ | Mixed logic and JSX |
| Dropdown | 750+ | Can extract DropdownTrigger |
| GlobalStatus | 600+ | Class component |
| Tabs | 500+ | Class component |

**Proposal:** Extract business logic into custom hooks, split rendering into sub-components.

### 3.5 Inline Object Creation in Render

**Table.tsx** creates an unmemoized context value every render:

```tsx
const value = { trCountRef, rerenderAlias, collapseTrCallbacks, allProps: { ...allProps } }
return <TableContext value={value}>{children}</TableContext>
```

**Proposal:** Wrap in `useMemo`.

---

## 4. Missing Industry Standards

### 4.1 React Error Boundaries (HIGH)

No Error Boundary components exist. Component errors crash the entire application.

**Proposal:**
- Create a generic `<ErrorBoundary>` component
- Add fallback UI rendering
- Consider placement strategy: wrap complex components (Autocomplete, DatePicker, Table) individually

### 4.2 TypeScript Strict Mode (MEDIUM)

`tsconfig.json` has individual strict flags but not `"strict": true`. Missing:
- `noImplicitAny` (the most impactful)
- `exactOptionalPropertyTypes`

**Proposal:** Enable `"strict": true` and fix resulting type errors incrementally.

### 4.3 Test Coverage Configuration (LOW)

No `collectCoverage` in jest.config.js — no way to track test coverage metrics.

**Proposal:** Add coverage configuration with sensible thresholds.

### 4.4 No Automated API Documentation (LOW)

JSDoc comments exist but no tool generates API docs from types.

**Proposal:** Consider TypeDoc or similar for automated API reference generation.

### 4.5 No Build Caching / Task Orchestration (LOW)

Using Yarn workspaces without Turborepo/Nx for caching.

**Proposal:** Consider Turborepo for build caching (faster CI).

---

## 5. React v19 Modernization

### 5.1 Migrate 3 Class Components to Function Components (HIGH)

| Component | File | Complexity |
|-----------|------|------------|
| DrawerListProvider | `src/fragments/drawer-list/DrawerListProvider.tsx` | Very High — 1200+ lines, `getDerivedStateFromProps`, complex state |
| Tabs | `src/components/tabs/Tabs.tsx` | Medium — PureComponent with state |
| GlobalStatus | `src/components/global-status/GlobalStatus.tsx` | Medium — PureComponent with lifecycle |

**Proposal:** Migrate each to function components with hooks. DrawerListProvider should be split into multiple hooks during migration.

### 5.2 Remove forwardRef (LOW)

One remaining usage in `FormStatus.tsx`:

```tsx
const FormStatus = React.memo(React.forwardRef(FormStatusComponent))
```

React 19 passes `ref` as a regular prop — `forwardRef` is unnecessary.

**Proposal:** Remove `forwardRef`, accept `ref` in props directly.

### 5.3 Migrate defaultProps Constants to Parameter Defaults (MEDIUM)

~21 components use `const xxxDefaultProps = {}` pattern, fed into `extendPropsWithContext`. While not technically `static defaultProps` (so not deprecated), modern React style uses parameter defaults.

**Proposal:** When creating the `useComponentProps` hook (1.1), incorporate defaults as parameter defaults or merge internally — eliminating the need for separate constants.

### 5.4 Consider useDeferredValue for Heavy Renders (LOW)

Components that render many items (Autocomplete options, Table rows, Pagination) could benefit from `useDeferredValue` to keep the UI responsive during large updates.

**Proposal:** Add `useDeferredValue` to Autocomplete's filtered options rendering.

---

## 6. Prioritized Execution Plan

### Phase 1: Foundation (shared utilities)

| # | Task | Impact | Risk | Files |
|---|------|--------|------|-------|
| 1.1 | Create `useComponentProps` hook | High — reduces boilerplate in 21+ components | Low | New: `src/shared/helpers/useComponentProps.ts` |
| 1.2 | Create `useCombinedRef` hook | Medium — cleaner ref forwarding | Low | New: `src/shared/helpers/useCombinedRef.ts` |
| 1.3 | Standardize on `useId()` everywhere | Low — removes `makeUniqueId` in components | Low | Accordion + others using `useRef(makeUniqueId())` |
| 1.4 | Create `ErrorBoundary` component | High — prevents full-app crashes | Low | New: `src/components/error-boundary/` |

### Phase 2: DrawerListProvider Refactor (highest-impact single change)

| # | Task | Impact | Risk | Files |
|---|------|--------|------|-------|
| 2.1 | Extract `useDrawerListDirection` hook | High | Medium | New hook + DrawerListProvider |
| 2.2 | Extract `useDrawerListKeyboard` hook | High | Medium | New hook + DrawerListProvider |
| 2.3 | Extract `useDrawerListScrollObserver` hook | High — gated listeners | Medium | New hook + DrawerListProvider |
| 2.4 | Convert DrawerListProvider to function component | Critical | High | Complete rewrite of DrawerListProvider |
| 2.5 | Split DrawerListContext into 3 contexts | High — fewer re-renders | Medium | Context files + all consumers |

### Phase 3: Class Component Migration

| # | Task | Impact | Risk | Files |
|---|------|--------|------|-------|
| 3.1 | Migrate `Tabs` to function component | Medium | Medium | `src/components/tabs/Tabs.tsx` |
| 3.2 | Migrate `GlobalStatus` to function component | Medium | Medium | `src/components/global-status/GlobalStatus.tsx` |
| 3.3 | Remove `forwardRef` from FormStatus | Low | Low | `src/components/form-status/FormStatus.tsx` |

### Phase 4: Performance Optimizations

| # | Task | Impact | Risk | Files |
|---|------|--------|------|-------|
| 4.1 | Memoize Table context value | Medium | Low | `src/components/table/Table.tsx` |
| 4.2 | Stabilize DrawerListPortal callbacks | Medium | Low | `src/fragments/drawer-list/DrawerListPortal.tsx` |
| 4.3 | Add `useDeferredValue` to Autocomplete | Low | Low | `src/components/autocomplete/Autocomplete.tsx` |

### Phase 5: Standards & Polish

| # | Task | Impact | Risk | Files |
|---|------|--------|------|-------|
| 5.1 | Enable `"strict": true` in tsconfig | High — catches type bugs | Medium | `tsconfig.json` + type fixes |
| 5.2 | Add test coverage configuration | Low | Low | `jest.config.js` |
| 5.3 | Standardize hook export style | Low | Low | `src/shared/helpers/*.ts` |
| 5.4 | Document underscore prefix convention | Low | Low | `AGENTS.md` |
| 5.5 | Migrate defaultProps to parameter defaults | Low | Low | 21 component files |

---

## What's Already Good

The codebase has strong foundations that should be preserved:

- **Accessibility**: jest-axe, AriaLive, proper ARIA patterns — excellent
- **Testing**: Jest + Testing Library + Playwright + visual regression — comprehensive
- **SSR**: useIsomorphicLayoutEffect, window guards — well-handled
- **BEM + SCSS**: Consistent dnb- prefix, proper rational property order
- **Type safety**: Well-typed props, generics in forms, custom utility types
- **Build**: ESM/CJS/UMD output, tree-shaking configured, sideEffects declared
- **React 19 readiness**: Already at 95% — using `<Context value={}/>`, native `useId()`, no legacy lifecycle methods, no string refs
