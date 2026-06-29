# Plan: Remove `validateDOMAttributes`

> Status: **Plan only — no production code changed yet.** This document tracks the work to retire the deprecated `validateDOMAttributes` helper.
> Branch: `refactor/remove-validate-dom-attributes`. Target package: `packages/dnb-eufemia`.

## 1. Goal

Remove the `@deprecated` helper `validateDOMAttributes` from
[packages/dnb-eufemia/src/shared/component-helper.ts](packages/dnb-eufemia/src/shared/component-helper.ts#L44)
and migrate all **73 call sites across 52 non-test files** to explicit, intention-revealing prop handling — without changing any component's public API, emitted DOM, or CSS classes.

The deprecation note already states the intended direction:

> "stop using this function as it only removes things that should be handled in the component; any documented prop should be explicitly removed, and props should not have default value `null`."

## 2. What the helper actually does

`validateDOMAttributes(props, params)` mutates `params` in place (and also returns it). It performs **three separate jobs** that are currently entangled:

| Job | Behavior | Modern replacement |
|-----|----------|--------------------|
| **A. Legacy `attributes` spread** | If `props.attributes` is an object, merge its keys into `params` (with `__proto__`/`constructor`/`prototype` pollution guard), then `delete params.attributes`. Comment says "mostly used for prop example usage". | Keep **only** where the `attributes` prop is public (see §4). Elsewhere it is a no-op and can be dropped. |
| **B. Strip Eufemia layout props** | Delete `space`, `top`, `right`, `bottom`, `left`, `noCollapse`, `innerSpace`, `labelDirection`; delete `disabled` when `=== null`; set `aria-disabled` when `disabled === true`. | `removeSpaceProps` / `omitSpacingProps` + explicit destructure of the **gap props** (see §3). |
| **C. Scrub invalid DOM keys** | Delete non-event function props (keeps `ref` and camelCase `on*`), delete `null` values, delete keys containing chars outside `[a-z-]` (e.g. `aria_hidden`). | Largely handled by **React 19** (drops `null`/`undefined`/`false`, ignores nothing it shouldn't) + explicit destructuring. |

Source: [component-helper.ts](packages/dnb-eufemia/src/shared/component-helper.ts#L44-L130). Existing unit tests: [shared/__tests__/component-helper.test.tsx](packages/dnb-eufemia/src/shared/__tests__/component-helper.test.tsx#L262).

## 3. Replacement building blocks (already in the codebase)

- `removeSpaceProps` / `omitSpacingProps` — [components/space/SpacingUtils.ts](packages/dnb-eufemia/src/components/space/SpacingUtils.ts#L715) and [components/flex/utils.tsx](packages/dnb-eufemia/src/components/flex/utils.tsx#L19). Removes `space, innerSpace, top, bottom, left, right`.
- `pickSpacingProps` — [components/flex/utils.tsx](packages/dnb-eufemia/src/components/flex/utils.tsx#L33). Forwards spacing to a root element (already used across `extensions/forms`).
- **React 19** (peer dep `^19`, dev `19.2.5` — [package.json](packages/dnb-eufemia/package.json#L124)) drops `null`/`undefined`/`false` attribute values automatically, so Job C's null-scrub is mostly redundant for correctness.

> ⚠️ **Behavior gap — narrower than it first looks (see §4a):** `removeSpaceProps` removes `space, innerSpace, top, bottom, left, right` — i.e. **all of `SpacingProps`**. (`noCollapse` is *not* part of `SpacingProps`; it exists only on the `Space` component — [Space.tsx](packages/dnb-eufemia/src/components/space/Space.tsx#L45) — so ordinary component props can't carry it.) `useSpacing` already strips all of these *plus* `noCollapse` before `validateDOMAttributes` runs; `labelDirection` is explicitly destructured in every component that has it; `aria-disabled` is set explicitly where needed; and React 19 covers the `null`/function/invalid-name scrub. So the only real exposure is spacing props at call sites whose DOM object does **not** pass through `useSpacing` — and those are fully covered by `removeSpaceProps`.

## 4. Public-API safety assessment

- **The function is internal-only.** It is **not** re-exported from [shared/index.tsx](packages/dnb-eufemia/src/shared/index.tsx) and **not** in the UMD/ESM basis bundles (those expose only `isTouchDevice`). Every usage imports it directly from the internal `shared/component-helper`. → **Removing the function is not a breaking change for consumers.**
- **The `attributes` prop IS public** in several components and must be preserved (Job A cannot be globally dropped). Confirmed typed occurrences include: [Input.tsx](packages/dnb-eufemia/src/components/input/Input.tsx#L854), [Switch.tsx](packages/dnb-eufemia/src/components/switch/Switch.tsx#L87), [RadioGroup.tsx](packages/dnb-eufemia/src/components/radio/RadioGroup.tsx#L69), [FormStatus.tsx](packages/dnb-eufemia/src/components/form-status/FormStatus.tsx#L127), [TooltipWithEvents.tsx](packages/dnb-eufemia/src/components/tooltip/TooltipWithEvents.tsx#L28), [PopoverContainer.tsx](packages/dnb-eufemia/src/components/popover/PopoverContainer.tsx#L30), [DatePickerProvider.tsx](packages/dnb-eufemia/src/components/date-picker/DatePickerProvider.tsx#L37).
- **Contributor docs teach the old pattern** and must be updated: [making-changes.mdx](packages/dnb-design-system-portal/src/docs/contribute/getting-started/making-changes.mdx#L233) shows `validateDOMAttributes(props, rest)` as the recommended spacing-support recipe.

## 4a. Per-component leak review — will removal forward unwanted props to the DOM?

Reviewed all 73 call sites. Four mechanics make the **majority of sites safe** (the helper is redundant):

1. **`useSpacing` already strips spacing props *and* `noCollapse`.** Its `spacingKeys = [space, innerSpace, top, right, bottom, left, noCollapse]` are deleted from the returned object — [SpacingUtils.ts](packages/dnb-eufemia/src/components/space/SpacingUtils.ts#L564). Any DOM object routed through `useSpacing` is already clean.
2. **`labelDirection` is always destructured** out to build class modifiers (e.g. [Input.tsx](packages/dnb-eufemia/src/components/input/Input.tsx#L525), [Dropdown.tsx](packages/dnb-eufemia/src/components/dropdown/Dropdown.tsx#L417), [RadioGroup.tsx](packages/dnb-eufemia/src/components/radio/RadioGroup.tsx#L177)) — it never sits in the spread object.
3. **`aria-disabled` is set explicitly** by the components that need it ([Button.tsx](packages/dnb-eufemia/src/components/button/Button.tsx#L422), [Textarea.tsx](packages/dnb-eufemia/src/components/textarea/Textarea.tsx#L533), [AccordionHeader.tsx](packages/dnb-eufemia/src/components/accordion/AccordionHeader.tsx#L394), [Tabs.tsx](packages/dnb-eufemia/src/components/tabs/Tabs.tsx#L1314)).
4. **React 19 drops `null`/`undefined`/`false` and unknown function-valued props**, covering the helper's invalid-key scrub.

### SAFE — removal leaks nothing (call is redundant)
These build the DOM object via `useSpacing`, **or** pass a destructured `rest` *back through* `useSpacing` afterward (so spacing + `noCollapse` are stripped regardless). Verified examples: `Table`, `Avatar`, `Timeline`, `Breadcrumb` (pattern `validateDOMAttributes(allProps, props)` immediately followed by `useSpacing(allProps, { ...props })`); plus `Element`, `AccordionContent`, `AccordionHeader`, `AccordionGroup`, `TagGroup`, `AvatarGroup`, `Heading`, `Logo`, `NumberFormatBase`, `stat/Content`, `stat/Label`, `stat/Text`, `DrawerList`, `Autocomplete`, `Dropdown` (main/list/ul), `Tabs`, `TabsContentWrapper`, `ScrollView`, `Skeleton`, `Space`, `ProgressIndicator`(+Circular/Linear), `Pagination`, `DialogContent`, `StepIndicatorTriggerButton`, `ToggleButton`, `ToggleButtonGroup`, `DatePicker`/`DatePickerInput` (non-`attributes` params).

### RISK — needs explicit handling (would otherwise leak / drop wanted props)
1. **Spacing leaks onto the inner `<input>` of form controls** — `Checkbox`, `Radio`, `Switch` build `inputParams = { disabled, checked, ...rest }` **separately** from `useSpacing` (which is applied to the outer `mainParams`). So `...rest` carries `space/top/right/bottom/left/innerSpace` onto `<input>`; today `validateDOMAttributes` strips them. Verified: [Switch.tsx](packages/dnb-eufemia/src/components/switch/Switch.tsx#L268), [Checkbox.tsx](packages/dnb-eufemia/src/components/checkbox/Checkbox.tsx#L269), and the destructures confirm spacing props fall into `...rest`. Fix: `removeSpaceProps` capturing the return — it covers all six (`noCollapse` is **not** in `SpacingProps`, only on `Space`, so it can't reach these inputs). ✅ **Safety-net contract tests added** (Phase 0): `should not forward spacing props to the input element`.
2. **Other raw-`rest`-not-through-`useSpacing` objects** — e.g. [Badge.tsx](packages/dnb-eufemia/src/components/badge/Badge.tsx#L172) (inner span `restProps`), [TableContainer.tsx](packages/dnb-eufemia/src/components/table/TableContainer.tsx#L45). Same fix.
3. **Public `attributes` prop must be preserved** (removing it drops props we DO want): `Input` (`inputAttributes` + `attributes`), `Switch`, `RadioGroup`, `FormStatus`, `Tooltip`, `Dropdown` trigger, `DatePicker`. Keep the prototype-pollution-guarded merge.
4. **Mutation-vs-return trap (mechanical, ~48 sites):** these ignore the return value and rely on in-place mutation. `removeSpaceProps` returns a NEW object — the result **must be assigned back**, or the strip silently no-ops and spacing leaks.

**Bottom line:** with a correct migration (lean on the existing `useSpacing`; add `removeSpaceProps` only at the raw-`rest` sites — the form-control `<input>`s, Badge, TableContainer; preserve the `attributes` prop; keep explicit `aria-disabled`), **no unwanted props reach the DOM**. The only way unwanted props leak is a naive/mechanical removal.

## 5. Phased execution plan

Each phase is its own PR, keeps unit + screenshot/visual-regression suites green, and follows `AGENTS.md` (Conventional Commits, PascalCase scope, Prettier/ESLint via workspace Yarn). Recommended scope tag: `refactor(component-helper): ...` for shared work, component scope per migration PR.

### Phase 0 — Decide the replacement recipe (no behavior change) — ✅ done
- [x] **Decision: Option A — `removeSpaceProps` capturing the return value**, applied only at the non-`useSpacing` sites (form-control `<input>`s, Badge, TableContainer). No new helper needed: `removeSpaceProps` covers all of `SpacingProps`, and `noCollapse` is not a component prop (only on `Space`), so it can't reach these elements.
- [x] **Canonical recipe:** where `params` is a raw `rest`, replace `validateDOMAttributes(props, params)` with `params = removeSpaceProps(params)` (**assign the return** — it does not mutate); where `params` already comes from / is later passed through `useSpacing` (most sites), **delete the call entirely**; for components with a public `attributes` prop, keep an explicit prototype-pollution-guarded merge of `props.attributes`.
- [x] **Safety-net tests added (green, verified non-vacuous):** `should not forward spacing props to the input element` in [Checkbox.test.tsx](packages/dnb-eufemia/src/components/checkbox/__tests__/Checkbox.test.tsx), [Radio.test.tsx](packages/dnb-eufemia/src/components/radio/__tests__/Radio.test.tsx), [Switch.test.tsx](packages/dnb-eufemia/src/components/switch/__tests__/Switch.test.tsx).

### Phase 1 — Update contributor documentation — ✅ done
- [x] Replaced the `validateDOMAttributes` example in [making-changes.mdx](packages/dnb-design-system-portal/src/docs/contribute/getting-started/making-changes.mdx) with the Phase 0 recipe (rely on `useSpacing` to strip spacing), so no new usage is introduced during the migration.

### Phase 2 — Migrate "pure scrub" call sites (22 calls — lowest risk)
First arg is `null` (17) or `{}` (5): no `attributes` spread, so this is purely "stop leaking layout props". Replace with `removeSpaceProps`/explicit destructure.
- [x] **Element.tsx** — call was redundant (`params` already comes from `useSpacing`); deleted call + import.
- [ ] Remaining `null`/`{}` sites: [DrawerList.tsx](packages/dnb-eufemia/src/fragments/drawer-list/DrawerList.tsx#L556) (3 of 4 calls), [Icon.tsx](packages/dnb-eufemia/src/components/icon/Icon.tsx#L374), [Space.tsx](packages/dnb-eufemia/src/components/space/Space.tsx#L160), [DialogContent.tsx](packages/dnb-eufemia/src/components/dialog/DialogContent.tsx#L118), [AvatarGroup.tsx](packages/dnb-eufemia/src/components/avatar/AvatarGroup.tsx#L140) (⚠️ needs `removeSpaceProps` — the spread object bypasses `useSpacing`), and the remaining `null`/`{}` sites.

### Phase 3 — Migrate standard `props`-arg call sites WITHOUT a public `attributes` prop
The bulk of components. Drop the no-op `attributes` spread, destructure known/layout props, spread the rest. Migrate in small batches (5–8 files/PR), screenshot-tested each batch. Representative files:
- [x] **Table, Avatar, Timeline, Breadcrumb** — calls were redundant: `validateDOMAttributes(allProps, props)` is immediately followed by `useSpacing(allProps, { ...props })`, which already strips spacing; none has a public `attributes` prop. Deleted calls + imports.
- [ ] Remaining: [Badge.tsx](packages/dnb-eufemia/src/components/badge/Badge.tsx#L172) (⚠️ needs `removeSpaceProps` — inner span bypasses `useSpacing`), [Heading.tsx](packages/dnb-eufemia/src/components/heading/Heading.tsx#L279), [Accordion*.tsx](packages/dnb-eufemia/src/components/accordion/Accordion.tsx#L426), [Logo.tsx](packages/dnb-eufemia/src/components/logo/Logo.tsx#L176), [InfoCard.tsx](packages/dnb-eufemia/src/components/info-card/InfoCard.tsx#L169), the `stat/*` and `progress-indicator/*` files, etc.

### Phase 4 — Migrate components WITH a public `attributes` prop (preserve Job A)
Must keep spreading the public `attributes` prop (with the pollution guard) — only the layout-strip changes.
- [ ] [Input.tsx](packages/dnb-eufemia/src/components/input/Input.tsx#L691), [Switch.tsx](packages/dnb-eufemia/src/components/switch/Switch.tsx#L285), [RadioGroup.tsx](packages/dnb-eufemia/src/components/radio/RadioGroup.tsx#L223), [FormStatus.tsx](packages/dnb-eufemia/src/components/form-status/FormStatus.tsx#L551), [Tooltip.tsx](packages/dnb-eufemia/src/components/tooltip/Tooltip.tsx#L67), [DatePicker.tsx](packages/dnb-eufemia/src/components/date-picker/DatePicker.tsx#L701) / [DatePickerInput.tsx](packages/dnb-eufemia/src/components/date-picker/DatePickerInput.tsx#L889).
- [ ] If the pollution-guarded spread is reused, factor it into a small explicit helper rather than re-inlining.

### Phase 5 — Migrate multi-call / complex components
Several calls per file and interdependent params; do these carefully and last.
- [ ] [DrawerList.tsx](packages/dnb-eufemia/src/fragments/drawer-list/DrawerList.tsx#L555) (4), [Dropdown.tsx](packages/dnb-eufemia/src/components/dropdown/Dropdown.tsx#L508) (4), [Autocomplete.tsx](packages/dnb-eufemia/src/components/autocomplete/Autocomplete.tsx#L2346) (3), [Textarea.tsx](packages/dnb-eufemia/src/components/textarea/Textarea.tsx#L545) (3), [Tabs.tsx](packages/dnb-eufemia/src/components/tabs/Tabs.tsx#L1139)/[TabsContentWrapper.tsx](packages/dnb-eufemia/src/components/tabs/TabsContentWrapper.tsx#L110), [PaymentCard.tsx](packages/dnb-eufemia/src/extensions/payment-card/PaymentCard.tsx#L178).

### Phase 6 — Delete the helper
- [ ] Confirm zero non-test references: `grep -rE 'validateDOMAttributes' packages/dnb-eufemia/src | grep -v __tests__` returns nothing.
- [ ] Remove `validateDOMAttributes` (and the now-unused `startsWithCamelCaseRegex` / `notOnlyAZOrHyphenRegex` if not used elsewhere) from [component-helper.ts](packages/dnb-eufemia/src/shared/component-helper.ts#L44).
- [ ] Remove/relocate its unit tests in [component-helper.test.tsx](packages/dnb-eufemia/src/shared/__tests__/component-helper.test.tsx#L262); ensure equivalent behavior is covered on the replacement.

### Phase 7 — Final verification
- [ ] Type-check, ESLint, Prettier (workspace Yarn).
- [ ] Full unit suite + screenshot/visual-regression suite green.
- [ ] `bundlewatch` within limits.

## 6. Call-site inventory (52 files / 73 calls)

By first argument: `props`/`ownProps`/`allProps`/`restProps`/`localProps`/`restOwnProps`/`contextWithoutDataRest` = 51 · `null` = 17 · `{}` = 5. Return value captured in 25 sites; the rest rely on in-place mutation (a migration hazard — verify each).

Multi-call files: `drawer-list/DrawerList.tsx` (4), `dropdown/Dropdown.tsx` (4), `textarea/Textarea.tsx` (3), `input/Input.tsx` (3), `date-picker/DatePicker.tsx` (3), `autocomplete/Autocomplete.tsx` (3), `accordion/AccordionContent.tsx` (3), `icon/Icon.tsx` (2), `form-status/FormStatus.tsx` (2), `date-picker/DatePickerInput.tsx` (2). The remaining 42 files have 1 call each.

> Regenerate the live list with:
> ```bash
> grep -rE 'validateDOMAttributes\(' packages/dnb-eufemia/src --include='*.ts*' \
>   | grep -v __tests__ | grep -vE 'import|validateDOMAttributes,$'
> ```

## 7. Risks & guardrails

- **Spacing leak at non-`useSpacing` sites (the real one):** form-control `<input>`s (Checkbox/Radio/Switch), Badge, TableContainer — see §4a. `removeSpaceProps` fully covers these (`noCollapse` isn't a component prop); **capture its return value**. ✅ Contract tests in place for the form controls.
- **In-place mutation vs. return:** ~48 sites mutate `params`; 25 capture the return. `removeSpaceProps` returns a new object — assign it back, or the strip silently no-ops.
- **Public `attributes` prop:** preserve in the §4 components, including the prototype-pollution guard.
- **Visual regression:** DOM structure and `dnb-` classes must be unchanged — lean on the screenshot suite.
- **No changelog edits** (per `AGENTS.md`; humans write those).
- **Do not push** until reviewed; never commit to `main`.

## 8. Definition of done
- `validateDOMAttributes` no longer exists in `src` and the package builds, type-checks, and passes all suites.
- No public API change; `attributes` prop still works where documented.
- Contributor docs teach the replacement pattern.
