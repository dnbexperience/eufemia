---
title: 'v11'
description: 'April 21, 2026'
version: 11.0.3
generatedAt: 2026-04-28T21:06:10.983Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# v11

This is the migration guide for @dnb/eufemia v11. It covers all breaking changes, removals, and required code updates.

> **Start here →** Follow the [Step-by-step migration procedure](#step-by-step-migration-procedure) for a structured, phase-by-phase migration workflow covering all 8 phases. The reference sections below provide details for each step.

**How to use this guide:** Start with the [Step-by-step migration procedure](#step-by-step-migration-procedure) for the ordered workflow. Reference the [per-component sections](#components) to find individual property renames for a specific component. Check [Silent failures TypeScript won't catch](#silent-failures-typescript-wont-catch) after applying changes.

> **Using AI to migrate?** Set up the [Eufemia MCP server](/uilib/usage/first-steps/tools/#ai-assistance-and-mcp-server-beta) to give your AI agent access to the full v11 API documentation alongside this migration guide.

**Most changes fall into these categories:**

1. **snake_case → camelCase renames** — The majority of changes are mechanical property, event, and translation key renames. These can be [automated](#automated-migration-snake_case-to-camelcase).
2. **React 19 alignment** — `innerRef` → `ref`, `Context.Provider` → `Context`, and related updates.
3. **Behavioral changes and removals** — API redesigns, removed features, and changed defaults. These require manual review.

<Accordion title="Table of contents">

- [Summary of changes](#summary-of-changes)
- [v10 support timeline](#v10-support-timeline)
- [Install](#install)
- [Migration](#migration)
  - [Automated migration: snake_case to camelCase](#automated-migration-snake_case-to-camelcase)
  - [Migration effort levels](#migration-effort-levels)
  - [Semantic renames (not just casing)](#semantic-renames-not-just-casing)
  - [Import path changes](#import-path-changes)
  - [Common migration mistakes](#common-migration-mistakes)
  - [Cross-component prop patterns](#cross-component-prop-patterns)
  - [Step-by-step migration procedure](#step-by-step-migration-procedure)
  - [Find-and-replace safety guide](#find-and-replace-safety-guide)
  - [Verifying your migration](#verifying-your-migration)
  - [Silent failures TypeScript won't catch](#silent-failures-typescript-wont-catch)
  - [Complete migration example](#complete-migration-example)
  - [innerRef → ref](#innerref--ref)
  - [Context.Provider → Context](#contextprovider--context)
  - [Theme.Provider → Theme.Context](#themeprovider--themecontext)
  - [Theme propMapping removed](#theme-propmapping-removed)
  - [Theme darkMode → colorScheme](#theme-darkmode--colorscheme)
- [Components](#components)
  - [labelDirection default changed to vertical](#labeldirection-default-changed-to-vertical)
  - [Section](#section)
  - [HelpButton](#helpbutton)
  - [Autocomplete](#autocomplete)
  - [Dropdown](#dropdown)
  - [DrawerList](#drawerlist)
  - [Anchor](#anchor)
  - [Input](#input)
  - [InputMasked](#inputmasked)
  - [FormLabel](#formlabel)
  - [Radio](#radio)
  - [Textarea](#textarea)
  - [Accordion](#accordion)
  - [Tag](#tag)
  - [Upload](#upload)
  - [Stat](#stat)
  - [P (paragraph)](#p)
  - [Definition lists](#definition-lists)
  - [Breadcrumb](#breadcrumb)
  - [ProgressIndicator](#progressindicator)
  - [PaymentCard](#paymentcard)
  - [Divider (Horizontal Rule)](#divider-horizontal-rule)
  - [Flex.Item](#flexitem)
  - [Card](#card)
  - [Checkbox](#checkbox)
  - [Switch](#switch)
  - [Logo](#logo)
  - [Icon](#icon)
  - [Button](#button)
  - [Modal, Dialog and Drawer](#modal-dialog-and-drawer)
  - [Heading](#heading)
  - [H (heading elements)](#h-heading-elements)
  - [Table](#table)
  - [FormStatus](#formstatus)
  - [Skeleton](#skeleton)
  - [Tabs](#tabs)
  - [Pagination](#pagination)
  - [Slider](#slider)
  - [Timeline](#timeline)
  - [DatePicker](#datepicker)
  - [NumberFormat](#numberformat)
  - [StepIndicator](#stepindicator)
  - [GlobalError](#globalerror)
  - [ToggleButton](#togglebutton)
  - [Tooltip](#tooltip)
  - [GlobalStatus](#globalstatus)
  - [CopyOnClick](#copyonclick)
- [Layout](#layout)
- [Helpers](#helpers)
- [Eufemia Forms](#eufemia-forms)
- [SCSS mixin renames](#scss-mixin-renames)
- [SCSS: @import → @use](#scss-import--use)
- [TypeScript](#typescript)
- [Theming](#theming)
- [Props Type Exports](#props-type-exports)
- [New in v11](#new-in-v11)

</Accordion>

## Summary of changes

- **React 19 required** — v11 requires React and React DOM v19.
- **IE and Edge (EdgeHTML) no longer supported** — All IE- and legacy-Edge-specific CSS rules have been removed from the CSS reset and component styles. Only modern evergreen browsers (Chrome, Firefox, Safari, Chromium-based Edge) are supported.
- All **snake_case** (`on_click`) events and properties have been converted to **camelCase** (`onClick`). The reason for previously using snake_case was to support Web Components – but the support was discontinued in [v10](/uilib/about-the-lib/releases/eufemia/v10-info/).
- **`labelDirection` default changed to `vertical`** — Labels render above the input by default. If you relied on horizontal labels, set `labelDirection="horizontal"` explicitly. See [labelDirection](#labeldirection-default-changed-to-vertical).
- **FormRow and FormSet removed** — Replace with Flex layout components. See [Removal of FormRow and FormSet](#removal-of-formrow-and-formset).
- **InputMasked engine replaced** — Switched from text-mask to Maskito. Custom masks using `createNumberMask` or `emailMask` must be updated. See [InputMasked](#inputmasked).
- **Logo API redesigned** — The `brand`/`variant` props are replaced with an `svg` prop import pattern. See [Logo](#logo).
- **StepIndicator redesigned** — The sidebar mode has been removed. See [StepIndicator](#stepindicator).
- **Ajv no longer auto-instantiated** — Ajv is still a dependency, but is no longer automatically instantiated. If you use JSON Schema validation, you must explicitly create and provide an Ajv instance. See [Ajv no longer auto-instantiated](#ajv-no-longer-auto-instantiated).
- **Dropdown `actionMenu`/`moreMenu` removed** — The `actionMenu` and `moreMenu` props on Dropdown have been removed. Use the new [Menu](/uilib/components/menu/) component instead.
- **NumberFormat split into variants** — The generic `<NumberFormat />` component and `format()` utility have been removed. Use variant sub-components like `<NumberFormat.Number />`, `<NumberFormat.Currency />`, etc. See [NumberFormat](#numberformat).
- **`date-fns` upgraded from v2 to v4** — If you import `date-fns` functions directly (e.g. for DatePicker's `locale` prop), update your imports to use named exports. See [DatePicker](#datepicker).
- Replaced deprecated `<Context.Provider>` with direct `<Context>` rendering across all internal context providers (React 19).
- Several exported TypeScript `interface` declarations have been converted to `type`. This prevents declaration merging but has no impact on standard usage.
- All React context value types have been renamed to use a consistent `...ContextValue` suffix (e.g. `AccordionContextProps` → `AccordionContextValue`). See [TypeScript](#typescript) for the full list.
- Event handler and render function prop types have been replaced with properly typed signatures (e.g. `(...args: any[]) => any` → `(event: AccordionChangeEvent) => void`). See [Typed event handlers](#typed-event-handlers) for the full list.

## New in v11

These components are new in v11:

- **[Menu](/uilib/components/menu/)** — A context menu component that replaces Dropdown's `actionMenu` and `moreMenu` props. Supports `Menu.Button`, `Menu.List`, `Menu.Action`, `Menu.Accordion`, `Menu.Header`, and `Menu.Divider` sub-components.
- **[List](/uilib/components/list/)** — A layout component for displaying structured lists with support for icons, titles, content, and accordion behavior.

## v10 support timeline

After the v11 release, **v10 will continue to receive critical bug fixes and security patches for 6 months**. During this period:

- **Critical bugs** and **security vulnerabilities** will be patched in v10.
- **New features** will only be added to v11.
- **Non-critical bug fixes** will only target v11.

After the 6-month window, v10 will no longer receive updates. We recommend starting your migration early to avoid last-minute pressure.

## Install

To upgrade to @dnb/eufemia v11 with NPM, use:

```bash
$ npm i @dnb/eufemia@11
# or
$ yarn add @dnb/eufemia@11
# or
$ pnpm add @dnb/eufemia@11
```

## Migration

v11 of @dnb/eufemia contains _breaking changes_.

> Important: Upgrading to v11 requires React and React DOM v19 ([React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)).

### Automated migration: snake_case to camelCase

The largest category of changes in v11 is the rename of **all snake_case properties, events, and translation keys to camelCase**. This affects every component and can be automated.

**The pattern:**

- Properties: `selected_key` → `selectedKey`, `label_direction` → `labelDirection`
- Events: `on_change` → `onChange`, `on_click` → `onClick`
- Translations: `Autocomplete.no_options` → `Autocomplete.noOptions`

You can use your editor's find-and-replace to handle most of these. Since each snake_case property maps to a specific camelCase name, we recommend using the per-component lists below rather than a generic regex.

> **Note:** Some renames are not just snake_case conversions — they also change the name itself (e.g. `triangle_position` → `arrowPosition`, `opened` → `open`, `on_show` → `onOpen`). These are listed individually per component below and require manual attention.

The rest of this section covers changes that **cannot** be automated with a simple find-and-replace and need manual review.

### Migration effort levels

To help plan your migration, changes are grouped by effort:

**Automated** (find-and-replace):

- All snake_case → camelCase property, event, and translation key renames
- `innerRef` → `ref`
- `<Context.Provider>` → `<Context>`

**Semi-automated** (value renames — find-and-replace with care):

- Status value `'info'` → `'information'` (applies to `state`, `statusState`, `variant`, `confirmType`)
- Status value `'warn'` → `'warning'` (applies to `statusState`)
- `opened` → `open` on Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date
- `on_show` → `onOpen` and `on_hide` → `onClose` on Autocomplete, Dropdown, DrawerList, DatePicker
- `prerender` → `keepInDOM` on Tabs, Accordion
- `styleType` / `style_type` → `backgroundColor` on Breadcrumb, Dialog.Body, Drawer.Body

**Manual review required:**

- InputMasked masking engine replacement (text-mask → Maskito)
- StepIndicator redesign (sidebar variant removed)
- DatePicker behavioral changes (segment elements, format strings, focus events)
- Logo API redesign (`brand`/`variant` → `svg` prop)
- Ajv no longer auto-instantiated
- FormRow and FormSet removal
- Card visual changes (outline, border-radius, default innerSpace)
- Button `variant="signal"` removal

### Semantic renames (not just casing)

These renames change the property or event name itself, not just the casing. They affect multiple components and require targeted find-and-replace:

| Old                                     | New                                    | Affected components                                                 |
| --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `innerRef`                              | `ref`                                  | 20+ components (see [innerRef → ref](#innerref--ref))               |
| `opened`                                | `open`                                 | Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date |
| `on_show` / `on_hide`                   | `onOpen` / `onClose`                   | Autocomplete, Dropdown, DrawerList, DatePicker                      |
| `on_show_focus` / `on_hide_focus`       | `onOpenFocus` / `onCloseFocus`         | Dropdown                                                            |
| `triangle_position`                     | `arrowPosition`                        | Autocomplete, Dropdown, DrawerList                                  |
| `styleType` / `style_type`              | `backgroundColor`                      | Breadcrumb, Dialog.Body, Drawer.Body                                |
| `spacing`                               | `innerSpace` (object form)             | Section, Dialog.Body, Drawer.Body                                   |
| `input_class` / `textarea_class`        | `inputClassName` / `textareaClassName` | Input, InputMasked, Textarea                                        |
| `prerender`                             | `keepInDOM`                            | Tabs, Accordion                                                     |
| `as`                                    | `element`                              | H (heading element)                                                 |
| `size`                                  | `span`                                 | Flex.Item, Card                                                     |
| `align_autocomplete` / `align_dropdown` | `align`                                | Autocomplete, Dropdown                                              |
| `input_icon`                            | `icon`                                 | Autocomplete                                                        |
| `clear`                                 | `showClearButton`                      | Input, InputMasked                                                  |
| `visible`                               | `show`                                 | ProgressIndicator                                                   |
| `show_label`                            | `showDefaultLabel`                     | ProgressIndicator                                                   |
| `active` / `forceOpen`                  | `open`                                 | Tooltip                                                             |
| `position`                              | `placement`                            | Tooltip                                                             |
| `accordion`                             | `mode="accordion"`                     | Table                                                               |
| `onClosed` / `onOpened`                 | `onClose` / `onOpen`                   | Table                                                               |
| `isCollapsed`                           | `collapsed`                            | Breadcrumb                                                          |
| `expandBehaviour`                       | `expandBehavior`                       | Accordion                                                           |
| `class`                                 | `className`                            | ProgressIndicator, Button, Tabs, PaymentCard                        |
| `contentSpacing` / `tabsSpacing`        | `contentInnerSpace` / `tabsInnerSpace` | Tabs                                                                |
| `darkMode`                              | `colorScheme`                          | Theme                                                               |

### Import path changes

All import paths that changed or were removed in v11. Update these before changing component APIs — your app won't compile until these are fixed.

| Old import                                                                  | New import                                                                          | Notes                                         |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------- |
| `@dnb/eufemia/components/input/InputPassword`                               | `import { Field } from '@dnb/eufemia/extensions/forms'` then use `<Field.Password>` | Component moved to Eufemia Forms              |
| `@dnb/eufemia/fragments/drawer-list/DrawerList` (`ItemContent`)             | `@dnb/eufemia/fragments/drawer-list/DrawerListItem` (`ItemContent`)                 | Named export moved                            |
| `@dnb/eufemia/components/form-row/FormRowHelpers` (`includeValidProps`)     | `@dnb/eufemia/shared/helpers/filterValidProps` (`pickFormElementProps`)             | Function moved and renamed                    |
| `@dnb/eufemia/components/form-row/FormRowHelpers` (`prepareFormRowContext`) | `@dnb/eufemia/shared/helpers/filterValidProps` (`prepareFormElementContext`)        | Function moved and renamed                    |
| `@dnb/eufemia/components/input-masked/InputMaskedHooks`                     | `@dnb/eufemia/components/input-masked/hooks`                                        | Path changed                                  |
| `@dnb/eufemia/components/input-masked/addons/createNumberMask`              | **Removed** — use built-in `numberMask` prop                                        | Addon deleted                                 |
| `@dnb/eufemia/components/input-masked/addons/emailMask`                     | **Removed** — use `mask` prop directly                                              | Addon deleted                                 |
| `@dnb/eufemia/components/input` (`inputPropTypes`)                          | **Removed**                                                                         | PropTypes no longer provided                  |
| `@dnb/eufemia/components/button` (`buttonVariantPropType`)                  | **Removed**                                                                         | PropTypes no longer provided                  |
| `style/themes/theme-ui/`                                                    | `style/themes/ui/`                                                                  | Path shortened                                |
| `style/themes/theme-sbanken/`                                               | `style/themes/sbanken/`                                                             | Path shortened                                |
| `style/themes/theme-eiendom/`                                               | `style/themes/eiendom/`                                                             | Path shortened                                |
| `style/themes/theme-carnegie/`                                              | `style/themes/carnegie/`                                                            | Path shortened                                |
| `@dnb/eufemia/components/space/types` (`SectionSpacing`)                    | `@dnb/eufemia/components/space/types` (`InnerSpaceType`)                            | Type renamed                                  |
| `export type { Props }` from any Field/Value/Form module                    | Use component-prefixed name (e.g. `FieldStringProps`)                               | See [Props Type Exports](#props-type-exports) |
| `@dnb/eufemia/extensions/payment-card/utils/Types`                          | `@dnb/eufemia/extensions/payment-card/utils/types`                                  | Filename lowercased for consistency           |

### Common migration mistakes

These changes look simple but are easy to get wrong. Pay special attention to these:

#### `spacing` → `innerSpace` requires an object, not a string

The `spacing` prop accepted a string like `"large"`. The replacement `innerSpace` requires an **object with a `block` key** to match the same vertical-only padding behavior. Using `innerSpace="large"` (plain string) applies padding on **all four sides**, which will break your layout.

**Wrong:**

```tsx
<Section innerSpace="large">Content</Section>
```

**Correct:**

```tsx
<Section innerSpace={{ block: 'large' }}>Content</Section>
```

This applies to Section, Dialog.Body, and Drawer.Body.

#### `on_show` / `on_hide` → `onOpen` / `onClose` is NOT just a casing change

The event names changed semantically. A naive snake_case→camelCase conversion would produce `onShow` / `onHide`, which are **wrong**.

| Old             | Wrong (naive conversion) | Correct        |
| --------------- | ------------------------ | -------------- |
| `on_show`       | ~~`onShow`~~             | `onOpen`       |
| `on_hide`       | ~~`onHide`~~             | `onClose`      |
| `on_show_focus` | ~~`onShowFocus`~~        | `onOpenFocus`  |
| `on_hide_focus` | ~~`onHideFocus`~~        | `onCloseFocus` |

Affected components: Autocomplete, Dropdown, DrawerList, DatePicker. The `_focus` variants only apply to Dropdown.

Note: GlobalStatus still uses `onShow` / `onHide` — those are correct for that component and did not change semantically.

#### Component-specific props — don't apply globally

These renames only apply to specific components. Do not find-and-replace them across the entire codebase:

| Rename                           | Only applies to             | Do NOT apply to                              |
| -------------------------------- | --------------------------- | -------------------------------------------- |
| `clear` → `showClearButton`      | Input, InputMasked          | —                                            |
| `isCollapsed` → `collapsed`      | Breadcrumb                  | —                                            |
| `input_icon` → `icon`            | Autocomplete                | Other components that already have `icon`    |
| `visible` → `show`               | ProgressIndicator           | Other components with `visible` prop         |
| `position` → `placement`         | Tooltip                     | Other components with `position` prop        |
| `children` → `label`             | Checkbox, ProgressIndicator | —                                            |
| `as` → `element`                 | H (heading element)         | —                                            |
| `accordion` → `mode="accordion"` | Table                       | Accordion component itself                   |
| `size` → `span`                  | Flex.Item, Card             | Other components where `size` is still valid |

#### `FormRow` / `FormSet` references in context providers

When replacing `FormRow`, be careful not to just rename the JSX tag. The context provider pattern also changed:

| Old                             | New            |
| ------------------------------- | -------------- |
| `FormRow=` (in Provider config) | `formElement=` |
| `FormRow:` (in context objects) | `formElement:` |

### Cross-component prop patterns

These snake_case props appear on many components and follow the same rename pattern everywhere. Apply these as global find-and-replace within Eufemia component JSX:

| Old prop              | New prop            | Components that use it                                                                                                                                          |
| --------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status_state`        | `statusState`       | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Slider, StepIndicator, Switch, Textarea, ToggleButton, ToggleButton.Group |
| `status_props`        | `statusProps`       | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group                        |
| `status_no_animation` | `statusNoAnimation` | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio, Radio.Group, Switch, Textarea, ToggleButton, ToggleButton.Group                        |
| `label_direction`     | `labelDirection`    | Autocomplete, DatePicker, Dropdown, FormLabel, Input, InputMasked, ProgressIndicator, Radio.Group, Slider, Textarea, ToggleButton, ToggleButton.Group           |
| `label_sr_only`       | `labelSrOnly`       | Autocomplete, Checkbox, DatePicker, Dropdown, Input, InputMasked, Radio.Group, Switch, Textarea, ToggleButton.Group                                             |
| `label_position`      | `labelPosition`     | Checkbox, Radio, Switch                                                                                                                                         |
| `icon_size`           | `iconSize`          | Autocomplete, Button, GlobalStatus, ProgressIndicator, ToggleButton                                                                                             |
| `icon_position`       | `iconPosition`      | Autocomplete, Button, Dropdown, ToggleButton                                                                                                                    |
| `no_animation`        | `noAnimation`       | Autocomplete, DatePicker, Dropdown, DrawerList, FormStatus, GlobalStatus, Modal/Dialog/Drawer, Skeleton, StepIndicator                                          |
| `on_change`           | `onChange`          | Nearly all interactive components                                                                                                                               |
| `on_focus`            | `onFocus`           | Autocomplete, Input, Textarea                                                                                                                                   |
| `on_blur`             | `onBlur`            | Autocomplete, Input, Textarea                                                                                                                                   |
| `on_click`            | `onClick`           | Button, StepIndicator, Tabs, Table.ClickableHead                                                                                                                |
| `inner_ref`           | `ref`               | All components that accepted `innerRef` (see [innerRef → ref](#innerref--ref) for the full list)                                                                |

**Status value renames** — apply to all components that accept `statusState` or `state`:

| Old value | New value       |
| --------- | --------------- |
| `'warn'`  | `'warning'`     |
| `'info'`  | `'information'` |

**CSS class renames** — apply wherever these CSS classes are referenced:

| Old CSS class                            | New CSS class                              |
| ---------------------------------------- | ------------------------------------------ |
| `dnb-autocomplete--opened`               | `dnb-autocomplete--open`                   |
| `dnb-dropdown--opened`                   | `dnb-dropdown--open`                       |
| `dnb-drawer-list--opened`                | `dnb-drawer-list--open`                    |
| `dnb-date-picker--opened`                | `dnb-date-picker--open`                    |
| `dnb-progress-indicator--visible`        | `dnb-progress-indicator--show`             |
| `dnb-anchor--contrast`                   | `dnb-anchor--surface-dark`                 |
| `dnb-number-format--selectall`           | `dnb-number-format--select-all`            |
| `dnb-autocomplete__suffixValue`          | `dnb-autocomplete__suffix-value`           |
| `dnb-height-animation__compensateForGap` | `dnb-height-animation__compensate-for-gap` |

### Step-by-step migration procedure

Follow these steps **in order**. Steps in Phase 1 are safe to apply as global find-and-replace across your entire codebase. Steps in later phases require scoping or manual review.

#### Phase 1: Global find-and-replace (safe across entire codebase)

These renames only exist as Eufemia prop/event names and won't collide with other libraries:

1. Replace all **snake_case props and events** with their camelCase equivalents. Use the per-component lists in the [Components](#components) section below. The most common ones: `on_change` → `onChange`, `on_click` → `onClick`, `status_state` → `statusState`, `label_direction` → `labelDirection`, `label_sr_only` → `labelSrOnly`, `no_animation` → `noAnimation`, `icon_size` → `iconSize`, `icon_position` → `iconPosition`.
2. Replace `innerRef` with `ref` on all Eufemia components.
3. Replace `<Context.Provider>` with `<Context>` when using Eufemia contexts directly.
4. Replace the status value `'info'` with `'information'` (applies to `state`, `statusState`, `variant`, `confirmType`).
5. Replace the status value `'warn'` with `'warning'` (applies to `statusState`).
6. Replace `input_class` (or `inputClass`) with `inputClassName` on Input and InputMasked.
7. Replace `textarea_class` (or `textareaClass`) with `textareaClassName` on Textarea.

#### Phase 2: Targeted find-and-replace (scope to specific components)

These renames use generic names that exist in non-Eufemia code. Scope your find-and-replace to JSX using the affected component:

8. Replace `opened` with `open` — **only on** Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date.
9. Replace `on_show` with `onOpen` and `on_hide` with `onClose` — **only on** Autocomplete, Dropdown, DrawerList, DatePicker. _(Not just a casing change — the name changed semantically. GlobalStatus still uses `onShow`/`onHide`.)_
10. Replace `triangle_position` with `arrowPosition` — **only on** Autocomplete, Dropdown, DrawerList.
11. Replace `clear` with `showClearButton` — **only on** Input, InputMasked.
12. Replace `isCollapsed` with `collapsed` — **only on** Breadcrumb.
13. Replace `visible` with `show` — **only on** ProgressIndicator.
14. Replace `position` with `placement` — **only on** Tooltip.
15. Replace `children` with `label` — **only on** Checkbox, ProgressIndicator.
16. Replace `active` or `forceOpen` with `open` — **only on** Tooltip.
17. Replace `as` with `element` — **only on** H (heading element).
18. Replace `size` with `span` — **only on** Flex.Item, Card.
19. Replace `input_icon` with `icon` — **only on** Autocomplete.
20. Replace `accordion` with `mode="accordion"` — **only on** Table.
21. Replace `prerender` with `keepInDOM` — **only on** Tabs, Accordion.
22. Replace `styleType` (or `style_type`) with `backgroundColor` — **only on** Breadcrumb, Dialog.Body, Drawer.Body.
23. Replace `contentSpacing` with `contentInnerSpace` and `tabsSpacing` with `tabsInnerSpace` — **only on** Tabs.

#### Phase 3: Structural and visual changes (require code modification or review)

24. **Visual review:** The `labelDirection` default has changed to `vertical`. If your layouts relied on horizontal labels, add `labelDirection="horizontal"` explicitly. See [labelDirection default changed to vertical](#labeldirection-default-changed-to-vertical).
25. **Visual review:** Card outline, border-radius, and default `innerSpace` have changed. Review your Card layouts. See [Card](#card).
26. Replace `spacing` with `innerSpace={{ block: 'value' }}` on Section, Dialog.Body, Drawer.Body. Do NOT use `innerSpace="large"` — it must be an object. See [Section](#section).
27. Replace `Theme.Provider` with `Theme.Context` and `darkBackground` with `surface="dark"`. See [Theme.Provider → Theme.Context](#themeprovider--themecontext).
28. Replace `<FormRow>` with `<Flex.Horizontal align="baseline">` and `<FormRow vertical>` with `<Flex.Vertical>`. Replace `FormRow=` with `formElement=` in Provider config. See [Removal of FormRow and FormSet](#removal-of-formrow-and-formset).
29. Replace `openState="opened"` with `open={true}` and `openState="closed"` with `open={false}` on Modal/Dialog/Drawer.
30. Update `dateFormat` and `returnFormat` strings: `YYYY` → `yyyy`, `DD` → `dd` on DatePicker.
31. Replace `Stat.Amount` with `Stat.Number`, `Stat.Info variant="default"` with `variant="plain"`.
32. Replace Logo `brand`/`variant` props with `svg` prop import pattern. See [Logo](#logo).

#### Phase 4: Import path and module changes

33. Update all changed import paths. See [Import path changes](#import-path-changes).
34. If using Ajv with JSON Schema validation, add `ajvInstance={makeAjvInstance()}` to `Form.Handler`. See [Ajv no longer auto-instantiated](#ajv-no-longer-auto-instantiated).
35. Replace `InputPassword` import with `Field.Password` from Eufemia Forms. See [InputPassword moved to Field.Password](#inputpassword-moved-to-fieldpassword).
36. Replace `StepsLayout` with `Wizard.Container`, `StepsLayout.Step` with `Wizard.Step`, etc.

#### Phase 5: SCSS changes

37. If you import Eufemia SCSS source files with `@import`, replace with `@use` and namespace your calls. See [SCSS: @import → @use](#scss-import--use).
38. Rename all SCSS mixin references to camelCase. See [SCSS mixin renames](#scss-mixin-renames).
39. Remove `extendFocusRing` and `componentReset` SCSS mixin calls — they have been deleted.

#### Phase 6: TypeScript type updates

40. Update any imported context value types (`AccordionContextProps` → `AccordionContextValue`, etc.). See [TypeScript](#typescript).
41. Update any Props type imports (`Props` → component-prefixed name). See [Props Type Exports](#props-type-exports).
42. Update event handler types to match new typed signatures. See [Typed event handlers](#typed-event-handlers).

#### Phase 7: Eufemia Forms behavioral changes

43. Replace `validator` with `onChangeValidator` on all Field components.
44. Replace `continuousValidation` with `validateContinuously` on all Field components.
45. Update `errorMessages` object keys: `required` → `Field.errorRequired`, `pattern` → `Field.errorPattern`, etc. See [Error handling](#error-handling).
46. Replace `Form.useError` with `Form.useValidation`, `Form.useLocale` with `Form.useTranslation`.
47. Replace `Form.Visibility` props: `withValue` → `hasValue`, `pathValue`/`whenValue` → `visibleWhen`.
48. Replace `Form.FieldProps` with `Field.Provider`.
49. Replace `<Card stack>` with `<Form.Card>` and `<Card>` (inside forms) with `<Form.Card>`.
50. Replace `Iterate.ArrayPushButton` with `Iterate.PushButton` and `Iterate.ArrayRemoveElementButton` with `Iterate.RemoveButton`.
51. Replace `requireCommit` with `preventUncommittedChanges` on `Iterate.PushContainer`.
52. Replace `active` with `include` and `activeWhen` with `includeWhen` on `Wizard.Step`.
53. Replace Form.Iterate label variable `{itemNr}` with `{itemNo}`.
54. Review all remaining changes in the [Eufemia Forms](#eufemia-forms) section.

#### Phase 8: Verify

55. Run `npx tsc --noEmit` to catch remaining type errors.
56. Run your tests. Update any test selectors that query DatePicker/Expiry `input` elements (now `role="spinbutton"` sections).
57. Search for remaining snake_case patterns using the grep command in [Verifying your migration](#verifying-your-migration).

### Find-and-replace safety guide

**Safe for global find-and-replace** — these prop names are Eufemia-specific and won't collide with other code:

`on_change`, `on_click`, `on_focus`, `on_blur`, `on_submit`, `on_key_down`, `on_type`, `on_select`, `on_clear`, `on_open`, `on_close`, `on_cancel`, `on_reset`, `on_complete`, `on_resize`, `on_end`, `on_load`, `on_startup`, `on_adjust`, `on_days_render`, `on_submit_focus`, `on_submit_blur`, `status_state`, `status_props`, `status_no_animation`, `label_direction`, `label_sr_only`, `label_position`, `icon_size`, `icon_position`, `no_animation`, `inner_ref`, `selected_key`, `default_value`, `prevent_selection`, `prevent_close`, `keep_open`, `independent_width`, `fixed_position`, `enable_body_lock`, `skip_portal`, `cache_hash`, `no_scroll_animation`, `min_height`, `max_height`, `input_element`, `submit_element`, `submit_button_title`, `submit_button_icon`, `submit_button_variant`, `clear_button_title`, `keep_placeholder`, `input_attributes`, `inner_element`.

> **Note:** `on_state_update` is **not** in this list because it has been removed, not renamed. If you used `on_state_update`, replace it with `onChange` instead.

**Must be scoped to specific components** — these names exist outside Eufemia or overlap across components with different meanings:

| Rename                           | Scope to                                                            | Risk if applied globally                             |
| -------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| `opened` → `open`                | Autocomplete, Dropdown, DrawerList, DatePicker, Tooltip, Field.Date | Collides with HTML `open` attribute on `<details>`   |
| `clear` → `showClearButton`      | Input, InputMasked                                                  | Collides with generic `clear` functions              |
| `visible` → `show`               | ProgressIndicator                                                   | Collides with generic `visible` props                |
| `position` → `placement`         | Tooltip                                                             | Collides with CSS `position` prop/style              |
| `children` → `label`             | Checkbox, ProgressIndicator                                         | `children` is a React universal prop                 |
| `as` → `element`                 | H (heading element)                                                 | `as` is used by styled-components and other libs     |
| `size` → `span`                  | Flex.Item, Card                                                     | `size` is used by many non-Eufemia components        |
| `active` → `open`                | Tooltip                                                             | `active` is a common generic prop                    |
| `accordion` → `mode="accordion"` | Table                                                               | Prop-to-prop+value change, not a simple rename       |
| `input_icon` → `icon`            | Autocomplete                                                        | Other components already have different `icon` props |
| `spacing` → `innerSpace`         | Section, Dialog.Body, Drawer.Body                                   | Requires object form `{ block: '...' }`, not string  |
| `on_show` → `onOpen`             | Autocomplete, Dropdown, DrawerList, DatePicker                      | Semantic change; GlobalStatus keeps `onShow`         |
| `on_hide` → `onClose`            | Autocomplete, Dropdown, DrawerList, DatePicker                      | Semantic change; GlobalStatus keeps `onHide`         |

### Verifying your migration

After applying changes, use these commands to validate:

**TypeScript check** — catches missed renames, wrong prop types, and removed APIs:

```bash
npx tsc --noEmit
```

**Search for remaining snake_case** — catches props you missed:

```bash
grep -rn 'on_\|status_\|label_\|icon_\|_class\b\|inner_ref\|_state\|_position\|_button\|_text\|_sr_' \
  --include='*.tsx' --include='*.ts' src/
```

> **Note:** This grep only catches snake_case patterns. Semantic renames like `opened` → `open`, `prerender` → `keepInDOM`, `clear` → `showClearButton`, and `expandBehaviour` → `expandBehavior` require manual review using the [Semantic renames](#semantic-renames-not-just-casing) table.

**Common TypeScript errors and what they mean:**

| Error                                                             | Cause                                | Fix                                                       |
| ----------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------- |
| `Property 'on_change' does not exist`                             | Missed snake_case → camelCase rename | Replace with `onChange`                                   |
| `Property 'innerRef' does not exist`                              | Missed innerRef → ref                | Replace with `ref`                                        |
| `Type '"info"' is not assignable`                                 | Missed status value rename           | Replace `'info'` with `'information'`                     |
| `Type '"warn"' is not assignable`                                 | Missed status value rename           | Replace `'warn'` with `'warning'`                         |
| `Module not found: '@dnb/eufemia/components/input/InputPassword'` | Import path moved                    | Use `Field.Password` from `@dnb/eufemia/extensions/forms` |
| `Property 'spacing' does not exist`                               | Removed prop                         | Replace with `innerSpace={{ block: 'value' }}`            |
| `Property 'brand' does not exist` on Logo                         | Logo API redesigned                  | Import SVG component and use `svg` prop                   |
| `Type '"signal"' is not assignable` on Button                     | Variant removed                      | Use `variant="primary"` or `variant="secondary"`          |
| `Cannot find name 'FormRow'`                                      | Component removed                    | Replace with `Flex.Horizontal` or `Flex.Vertical`         |
| `Property 'opened' does not exist`                                | Prop renamed                         | Replace with `open`                                       |

### Silent failures TypeScript won't catch

TypeScript catches most v10 → v11 errors, but these three categories **compile without errors and fail silently at runtime**. You must search for them manually after migration.

#### 1. Data object property renames

Dropdown, Autocomplete, DrawerList, and Field.Selection accept `data` arrays with objects. The `DrawerListDataArrayObject` type allows arbitrary keys (`[key: string]: any`), so TypeScript **will not flag** old snake_case property names. The component simply won't find the values it expects.

**Compiles but broken:**

```tsx
<Dropdown
  data={[
    { selected_key: 'no', content: 'Norway' }, // silent failure
    { selected_key: 'se', content: 'Sweden' }, // silent failure
  ]}
/>
```

**Correct:**

```tsx
<Dropdown
  data={[
    { selectedKey: 'no', content: 'Norway' },
    { selectedKey: 'se', content: 'Sweden' },
  ]}
/>
```

Search for old data property names:

```bash
grep -rn 'selected_key\|selected_value\|suffix_value\|search_content\|class_name' \
  --include='*.tsx' --include='*.ts' src/
```

#### 2. Event callback return object renames

Several components renamed properties on the objects passed to event callbacks. If you destructure the old property names, the values will be `undefined` at runtime with no TypeScript error (because callback parameter types are often inferred loosely).

**DatePicker `onChange` return object:**

| Old property          | New property       |
| --------------------- | ------------------ |
| `days_between`        | `daysBetween`      |
| `is_valid`            | `isValid`          |
| `is_valid_start_date` | `isValidStartDate` |
| `is_valid_end_date`   | `isValidEndDate`   |

**Field.Date `onType` return object:**

| Old property | New property |
| ------------ | ------------ |
| `start_date` | `startDate`  |
| `end_date`   | `endDate`    |
| `is_valid`   | `isValid`    |

Search for old callback property access:

```bash
grep -rn 'days_between\|is_valid\|is_valid_start_date\|is_valid_end_date\|start_date\|end_date' \
  --include='*.tsx' --include='*.ts' src/
```

#### 3. CSS class selectors in strings and tests

CSS class names used in `querySelector`, test assertions, or CSS/SCSS files are plain strings that TypeScript cannot validate.

Search for all renamed CSS classes:

```bash
grep -rn 'dnb-autocomplete--opened\|dnb-dropdown--opened\|dnb-drawer-list--opened\|dnb-date-picker--opened\|dnb-progress-indicator--visible\|dnb-anchor--contrast\|dnb-number-format--selectall\|dnb-section--spacing' \
  --include='*.tsx' --include='*.ts' --include='*.scss' --include='*.css' src/
```

Also check DatePicker/Expiry test selectors — the visible date segments changed from native `input` elements to `role="spinbutton"` sections:

```tsx
// Before (v10) — queried native input elements
document.querySelector('.dnb-date-picker input')

// After (v11) — use role-based selectors
document.querySelector('[role="spinbutton"]')
// or
document.querySelector('.dnb-segmented-field__section')
```

#### 4. Theme `darkMode` prop silently ignored

The `darkMode` prop on `Theme` was replaced with `colorScheme`. Passing `darkMode` compiles without error but is silently ignored. The CSS class also changed from `eufemia-theme__dark-mode` to `eufemia-theme__color-scheme--dark`.

Search for old usage:

```bash
grep -rn 'darkMode\|eufemia-theme__dark-mode' \
  --include='*.tsx' --include='*.ts' --include='*.scss' --include='*.css' src/
```

#### 5. Provider `locales` prop silently ignored

The `locales` prop on `Provider` and `Context` was removed in favor of `translations`. Passing `locales` compiles without error but is silently ignored, meaning your custom translations will not be applied.

Search for old usage:

```bash
grep -rn 'locales=' --include='*.tsx' --include='*.ts' src/
```

### Complete migration example

This example shows a realistic v10 component migrated to v11, combining multiple change categories:

**Before (v10):**

```tsx
import {
  Input,
  Dropdown,
  DatePicker,
  Section,
  Button,
  FormRow,
} from '@dnb/eufemia'
import { Provider } from '@dnb/eufemia/shared'

function MyForm({ formRef }) {
  return (
    <Provider FormRow={{ label_direction: 'vertical' }}>
      <Section spacing="large" style_type="white">
        <FormRow>
          <Input
            label="Name"
            on_change={({ value }) => console.log(value)}
            status="Error message"
            status_state="error"
            innerRef={formRef}
          />
          <Dropdown
            label="Country"
            selected_key="no"
            on_change={({ data }) => console.log(data)}
            opened={false}
            on_show={() => console.log('opened')}
            on_hide={() => console.log('closed')}
            triangle_position="left"
            data={[
              { selected_key: 'no', content: 'Norway' },
              { selected_key: 'se', content: 'Sweden' },
            ]}
          />
          <DatePicker
            label="Start date"
            date_format="YYYY/MM/DD"
            return_format="YYYY-MM-DD"
            on_change={({ date }) => console.log(date)}
            on_show={() => console.log('shown')}
            on_hide={() => console.log('hidden')}
          />
        </FormRow>
        <Button variant="signal" on_click={() => console.log('submit')}>
          Submit
        </Button>
      </Section>
    </Provider>
  )
}
```

**After (v11):**

```tsx
import {
  Input,
  Dropdown,
  Flex,
  DatePicker,
  Section,
  Button,
} from '@dnb/eufemia'
import { Provider } from '@dnb/eufemia/shared'

function MyForm({ formRef }) {
  return (
    <Provider formElement={{ labelDirection: 'vertical' }}>
      <Section innerSpace={{ block: 'large' }} backgroundColor="white">
        <Flex.Horizontal align="baseline">
          <Input
            label="Name"
            onChange={({ value }) => console.log(value)}
            status="Error message"
            statusState="error"
            ref={formRef}
          />
          <Dropdown
            label="Country"
            selectedKey="no"
            onChange={({ data }) => console.log(data)}
            open={false}
            onOpen={() => console.log('opened')}
            onClose={() => console.log('closed')}
            arrowPosition="left"
            data={[
              { selectedKey: 'no', content: 'Norway' },
              { selectedKey: 'se', content: 'Sweden' },
            ]}
          />
          <DatePicker
            label="Start date"
            dateFormat="yyyy/MM/dd"
            returnFormat="yyyy-MM-dd"
            onChange={({ date }) => console.log(date)}
            onOpen={() => console.log('shown')}
            onClose={() => console.log('hidden')}
          />
        </Flex.Horizontal>
        <Button variant="primary" onClick={() => console.log('submit')}>
          Submit
        </Button>
      </Section>
    </Provider>
  )
}
```

**What changed (13 categories in one component):**

1. `FormRow` → `Flex.Horizontal align="baseline"` (removed component)
2. `FormRow={{ label_direction: 'vertical' }}` → `formElement={{ labelDirection: 'vertical' }}` (Provider config)
3. `spacing="large"` → `innerSpace={{ block: 'large' }}` (structural change — object required)
4. `style_type="white"` → `backgroundColor="white"` (semantic rename)
5. `on_change` / `on_click` → `onChange` / `onClick` (snake_case → camelCase)
6. `status_state` → `statusState` (snake_case → camelCase)
7. `innerRef` → `ref` (React 19)
8. `selected_key` → `selectedKey` (snake_case → camelCase, in both props and data objects)
9. `opened` → `open` (semantic rename)
10. `on_show` / `on_hide` → `onOpen` / `onClose` (semantic rename — NOT `onShow`/`onHide`)
11. `triangle_position` → `arrowPosition` (semantic rename)
12. `date_format="YYYY/MM/DD"` → `dateFormat="yyyy/MM/dd"` (casing + format string change)
13. `variant="signal"` → `variant="primary"` (removed variant)

### innerRef → ref

React 19 passes `ref` as a regular prop, making `forwardRef` and custom `innerRef` patterns unnecessary. All Eufemia components that previously accepted an `innerRef` prop now accept `ref` directly.

**Before:**

```tsx
<Input innerRef={myRef} />
<Button innerRef={myRef} />
<Element innerRef={myRef} />
```

**After:**

```tsx
<Input ref={myRef} />
<Button ref={myRef} />
<Element ref={myRef} />
```

Affected components: `Anchor`, `Button`, `Checkbox`, `Dropdown`, `Element`, `FormLabel`, `HeightAnimation`, `Input`, `InputMasked`, `PortalRoot`, `Radio`, `ScrollView`, `Section`, `Space`, `Switch`, `Textarea`, `Typography`, `Flex.Item`, `Flex.Container`, `Field.String`, `Field.Number`, `Field.Password`, `Field.PhoneNumber`, `Form.Element`, and all Element wrappers (`Div`, `Span`, `Code`, etc.).

### Context.Provider → Context

React 19 deprecates `<Context.Provider>`. You can now render `<Context>` directly as a provider. All internal Eufemia context providers have been updated to use this pattern.

If you use any Eufemia context objects directly (e.g. `Wizard.Provider`), update your code:

**Before:**

```tsx
<SomeContext.Provider value={value}>{children}</SomeContext.Provider>
```

**After:**

```tsx
<SomeContext value={value}>{children}</SomeContext>
```

### Theme.Provider → Theme.Context

`Theme.Provider` has been renamed to `Theme.Context` to align with React 19's context-as-provider pattern. The `darkBackground` prop has been removed in favor of `surface="dark"`:

**Before:**

```tsx
<Theme.Provider darkBackground>
  <Button>Primary</Button>
</Theme.Provider>
```

**After:**

```tsx
<Theme.Context surface="dark">
  <Button>Primary</Button>
</Theme.Context>
```

`Theme.Provider` has been removed.

### Theme `propMapping` removed

The `propMapping` prop has been removed from the `Theme` component. If you relied on it, use CSS custom properties directly on your theme wrapper instead.

### Theme `darkMode` → `colorScheme`

The `darkMode` prop on the `Theme` component has been replaced with `colorScheme`, which accepts `'auto'`, `'light'`, or `'dark'`. The CSS class `eufemia-theme__dark-mode` has been renamed to `eufemia-theme__color-scheme--dark` (or `--light`).

**Before:**

```tsx
<Theme darkMode>
  <MyApp />
</Theme>
```

**After:**

```tsx
<Theme colorScheme="dark">
  <MyApp />
</Theme>
```

> **Note:** This is a silent failure — passing `darkMode` will not cause a TypeScript error but the prop will be ignored.

## Components

> Each component section below lists its changes. Behavioral changes and removals are called out separately where applicable. The bulk of per-component changes are snake_case → camelCase renames covered by the [automated migration](#automated-migration-snake_case-to-camelcase) section above.
>
> **Reading the per-component lists:** Entries like `on_change` → `onChange` are **JSX prop renames** (apply in your component markup). Entries prefixed with the component name and a dot, like `Autocomplete.no_options` → `Autocomplete.noOptions`, are **translation key renames** — these appear in locale/Provider configuration objects, not as JSX attributes. Do not add them as JSX props.

### labelDirection default changed to `vertical`

The `labelDirection` prop now defaults to `vertical` instead of `horizontal` on all basis form components. This means labels are rendered above the input by default. If you relied on the horizontal default, explicitly set `labelDirection="horizontal"`.

Affected components: `Input`, `InputMasked`, `Textarea`, `Autocomplete`, `Dropdown`, `DatePicker`, `Slider`, `ProgressIndicator`, `ToggleButton`, `ToggleButton.Group`, `Radio.Group`, `FormLabel`.

If you used `<Provider formElement={{ labelDirection: 'vertical' }}>` or `labelDirection="vertical"` to achieve vertical labels, you can now remove them.

### [Section](/uilib/components/section/)

1. All deprecated `style_type` variants and their legacy `dnb-section--...` theme classes were removed. Use the `variant` or `backgroundColor` property instead:

- `mint-green-12`
- `mint-green`
- `sea-green`
- `emerald-green`
- `lavender`
- `black-3`
- `sand-yellow`
- `pistachio`
- `fire-red`
- `fire-red-8`

2. Remove `spacing`. Use `innerSpace` instead. The `spacing` prop only applied vertical (top/bottom) padding, so use the `block` shorthand to match the old behavior:

- `spacing` -> `innerSpace={{ block: 'large' }}`
- `spacing="x-small"` -> `innerSpace={{ block: 'x-small' }}`
- `spacing="small"` -> `innerSpace={{ block: 'small' }}`
- `spacing="medium"` -> `innerSpace={{ block: 'medium' }}`
- `spacing="large"` -> `innerSpace={{ block: 'large' }}`
- `spacing="x-large"` -> `innerSpace={{ block: 'x-large' }}`
- `spacing="xx-large"` -> `innerSpace={{ block: 'xx-large' }}`

You can also use `top` and `bottom` individually if you need different values, e.g. `innerSpace={{ top: 'small', bottom: 'large' }}`. Note that `innerSpace="large"` (a plain string) applies padding on **all four sides**, not just top/bottom.

3. Replace `variant`'s value `info` with `information`.

4. Replace `inner_ref` with `ref`.

#### Types

- The exported `SectionSpacing` type has been removed. If you imported it (e.g. for Breadcrumb or custom components), use the `InnerSpaceType` from `@dnb/eufemia/components/space/types` instead.

#### Styling

- Remove CSS classes `dnb-section--spacing`, `dnb-section--spacing-small`, etc, as they are not supported anymore.

### [HelpButton](/uilib/components/help-button/)

#### Translations

- Replace `HelpButton.aria_role` with `HelpButton.ariaRole`.

### [Autocomplete](/uilib/components/autocomplete/)

**Removals and behavioral changes:**

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- Replace `input_icon` with `icon`. The `inputIcon` prop has been removed — use the `icon` prop instead (defaults to `'loupe'`).
- Replace `opened` with `open`.
- Replace `align_autocomplete` with `align`.
- Replace `on_show` with `onOpen` and `on_hide` with `onClose` (not just a casing change — the event names changed).

#### Properties

The following properties have been renamed from snake_case to camelCase:

- Replace `selected_key` with `selectedKey`.
- Replace `default_value` with `defaultValue`.
- Replace `prevent_selection` with `preventSelection`.
- Replace `prevent_close` with `preventClose`.
- Replace `keep_open` with `keepOpen`.
- Replace `independent_width` with `independentWidth`.
- Replace `fixed_position` with `fixedPosition`.
- Replace `enable_body_lock` with `enableBodyLock`.
- Replace `align_drawer` with `alignDrawer`.
- Replace `list_class` with `listClass`.
- Replace `portal_class` with `portalClass`.
- Replace `no_scroll_animation` with `noScrollAnimation`.
- Replace `skip_portal` with `skipPortal`.
- Replace `min_height` with `minHeight`.
- Replace `max_height` with `maxHeight`.
- Replace `observer_element` with `observerElement`.
- Replace `cache_hash` with `cacheHash`.
- Replace `wrapper_element` with `wrapperElement`.
- Replace `options_render` with `optionsRender`.
- Replace `triangle_position` with `arrowPosition`.
- Replace `skip_keysearch` with `skipKeysearch`.
- Replace `page_offset` with `pageOffset`.
- Replace `ignore_events` with `ignoreEvents`.
- Replace `no_animation` with `noAnimation`.
- Replace `label_direction` with `labelDirection`.
- Replace `no_options` with `noOptions`.
- Replace `show_all` with `showAll`.
- Replace `aria_live_options` with `ariaLiveOptions`.
- Replace `indicator_label` with `indicatorLabel`.
- Replace `show_options_sr` with `showOptionsSr`.
- Replace `selected_sr` with `selectedSr`.
- Replace `submit_button_title` with `submitButtonTitle`.
- Replace `submit_button_icon` with `submitButtonIcon`.
- Replace `input_ref` with `inputRef`.
- Replace `icon_size` with `iconSize`.
- Replace `icon_position` with `iconPosition`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `keep_value` with `keepValue`.
- Replace `keep_selection` with `keepSelection`.
- Replace `keep_value_and_selection` with `keepValueAndSelection`.
- Replace `show_clear_button` with `showClearButton`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `disable_filter` with `disableFilter`.
- Replace `disable_reorder` with `disableReorder`.
- Replace `disable_highlighting` with `disableHighlighting`.
- Replace `show_submit_button` with `showSubmitButton`.
- Replace `submit_element` with `submitElement`.
- Replace `input_element` with `inputElement`.
- Replace `search_in_word_index` with `searchInWordIndex`.
- Replace `search_numbers` with `searchNumbers`.
- Replace `input_value` with `inputValue`.
- Replace `open_on_focus` with `openOnFocus`.
- Replace `drawer_class` with `drawerClass`.
- Replace `prevent_focus` with `preventFocus`.
- Removed: `action_menu` / `actionMenu`. Use the new [Menu](/uilib/components/menu/) component instead.
- Replace `is_popup` with `isPopup`.
- Replace `selectall` with `selectAll`.

#### Events

- Replace `on_type` with `onType`.
- Replace `on_focus` with `onFocus`.
- Replace `on_blur` with `onBlur`.
- Replace `on_change` with `onChange`.
- Replace `on_select` with `onSelect`.
- Replace `on_show` with `onOpen`.
- Replace `on_hide` with `onClose`.

#### Translations

- Replace `Autocomplete.no_options` with `Autocomplete.noOptions`.
- Replace `Autocomplete.show_all` with `Autocomplete.showAll`.
- Replace `Autocomplete.aria_live_options` with `Autocomplete.ariaLiveOptions`.
- Replace `Autocomplete.indicator_label` with `Autocomplete.indicatorLabel`.
- Replace `Autocomplete.show_options_sr` with `Autocomplete.showOptionsSr`.
- Replace `Autocomplete.selected_sr` with `Autocomplete.selectedSr`.
- Replace `Autocomplete.submit_button_title` with `Autocomplete.submitButtonTitle`.

#### Styling

- Replace CSS class `dnb-autocomplete--opened` with `dnb-autocomplete--open`.
- Replace CSS class `dnb-autocomplete__suffixValue` with `dnb-autocomplete__suffix-value` (BEM kebab-case fix).

#### TypeScript types

- Replace `AutocompleteClearEvent` with `AutocompleteOnClearParams`.
- Replace `AutocompleteTypeEvent` with `AutocompleteOnTypeParams`.
- Replace `AutocompleteFocusEvent` with `AutocompleteOnFocusParams`.
- Replace `AutocompleteBlurEvent` with `AutocompleteOnBlurParams`.
- Replace `AutocompleteChangeEvent` with `AutocompleteOnChangeParams`.
- Replace `AutocompleteSelectEvent` with `AutocompleteOnSelectParams`.

#### DrawerListDataArrayObject

Data object property renames: `selected_value` → `selectedValue`, `suffix_value` → `suffixValue`, `search_content` → `searchContent`, `class_name` → `className`. See [DrawerList](#drawerlist) for details.

### [Dropdown](/uilib/components/dropdown/)

**Removals and behavioral changes:**

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- The `actionMenu` prop has been removed. Use the new [Menu](/uilib/components/menu/) component instead.
- The `moreMenu` prop has been removed. Use the new [Menu](/uilib/components/menu/) component instead.
- Replace `opened` with `open`.
- Replace `align_dropdown` with `align`.
- Replace `on_show` with `onOpen` and `on_hide` with `onClose` (not just a casing change — the event names changed).

#### Properties

The following properties have been renamed from snake_case to camelCase:

- Replace `selected_key` with `selectedKey`.
- Replace `default_value` with `defaultValue`.
- Replace `prevent_selection` with `preventSelection`.
- Replace `prevent_close` with `preventClose`.
- Replace `keep_open` with `keepOpen`.
- Replace `independent_width` with `independentWidth`.
- Replace `fixed_position` with `fixedPosition`.
- Replace `enable_body_lock` with `enableBodyLock`.
- Replace `align_drawer` with `alignDrawer`.
- Replace `list_class` with `listClass`.
- Replace `portal_class` with `portalClass`.
- Replace `no_scroll_animation` with `noScrollAnimation`.
- Replace `skip_portal` with `skipPortal`.
- Replace `min_height` with `minHeight`.
- Replace `max_height` with `maxHeight`.
- Replace `observer_element` with `observerElement`.
- Replace `cache_hash` with `cacheHash`.
- Replace `wrapper_element` with `wrapperElement`.
- Replace `options_render` with `optionsRender`.
- Replace `triangle_position` with `arrowPosition`.
- Replace `skip_keysearch` with `skipKeysearch`.
- Replace `page_offset` with `pageOffset`.
- Replace `ignore_events` with `ignoreEvents`.
- Replace `no_animation` with `noAnimation`.
- Replace `label_direction` with `labelDirection`.
- Replace `icon_size` with `iconSize`.
- Replace `icon_position` with `iconPosition`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Removed: `more_menu` / `moreMenu`. Use the new [Menu](/uilib/components/menu/) component instead.
- Replace `trigger_element` with `triggerElement`.
- Replace `open_on_focus` with `openOnFocus`.
- Removed: `action_menu` / `actionMenu`. Use the new [Menu](/uilib/components/menu/) component instead.
- Replace `is_popup` with `isPopup`.
- Replace `prevent_focus` with `preventFocus`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_select` with `onSelect`.
- Replace `on_show` with `onOpen`.
- Replace `on_hide` with `onClose`.
- Replace `on_show_focus` with `onOpenFocus`.
- Replace `on_hide_focus` with `onCloseFocus`.

#### Styling

- Replace CSS class `dnb-dropdown--opened` with `dnb-dropdown--open`.

#### DrawerListDataArrayObject

Data object property renames: `selected_value` → `selectedValue`, `suffix_value` → `suffixValue`, `search_content` → `searchContent`, `class_name` → `className`. See [DrawerList](#drawerlist) for details.

### [DrawerList](/uilib/components/fragments/drawer-list/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- Replace type `DrawerListDataObjectUnion` with `DrawerListDataArrayItem`.
- Replace type `DrawerListDataObject` with `DrawerListDataArrayObject`.
- Replace `import { ItemContent } from '@dnb/eufemia/fragments/drawer-list/DrawerList'` with `import { ItemContent } from '@dnb/eufemia/fragments/drawer-list/DrawerListItem'`.
- Replace `selected_key` with `selectedKey`.
- Replace `default_value` with `defaultValue`.
- Replace `prevent_selection` with `preventSelection`.
- Replace `prevent_close` with `preventClose`.
- Replace `keep_open` with `keepOpen`.
- Replace `independent_width` with `independentWidth`.
- Replace `fixed_position` with `fixedPosition`.
- Replace `enable_body_lock` with `enableBodyLock`.
- Replace `align_drawer` with `alignDrawer`.
- Replace `list_class` with `listClass`.
- Replace `portal_class` with `portalClass`.
- Replace `no_scroll_animation` with `noScrollAnimation`.
- Replace `skip_portal` with `skipPortal`.
- Replace `min_height` with `minHeight`.
- Replace `max_height` with `maxHeight`.
- Replace `observer_element` with `observerElement`.
- Replace `cache_hash` with `cacheHash`.
- Replace `wrapper_element` with `wrapperElement`.
- Replace `options_render` with `optionsRender`.
- Replace `triangle_position` with `arrowPosition`.
- Replace `skip_keysearch` with `skipKeysearch`.
- Replace `page_offset` with `pageOffset`.
- Replace `ignore_events` with `ignoreEvents`.
- Replace `no_animation` with `noAnimation`.
- Replace `label_direction` with `labelDirection`.
- Removed: `action_menu` / `actionMenu`. Use the new [Menu](/uilib/components/menu/) component instead.
- Replace `is_popup` with `isPopup`.
- Replace `prevent_focus` with `preventFocus`.
- Replace `opened` with `open`.
- Remove `prepared_data`.

#### Events

- Replace `on_show` with `onOpen`.
- Replace `on_hide` with `onClose`.
- Replace `handle_dismiss_focus` with `handleDismissFocus`.
- Replace `on_change` with `onChange`.
- Replace `on_pre_change` with `onPreChange`.
- Replace `on_resize` with `onResize`.
- Replace `on_select` with `onSelect`.

#### Styling

- Replace CSS class `dnb-drawer-list--opened` with `dnb-drawer-list--open`.

#### DrawerListDataArrayObject

- Replace `selected_value` with `selectedValue`.
- Replace `suffix_value` with `suffixValue`.
- Replace `search_content` with `searchContent`.
- Replace `class_name` with `className`.

### [Anchor](/uilib/components/anchor/)

- When using icons in an Anchor (text link), use the `icon` property instead of inlining it.

#### Properties

- Find and remove `scrollToHashHandler`. Smooth hash scrolling is now supported by all major browsers.
- Replace `inner_ref` with `ref`.

#### Styling

- Replace CSS class `dnb-anchor--contrast` with `dnb-anchor--surface-dark`.

### [Input](/uilib/components/input/)

**Removals:**

- The `inputPropTypes` export has been removed as part of the PropTypes removal. If you were importing it via `import { inputPropTypes } from '@dnb/eufemia/components/input'`, remove the import — runtime prop validation is no longer provided.
- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- Replace `clear` with `showClearButton`.
- Replace `input_class` with `inputClassName` (note the name change, not just casing).

#### Properties

The following properties have been renamed from snake_case to camelCase:

- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `input_state` with `inputState`.
- Replace `submit_button_title` with `submitButtonTitle`.
- Replace `clear_button_title` with `clearButtonTitle`.
- Replace `keep_placeholder` with `keepPlaceholder`.
- Replace `input_attributes` with `inputAttributes`.
- Replace `input_element` with `inputElement`.
- Replace `icon_size` with `iconSize`.
- Replace `icon_position` with `iconPosition`.
- Replace `inner_ref` with `ref`.
- Replace `inner_element` with `innerElement`.
- Replace `submit_element` with `submitElement`.
- Replace `submit_button_variant` with `submitButtonVariant`.
- Replace `submit_button_icon` with `submitButtonIcon`.
- Replace `submit_button_status` with `submitButtonStatus`.
- Replace `selectall` with `selectAll`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_focus` with `onFocus`.
- Replace `on_key_down` with `onKeyDown`.
- Replace `on_blur` with `onBlur`.
- Replace `on_submit` with `onSubmit`.
- Replace `on_submit_focus` with `onSubmitFocus`.
- Replace `on_submit_blur` with `onSubmitBlur`.
- Replace `on_clear` with `onClear`.

#### Translations

- Replace `Input.submit_button_title` with `Input.submitButtonTitle`.
- Replace `Input.clear_button_title` with `Input.clearButtonTitle`.

#### SubmitButton

- Replace `icon_size` with `iconSize`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.

### [InputMasked](/uilib/components/input-masked/)

> **Major change:** The masking engine has been replaced. Read this section carefully.

In v11, the InputMasked component has been rewritten to use [Maskito](https://maskito.dev/) instead of the unmaintained [text-mask](https://github.com/text-mask/text-mask) library. This brings better input handling, improved mobile keyboard support, and more reliable cursor/caret behavior. The public API (`mask`, `numberMask`, `currencyMask`, `asNumber`, `asCurrency`, `asPercent`, etc.) remains the same — the masking engine underneath has changed.

New props added:

- `allowOverflow` – allow typing beyond the defined mask length.
- `overwriteMode` – control how overwriting characters is handled (`shift` or `replace`).

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- Replace `clear` with `showClearButton`.
- Replace `label_direction` with `labelDirection`.
- Replace `number_mask` with `numberMask`.
- Replace `currency_mask` with `currencyMask`.
- Replace `mask_options` with `maskOptions`.
- Replace `number_format` with `numberFormat`.
- Replace `as_currency` with `asCurrency`.
- Replace `as_number` with `asNumber`.
- Replace `as_percent` with `asPercent`.
- Replace `show_mask` with `showMask`.
- Replace `inner_ref` with `ref`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `input_state` with `inputState`.
- Replace `submit_button_title` with `submitButtonTitle`.
- Replace `clear_button_title` with `clearButtonTitle`.
- Replace `keep_placeholder` with `keepPlaceholder`.
- Replace `input_class` with `inputClassName`.
- Replace `input_attributes` with `inputAttributes`.
- Replace `input_element` with `inputElement`.
- Replace `icon_size` with `iconSize`.
- Replace `icon_position` with `iconPosition`.
- Replace `inner_element` with `innerElement`.
- Replace `submit_element` with `submitElement`.
- Replace `submit_button_variant` with `submitButtonVariant`.
- Replace `submit_button_icon` with `submitButtonIcon`.
- Replace `submit_button_status` with `submitButtonStatus`.
- Replace `selectall` with `selectAll`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_submit` with `onSubmit`.
- Replace `on_focus` with `onFocus`.
- Replace `on_blur` with `onBlur`.
- Replace `on_submit_focus` with `onSubmitFocus`.
- Replace `on_submit_blur` with `onSubmitBlur`.

#### Deprecations and removals

- `MultiInputMask` has been removed as a public component. If you were importing it directly, use `InputMasked` instead.
- `show_guide` has been removed. If you need to communicate an expected format, pass an example using the regular `placeholder` prop (e.g. `placeholder="00 00 00"`) or provide helper text next to the field.
- `keep_char_positions` has been removed.
- `placeholder_char` has been removed.
- `pipe` has been removed.
- `MaskFunction` (function-based masks) has been removed. Maskito only supports array masks (`Array<string | RegExp>`) and RegExp masks. Convert any custom mask functions to array-based masks.

  **Before:**

  ```tsx
  // Function-based mask (no longer supported)
  <InputMasked mask={(value) => value.split('').map(() => /\d/)} />

  // Object-wrapped mask (no longer supported)
  <InputMasked mask={{ mask: [/\d/, /\d/, '/', /\d/, /\d/] }} />
  ```

  **After:**

  ```tsx
  // Array mask (use directly)
  <InputMasked mask={[/\d/, /\d/, '/', /\d/, /\d/]} />
  ```

- The `{ mask: ... }` object form for masks has been removed. Use array masks directly instead of wrapping them in an object.
- The addon helpers `createNumberMask` and `emailMask` have been removed. The following imports no longer work and should be deleted or replaced:

  ```tsx

  ```

- The backward-compatibility re-export file `InputMaskedHooks` has been removed. If you imported hooks from `@dnb/eufemia/components/input-masked/InputMaskedHooks`, import from `@dnb/eufemia/components/input-masked/hooks` instead.

### [FormLabel](/uilib/components/form-label/)

#### Properties

- Replace `for_id` with `forId`.
- Replace `sr_only` with `srOnly`.

### [Radio](/uilib/components/radio/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- The deprecated `attributes` prop has been removed. Use spread props instead.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `label_position` with `labelPosition`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.

#### Events

- Replace `on_change` with `onChange`.

### [Radio.Group](/uilib/components/radio/)

#### Properties

- The deprecated `attributes` prop has been removed. Use spread props instead.
- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `label_position` with `labelPosition`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `layout_direction` with `layoutDirection`.

#### Events

- Replace `on_change` with `onChange`.

### [Textarea](/uilib/components/textarea/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- The deprecated `textareaAttributes` prop has been removed. Use spread props instead.
- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `textarea_state` with `textareaState`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `autoresize_max_rows` with `autoResizeMaxRows`.
- Replace `autoresize` with `autoResize`.
- Replace `textarea_class` with `textareaClassName`.
- Replace `textarea_attributes` with `textareaAttributes`.
- Replace `inner_ref` with `ref`.
- Replace `textarea_element` with `textareaElement`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_focus` with `onFocus`.
- Replace `on_blur` with `onBlur`.
- Replace `on_key_down` with `onKeyDown`.

### [Accordion](/uilib/components/accordion/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- The deprecated `attributes` prop has been removed. Use spread props instead.
- Replace `expandBehaviour` with `expandBehavior`.
- Replace `expanded_ssr` with `expandedSsr`.
- Replace `heading_level` with `headingLevel`.
- Replace `icon_size` with `iconSize`.
- Replace `single_container` with `singleContainer`.
- Replace `left_component` with `leftComponent`.
- Replace `flush_remembered_state` with `flushRememberedState`.
- Replace `icon_position` with `iconPosition`.
- Replace `prevent_rerender_conditional` with `preventRerenderConditional`.
- Replace `remember_state` with `rememberState`.
- Replace `prevent_rerender` with `preventRerender`.
- Replace `no_animation` with `noAnimation`.
- Replace `prerender` with `keepInDOM`.

#### Events

- Replace `on_change` with `onChange`.

### [Accordion.Group](/uilib/components/accordion/)

#### Properties

- Replace `allow_close_all` with `allowCloseAll`.
- Replace `expanded_id` with `expandedId`.

### [Accordion.Provider](/uilib/components/accordion/)

#### Properties

- Replace `expanded_id` with `expandedId`.

### [Tag](/uilib/components/tag/)

#### Events

- Replace `onDelete` with `onClick`, and add `variant="removable"`.

### [Upload](/uilib/components/upload/)

#### Properties

- Replace `variant="normal"` with `variant="default"`.
- Replace `fileListAriaLabel` with `listAriaLabel`.

### [Stat](/uilib/components/stat/)

#### Removals

- `Stat.Amount` has been removed. Use `Stat.Number` instead.
- `Stat.Info` no longer accepts `variant="default"`. Use `variant="plain"` instead.
- `Stat.Label` no longer accepts `variant="default"`. Use `variant="plain"` instead.

**Before:**

```tsx
<Stat.Amount value={1000} />
<Stat.Info variant="default">Info text</Stat.Info>
```

**After:**

```tsx
<Stat.Number value={1000} />
<Stat.Info variant="plain">Info text</Stat.Info>
```

### [P](/uilib/elements/paragraph/)

- Replace class `.dnb-p--medium` with `.dnb-t__weight--medium`.
- Replace class `.dnb-p--bold` with `.dnb-t__weight--bold`.
- Replace class `.dnb-p__size--xx-large` with `.dnb-t__size--xx-large` and `.dnb-t__line-height--xx-large`.
- Replace class `.dnb-p__size--x-large` with `.dnb-t__size--x-large` and `.dnb-t__line-height--x-large`.
- Replace class `.dnb-p__size--large` with `.dnb-t__size--large` and `.dnb-t__line-height--large`.
- Replace class `.dnb-p__size--basis` with `.dnb-t__size--basis` and `.dnb-t__line-height--basis`.
- Replace class `.dnb-p__size--medium` with `.dnb-t__size--medium` and `.dnb-t__line-height--medium`.
- Replace class `.dnb-p--small` or `.dnb-p__size--small` with `.dnb-t__size--small` and `.dnb-t__line-height--small`.
- Replace class `.dnb-p--x-small` or `.dnb-p__size--x-small` with `.dnb-t__size--x-small` and `.dnb-t__line-height--x-small`.

#### Properties

- Replace `medium={true}` with `weight='medium'`.
- Replace `bold={true}` with `weight='bold'`.
- Replace `modifier` — common mappings:
  - `modifier="medium"` → `weight="medium"`
  - `modifier="small"` → `size="small"`
  - `modifier="x-small"` → `size="x-small"`

### [Definition lists](/uilib/elements/lists/#definition-lists)

#### Properties

- Replace `direction` in `<Dl>` with `layout`.

### [Breadcrumb](/uilib/components/breadcrumb/)

#### Properties

- Replace `isCollapsed` with `collapsed`.
- Replace `styleType` (or `style_type`) with `backgroundColor`.
- The `spacing` prop type has changed from `SectionSpacing` to `SpaceTypeAll | SpaceTypeMedia`. All previously valid string values still work, but if you imported `SectionSpacing` to type your Breadcrumb spacing, update to use the new types.

### [BreadcrumbItem](/uilib/components/breadcrumb/)

- Removed passing down properties to the internal `span`.

We don't think this has been used for anything other than passing down `data-testid`s for testing. We believe the potential side effects of passing down properties to this span are greater than the advantages it gives for those who want to test this span using `data-testid` as their way of selecting the span.

We recommend [other testing methods](/uilib/usage/best-practices/for-testing/) to select and test the inner parts of Eufemia components. You could use, e.g., `screen.queryByRole` or `document.querySelector`.

For more context, see this [PR](https://github.com/dnbexperience/eufemia/pull/2798).

### [ProgressIndicator](/uilib/components/progress-indicator/)

#### Properties

- Replace `visible` with `show`.
- Replace `no_animation` with `noAnimation`.
- Replace `indicator_label` with `indicatorLabel`.
- Replace `label_direction` with `labelDirection`.
- Replace `show_label` with `showDefaultLabel`.
- Replace `class` with `className`.
- Replace `children` with `label`.

#### Events

- Replace `on_complete` with `onComplete`.

#### Styling

- Replace CSS class `dnb-progress-indicator--visible` with `dnb-progress-indicator--show`.

#### Translations

- Replace translation `ProgressIndicator.indicator_label` with `ProgressIndicator.indicatorLabel`.

### [PaymentCard](/uilib/extensions/payment-card/)

#### Properties

- Replace `product_code` with `productCode`.
- Replace `card_number` with `cardNumber`.
- Replace `card_status` with `cardStatus`.
- Replace `raw_data` with `rawData`.
- The `class` prop has been removed. Use `className` instead.

#### `cardStatus` property

- Replace value `not_active` with `notActive`.
- Replace value `order_in_process` with `orderInProcess`.
- Replace value `new_order` with `newOrder`.

#### Translations

- Remove translation `PaymentCard.text_card_number` as it's not supported anymore.
- Replace `PaymentCard.text_blocked` with `PaymentCard.textBlocked`.
- Replace `PaymentCard.text_expired` with `PaymentCard.textExpired`.
- Replace `PaymentCard.text_not_active` with `PaymentCard.textNotActive`.
- Replace `PaymentCard.text_new_order` with `PaymentCard.textNewOrder`.
- Replace `PaymentCard.text_order_in_process` with `PaymentCard.textOrderInProcess`.
- Replace `PaymentCard.text_replaced` with `PaymentCard.textReplaced`.
- Replace `PaymentCard.text_renewed` with `PaymentCard.textRenewed`.
- Replace `PaymentCard.text_new` with `PaymentCard.textNew`.
- Replace `PaymentCard.text_unknown` with `PaymentCard.textUnknown`.

#### Removed daggy (tagged sum) types

The `PaymentCard` types (`DNB`, `Visa`, `Mastercard`, `CardType`, `BankAxept`, `Saga`, `PB`, `ProductType`, `BankAxeptType`) have been refactored from daggy tagged sums to plain TypeScript discriminated unions. The constructor API (`DNB.Colored('...')`, `Mastercard.Default`, etc.) is unchanged, but how you consume them has changed:

- **`.cata()` removed** — Replace `.cata({ Variant: () => ... })` with a `switch` on the `.tag` property:

  ```diff
  - cardType.cata({
  -   Visa: () => renderVisa(),
  -   Mastercard: () => renderMastercard(),
  -   None: () => null,
  - })
  + switch (cardType.tag) {
  +   case 'Visa': return renderVisa()
  +   case 'Mastercard': return renderMastercard()
  +   case 'None': return null
  + }
  ```

- **`@@tag` replaced with `tag`** — If you accessed the `'@@tag'` property, use `.tag` instead.
- **`.is()` removed** — Use `.tag` comparison instead: `val.tag === 'Visa'`.
- **`.toString()` removed** — Use `.tag` for the variant name.
- **Reference equality changed** — Unit variants are now plain objects, so `===` comparison no longer works. Use `.tag` comparison instead:

  ```diff
  - data.bankAxept === BankAxeptType.BankAxept
  + data.bankAxept.tag === 'BankAxept'
  ```

### Divider ([Horizontal Rule](/uilib/elements/horizontal-rule/))

#### Properties

- Remove the `light` and `medium` props — they are no longer supported. The Divider now renders with a single default style. If you need to customize the line appearance, use CSS custom properties or a wrapper with custom styling.
- Replace `fullscreen` with `breakout`.

### [Flex.Item](/uilib/layout/flex/item/)

#### Properties

- Replace `size` with `span`. The property sets how many columns an item should span in the flex layout.

### [Card](/uilib/components/card/)

#### Properties

- Remove `spacing` property.
- Replace `size` with `span` (inherited from [Flex.Item](/uilib/layout/flex/item/)).
- The default `innerSpace` is now `small` (`16px`) on all sides.

#### Styling

- The default outline has changed to `1px` with color `#ebebeb`.
- The corner radius has changed to `24px`.

### [Checkbox](/uilib/components/checkbox/)

#### Properties

- The deprecated `attributes` prop has been removed. Use spread props instead.
- Replace `label_position` with `labelPosition`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `children` with `label`.

#### Events

- Replace `on_change` with `onChange`.

#### TypeScript types

- Replace `OnChangeParams` with `CheckboxOnChangeParams`.
- Replace `OnClickParams` with `CheckboxOnClickParams`.

### [Switch](/uilib/components/switch/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- Replace `label_position` with `labelPosition`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_change_end` with `onChangeEnd`.

### [Logo](/uilib/components/logo/)

> **Major change:** The Logo component API has been redesigned. Instead of `brand` and `variant` props, import the specific SVG component directly.

#### Properties

- Remove `brand` prop. Import and use the desired SVG component directly (e.g., `DnbDefault`, `SbankenDefault`, `SbankenCompact`, `SbankenHorizontal`, `CarnegieDefault`, `EiendomDefault`).
- Remove `variant` prop. Instead, import the specific variant directly (e.g., `SbankenCompact` instead of `brand="sbanken" variant="compact"`).
- Remove `size`. Replace it with `height` if it contains a numeric value, and with `inheritSize` where `size='inherit'`.
- Remove the following properties: `alt` and `ratio`. Alt text is now built into each SVG component (e.g. `DnbDefault.alt` is `'DNB Logo'`). The Logo component reads `svg.alt` automatically. To customize the alt text, pass `aria-label` to the Logo component.
- Replace `inherit_color` with `inheritColor`.
- Change `width` from number to string.
- Change `height` from number to string.

**Migration Example**:

Before (v10):

```tsx
import { Logo } from '@dnb/eufemia'

render(<Logo brand="sbanken" variant="compact" />)
```

After (v11):

```tsx
import { Logo, SbankenCompact } from '@dnb/eufemia/components/Logo'

render(<Logo svg={SbankenCompact} />)
```

### [Icon](/uilib/components/icon/)

#### Properties

- Replace `inherit_color` with `inheritColor`.

### [Button](/uilib/components/button/)

**Removals:**

- The `variant="signal"` has been removed. Use `variant="primary"` or `variant="secondary"` instead.
- The `buttonVariantPropType` export has been removed as part of the PropTypes removal. If you were importing it via `import { buttonVariantPropType } from '@dnb/eufemia/components/button'`, remove the import — runtime prop validation is no longer provided.

#### Properties

- Replace `icon_position` with `iconPosition`.
- Replace `icon_size` with `iconSize`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `custom_content` with `customContent`.
- The `class` prop has been removed. Use `className` instead.
- Replace `inner_ref` with `ref`.

#### Events

- Replace `on_click` with `onClick`.

### [Modal](/uilib/components/modal/), [Dialog](/uilib/components/dialog/) and [Drawer](/uilib/components/drawer/)

**Removals and behavioral changes:**

- **Removed:** `rootId` property has been removed. Modal root elements no longer support custom IDs.
- Replace `openState` with `open`. Replace `openState="opened"` with `open={true}` and `openState="closed"` with `open={false}`.
- If you rely on opening and closing a modal by mounting and unmounting the component (legacy behavior), you should change to using the `open` property instead.

#### Properties

The following properties have been renamed from snake_case to camelCase:

- Replace `class` with `className`.
- Replace `focus_selector` with `focusSelector`.
- Replace `labelled_by` with `labelledBy`.
- Replace `open_delay` with `openDelay`.
- Replace `content_id` with `contentId`.
- Replace `dialog_title` with `dialogTitle`.
- Replace `close_title` with `closeTitle`.
- Replace `hide_close_button` with `hideCloseButton`.
- Replace `close_button_attributes` with `closeButtonAttributes`.
- Replace `prevent_close` with `preventClose`.
- Replace `prevent_core_style` with `preventCoreStyle`.
- Replace `animation_duration` with `animationDuration`.
- Replace `no_animation` with `noAnimation`.
- Replace `no_animation_on_mobile` with `noAnimationOnMobile`.
- Replace `min_width` with `minWidth`.
- Replace `max_width` with `maxWidth`.
- Replace `align_content` with `alignContent`.
- Replace `container_placement` with `containerPlacement`.
- Replace `vertical_alignment` with `verticalAlignment`.
- Replace `open_state` with `openState`.
- Replace `direct_dom_return` with `directDomReturn`.
- Replace `omit_trigger_button` with `omitTriggerButton`.
- Replace `open_modal` with `openModal`.
- Replace `close_modal` with `closeModal`.
- Replace `trigger_attributes` with `triggerAttributes`.
- Replace `overlay_class` with `overlayClass`.
- Replace `content_class` with `contentClass`.
- Replace `modal_content` with `modalContent`.
- Replace `header_content` with `headerContent`.
- Replace `bar_content` with `barContent`.
- Replace `dialog_role` with `dialogRole`.
- Replace `bypass_invalidation_selectors` with `bypassInvalidationSelectors`.
- Replace `content_ref` with `contentRef`.
- Replace `scroll_ref` with `scrollRef`.
- Replace `prevent_overlay_close` with `preventOverlayClose`.
- Replace `confirmType`'s value `info` with `information` on Dialog.

#### Events

- Replace `on_open` with `onOpen`.
- Replace `on_close` with `onClose`.
- Replace `on_close_prevent` with `onClosePrevent`.

#### TypeScript types

- Replace `ModalPropTypes` with `ModalAllProps`.

#### Translations

- Replace `Modal.dialog_title` with `Modal.dialogTitle`.
- Replace `Modal.close_title` with `Modal.closeTitle`.

### [Modal.Header](/uilib/components/modal/), [Dialog.Header](/uilib/components/dialog/) and [Drawer.Header](/uilib/components/drawer/)

#### Properties

- Replace `title_class` with `titleClass`.

### [ModalHeaderBar](/uilib/components/modal/), [Dialog.Navigation](/uilib/components/dialog/) and [Drawer.Navigation](/uilib/components/drawer/)

#### Properties

- Replace `shadow_class` with `shadowClass`.

### [Dialog.Body](/uilib/components/dialog/) and [Drawer.Body](/uilib/components/drawer/)

#### Properties

- Replace `styleType` (or `style_type`) with `backgroundColor`.
- Replace `spacing` with `innerSpace`. Use `block` to match the old vertical-only padding:
  - `spacing` -> `innerSpace={{ block: 'large' }}`
  - `spacing="x-small"` -> `innerSpace={{ block: 'x-small' }}`
  - `spacing="small"` -> `innerSpace={{ block: 'small' }}`
  - `spacing="medium"` -> `innerSpace={{ block: 'medium' }}`
  - `spacing="large"` -> `innerSpace={{ block: 'large' }}`
  - `spacing="x-large"` -> `innerSpace={{ block: 'x-large' }}`
  - `spacing="xx-large"` -> `innerSpace={{ block: 'xx-large' }}`

### [Heading](/uilib/components/heading/)

#### Properties

- Replace `debug_counter` with `debugCounter`.
- Replace `skip_correction` with `skipCorrection`.

### [H (heading elements)](/uilib/elements/heading/)

#### Properties

- Replace `as` with `element`.

**Before:**

```tsx
<H as="h2" size="medium">
  Heading
</H>
```

**After:**

```tsx
<H element="h2" size="medium">
  Heading
</H>
```

### [Table](/uilib/components/table/)

#### Properties

- Replace `accordion` with `mode="accordion"`.
- Replace `accordionChevronPlacement="start"` with `accordionChevronPlacement="left"` (or remove it, since `"left"` is the default).
- Replace `accordionChevronPlacement="end"` with `accordionChevronPlacement="right"`.

#### Events

- Replace `onClosed` with `onClose`.
- Replace `onOpened` with `onOpen`.

#### TableClickableHead

##### Events

- Replace `on_click` with `onClick`.

### [FormStatus](/uilib/components/form-status/)

#### Properties

- Replace `no_animation` with `noAnimation`.
- Replace `icon_size` with `iconSize`.
- Replace `text_id` with `textId`.
- Replace `width_selector` with `widthSelector`.
- Replace `width_element` with `widthElement`.
- Replace `state`'s value `info` with `information`.
- Replace `state`'s value `warn` with `warning`.
- Replace `variant`'s value `flat` with `plain`.

#### TypeScript types

- The `FormStatusState` type no longer includes `| string | boolean`. It now only accepts the literal values `'error'`, `'warning'`, `'information'`, `'success'`, and `'marketing'`. If you were passing arbitrary strings or booleans as `state` or `statusState`, update them to one of the valid literals.

### [Skeleton](/uilib/components/skeleton/)

#### Properties

- Replace `no_animation` with `noAnimation`.
- Replace `aria_busy` with `ariaBusy`.
- Replace `aria_ready` with `ariaReady`.

#### Translations

- Replace translation `Skeleton.aria_busy` with `Skeleton.ariaBusy`.
- Replace translation `Skeleton.aria_ready` with `Skeleton.ariaReady`.

### [Tabs](/uilib/components/tabs/)

#### Properties

- Replace `selected_key` with `selectedKey`.
- Replace `content_style` with `contentStyle`.
- Replace `content_spacing` or `contentSpacing` with `contentInnerSpace`. The `contentSpacing` prop has been removed – use `contentInnerSpace` instead, which passes `innerSpace` to the content Section.
- Replace `tab_element` with `tabElement`.
- Replace `tabs_style` with `tabsStyle`.
- Replace `tabs_spacing` or `tabsSpacing` with `tabsInnerSpace`. The `tabsSpacing` prop has been removed – use `tabsInnerSpace` instead.
- Replace `nav_button_edge` with `navButtonEdge`.
- Replace `prevent_rerender` with `preventRerender`.
- Replace `focus_key` with `focusKey`.
- Replace `no_border` with `noBorder`.
- Replace `prerender` with `keepInDOM`.
- The `class` prop has been removed. Use `className` instead.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_click` with `onClick`.
- Replace `on_mouse_enter` with `onMouseEnter`.
- Replace `on_focus` with `onFocus`.

#### Styling

- The CSS classes `dnb-section--spacing-*` are no longer applied to the Tabs content wrapper or tab list. If you have custom CSS targeting these classes within Tabs, update to target the inline styles or use `contentInnerSpace`/`tabsInnerSpace` props instead.

### [Pagination](/uilib/components/pagination/)

#### Properties

- Replace `place_maker_before_content` with `placeMarkerBeforeContent`.
- Replace `startup_page` with `startupPage`.
- Replace `current_page` with `currentPage`.
- Replace `page_count` with `pageCount`.
- Replace `startup_count` with `startupCount`.
- Replace `parallel_load_count` with `parallelLoadCount`.
- Replace `min_wait_time` with `minWaitTime`.
- Replace `use_load_button` with `useLoadButton`.
- Replace `hide_progress_indicator` with `hideProgressIndicator`.
- Replace `set_content_handler` with `setContentHandler`.
- Replace `reset_content_handler` with `resetContentHandler`.
- Replace `reset_pagination_handler` with `resetPaginationHandler`.
- Replace `end_infinity_handler` with `endInfinityHandler`.
- Replace `page_element` with `pageElement`.
- Replace `fallback_element` with `fallbackElement`.
- Replace `marker_element` with `markerElement`.
- Replace `indicator_element` with `indicatorElement`.
- Replace `button_title` with `buttonTitle`.
- Replace `prev_title` with `prevTitle`.
- Replace `next_title` with `nextTitle`.
- Replace `more_pages` with `morePages`.
- Replace `is_loading_text` with `isLoadingText`.
- Replace `load_button_text` with `loadButton.text`. Note: `loadButton` is now an **object prop** (not a flat string). Migrate as follows:

```tsx
// Before:
<Pagination load_button_text="Load more" />

// After:
<Pagination loadButton={{ text: "Load more" }} />
```

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_startup` with `onStartup`.
- Replace `on_load` with `onLoad`.
- Replace `on_end` with `onEnd`.

#### Translations

- Replace `Pagination.button_title` with `Pagination.buttonTitle`.
- Replace `Pagination.prev_title` with `Pagination.prevTitle`.
- Replace `Pagination.next_title` with `Pagination.nextTitle`.
- Replace `Pagination.more_pages` with `Pagination.morePages`.
- Replace `Pagination.is_loading_text` with `Pagination.isLoadingText`.
- Replace `Pagination.load_button_text` with `Pagination.loadButtonText`.

#### InfinityLoadButton & InfinityLoadButtonProps

- Replace `on_click` with `onClick`.

### [Slider](/uilib/components/slider/)

#### Properties

- Replace `statusState`'s value `info` with `information`.

The following properties have been renamed from snake_case to camelCase:

- Replace `thumb_title` with `thumbTitle`.
- Replace `add_title` with `addTitle`.
- Replace `subtract_title` with `subtractTitle`.
- Replace `number_format` with `numberFormat`.
- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `status_state` with `statusState`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.

#### Events

- Replace `on_change` with `onChange`.

#### Translations

- Replace `Slider.add_title` with `Slider.addTitle`.
- Replace `Slider.subtract_title` with `Slider.subtractTitle`.

#### TypeScript types

- Replace `OnChangeEventProps` with `SliderOnChangeParams`.
- Replace `ThumbStateEnums` with `SliderThumbState`.

### [Timeline](/uilib/components/timeline/)

#### Translations

- Replace `TimelineItem.alt_label_completed` with `TimelineItem.altLabelCompleted`.
- Replace `TimelineItem.alt_label_current` with `TimelineItem.altLabelCurrent`.
- Replace `TimelineItem.alt_label_upcoming` with `TimelineItem.altLabelUpcoming`.

### [DatePicker](/uilib/components/date-picker/)

**Removals and behavioral changes:**

- The `onBlur` and `onFocus` events fire now only once per user interaction, not on every internal input blur.
- The visible date segments are no longer native `input` elements. They are now exposed as section elements with `role="spinbutton"`. If you have Jest or DOM tests that query `input` or assert old input-specific ARIA attributes, update them to target the visible date picker field/segments instead.
- Find `partialDate`, `partialStartDate` and `partialEndDate` and remove it.
- Find `correctInvalidDate` / `correct_invalid_date` and remove it. Use [Field.Date](/uilib/extensions/forms/feature-fields/Date/) from Eufemia Forms instead when using `minDate` and `maxDate`, as it has built-in validation. Automatically correcting user input leads to confusion — inform users about the error and let them correct it themselves.
- Replace `on_show` with `onOpen` and `on_hide` with `onClose` (not just a casing change — the event names changed).
- Replace `opened` with `open`.
- `dateFormat` and `returnFormat` no longer support the format `YYYY-MM-DD`. Use `yyyy-MM-dd` instead.

  **Before:**

  ```tsx
  <DatePicker dateFormat="YYYY/MM/DD" returnFormat="YYYY-MM-DD" />
  ```

  **After:**

  ```tsx
  <DatePicker dateFormat="yyyy/MM/dd" returnFormat="yyyy-MM-dd" />
  ```

- The internal `date-fns` dependency has been upgraded from **v2** to **v4**. This does not affect the DatePicker API itself, but if you import `date-fns` directly in your project (e.g. to pass a `locale` to DatePicker), you need to update your imports from default exports to named exports:

  **Before (date-fns v2):**

  ```tsx
  ;<DatePicker locale={nbLocale} />
  ```

  **After (date-fns v4):**

  ```tsx
  ;<DatePicker locale={nb} />
  ```

#### Properties

In addition to the behavioral changes above, the following properties have been renamed from snake_case to camelCase:

- Replace `start_date` with `startDate`.
- Replace `end_date` with `endDate`.
- Replace `start_month` with `startMonth`.
- Replace `end_month` with `endMonth`.
- Replace `min_date` with `minDate`.
- Replace `max_date` with `maxDate`.
- Replace `mask_order` with `maskOrder`.
- Replace `mask_placeholder` with `maskPlaceholder`.
- Replace `date_format` with `dateFormat`.
- Replace `return_format` with `returnFormat`.
- Replace `hide_navigation` with `hideNavigation`.
- Replace `hide_days` with `hideDays`.
- Replace `only_month` with `onlyMonth`.
- Replace `hide_last_week` with `hideLastWeek`.
- Replace `disable_autofocus` with `disableAutofocus`.
- Replace `enable_keyboard_nav` with `enableKeyboardNav`.
- Replace `show_input` with `showInput`.
- Replace `show_submit_button` with `showSubmitButton`.
- Replace `show_cancel_button` with `showCancelButton`.
- Replace `show_reset_button` with `showResetButton`.
- Replace `submit_button_text` with `submitButtonText`.
- Replace `cancel_button_text` with `cancelButtonText`.
- Replace `reset_button_text` with `resetButtonText`.
- Replace `reset_date` with `resetDate`.
- Replace `first_day` with `firstDay`.
- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `input_element` with `inputElement`.
- Replace `addon_element` with `addonElement`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `prevent_close` with `preventClose`.
- Replace `no_animation` with `noAnimation`.
- Replace `align_picker` with `alignPicker`.
- Replace `skip_portal` with `skipPortal`.
- Replace the `shortcuts` property `close_on_select` with `closeOnSelect`.

#### Events

- Replace `on_days_render` with `onDaysRender`.
- Replace `on_change` with `onChange`.
- Replace `on_type` with `onType`.
- Replace `on_show` with `onOpen`.
- Replace `on_hide` with `onClose`.
- Replace `on_submit` with `onSubmit`.
- Replace `on_cancel` with `onCancel`.
- Replace `on_reset` with `onReset`.

#### Event return object

The following properties on the event callback return object have been renamed:

- Replace `days_between` with `daysBetween`.
- Replace `is_valid` with `isValid`.
- Replace `is_valid_start_date` with `isValidStartDate`.
- Replace `is_valid_end_date` with `isValidEndDate`.

#### Styling

- Replace CSS class `dnb-date-picker--opened` with `dnb-date-picker--open`.

### [NumberFormat](/uilib/components/number-format/)

#### Split into variants (no more `<NumberFormat />`)

> **Major change:** `NumberFormat` is now exposed as a namespace of variant sub-components. This enables code splitting and tree shaking: apps only pay for the variants they actually use. There is **no backwards compatibility** – the generic `<NumberFormat />` component has been removed.

Replace each usage with the matching variant:

| Before                                          | After                                                         |
| ----------------------------------------------- | ------------------------------------------------------------- |
| `<NumberFormat value={1234} />`                 | `<NumberFormat.Number value={1234} />`                        |
| `<NumberFormat>1234</NumberFormat>`             | `<NumberFormat.Number>1234</NumberFormat.Number>`             |
| `<NumberFormat currency value={1234} />`        | `<NumberFormat.Currency value={1234} />`                      |
| `<NumberFormat currency="USD" value={1234} />`  | `<NumberFormat.Currency currency="USD" value={1234} />`       |
| `<NumberFormat percent value={12.34} />`        | `<NumberFormat.Percent value={12.34} />`                      |
| `<NumberFormat compact value={12345} />`        | `<NumberFormat.Number compact value={12345} />`               |
| `<NumberFormat compact="long" value={12345} />` | `<NumberFormat.Number compact="long" value={12345} />`        |
| `<NumberFormat phone value="99999999" />`       | `<NumberFormat.PhoneNumber value="99999999" />`               |
| `<NumberFormat ban value="20001234567" />`      | `<NumberFormat.BankAccountNumber value="20001234567" />`      |
| `<NumberFormat nin value="18089212345" />`      | `<NumberFormat.NationalIdentityNumber value="18089212345" />` |
| `<NumberFormat org value="123456789" />`        | `<NumberFormat.OrganizationNumber value="123456789" />`       |

Notes:

- The `currency`, `percent`, `phone`, `ban`, `nin` and `org` boolean props have been removed from the shared props surface. They are now implied by the chosen variant.
- `NumberFormat.Currency` defaults `currency` to `true` (i.e. `NOK`). Pass a string like `currency="USD"` to override.
- `compact` is still supported on `NumberFormat.Number` and `NumberFormat.Currency`. Pass `compact` (short), `compact="long"` or `compact="short"` to pick the style.
- `NumberFormat.PhoneNumber` still supports `link="tel" | "sms"` for clickable links.
- The `Provider` context key `NumberFormat` (e.g. `<Provider NumberFormat={{ currency: true, decimals: 0 }}>`) and the `NumberFormatProps` TypeScript type are still available for shared configuration.

#### Utility formatter API (`format` removed)

> **Major change:** The generic `format(value, options)` utility is gone. Import the variant formatter you need directly.

| Before                               | After                                        |
| ------------------------------------ | -------------------------------------------- |
| `format(value, { phone: true })`     | `formatPhoneNumber(value)`                   |
| `format(value, { ban: true })`       | `formatBankAccountNumber(value)`             |
| `format(value, { nin: true })`       | `formatNationalIdentityNumber(value)`        |
| `format(value, { org: true })`       | `formatOrganizationNumber(value)`            |
| `format(value, { percent: true })`   | `formatPercent(value)`                       |
| `format(value, { currency: true })`  | `formatCurrency(value)`                      |
| `format(value, { currency: 'USD' })` | `formatCurrency(value, { currency: 'USD' })` |
| `format(value)`                      | `formatNumber(value)`                        |

```tsx
// Before
import { format } from '@dnb/eufemia/components/NumberFormat'
format(value, { phone: true })

// After
import { formatPhoneNumber } from '@dnb/eufemia/components/NumberFormat'
formatPhoneNumber(value)
```

All variant formatters are re-exported from `@dnb/eufemia/components/NumberFormat`: `formatNumber`, `formatCurrency`, `formatPercent`, `formatPhoneNumber`, `formatBankAccountNumber`, `formatNationalIdentityNumber`, `formatOrganizationNumber`.

`NumberFormatOptionParams` no longer accepts the `phone`, `ban`, `nin`, `org` or `percent` booleans; they were only used by the removed dispatcher.

#### `useNumberFormat(value, formatter, options?)`

> **Major change:** `useNumberFormat` now takes the formatter explicitly instead of the variant flag.

```tsx
// Before
const result = useNumberFormat(value, { currency: true, decimals: 2 })

// After
import {
  useNumberFormat,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'
const result = useNumberFormat(value, formatCurrency, { decimals: 2 })
```

#### `useNumberFormatWithParts(value, formatter, options?)`

> **Major change:** `useNumberFormatWithParts` now mirrors `useNumberFormat` and takes the formatter explicitly instead of picking one from `percent` / `currency` options. The internal `forceCurrencyAfterAmount` option has been removed; pass `currencyPosition: 'after'` directly on the formatter options if you need it.

```tsx
// Before
const formatted = useNumberFormatWithParts(value, {
  currency: true,
  decimals: 2,
})

// After
import {
  useNumberFormatWithParts,
  formatCurrency,
} from '@dnb/eufemia/components/NumberFormat'
const formatted = useNumberFormatWithParts(value, formatCurrency, {
  decimals: 2,
})
```

| Before                                                                | After                                                                            |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `useNumberFormatWithParts(value)`                                     | `useNumberFormatWithParts(value, formatNumber)`                                  |
| `useNumberFormatWithParts(value, { currency: true })`                 | `useNumberFormatWithParts(value, formatCurrency)`                                |
| `useNumberFormatWithParts(value, { percent: true })`                  | `useNumberFormatWithParts(value, formatPercent)`                                 |
| `useNumberFormatWithParts(value, { forceCurrencyAfterAmount: true })` | `useNumberFormatWithParts(value, formatCurrency, { currencyPosition: 'after' })` |

The returned `parts` shape is unchanged. `parts` are now derived from the formatter's display string, so any formatter returning a `NumberFormatReturnValue` (including custom ones) can be passed in.

#### Behavioral changes

- Phone formatting no longer treats bare numbers starting with `47` as having a Norwegian country code. Use E.164 format with an explicit `+` prefix (e.g. `+4712345678`) or the `00` prefix (e.g. `004712345678`) to indicate a country code. For example, `4712345678` now formats as `47 12 34 56 78` instead of `+47 12 34 56 78`.
- Phone formatting now auto-detects country codes for all countries from spaceless E.164 numbers (e.g. `+35812345678` → `+358 23 45 67 89`). Previously, only Norwegian (`+47`) spaceless numbers were detected.
- Phone formatting now also accepts space-separated values (e.g. `+47 12345678`) and values with dashes. Unrecognized values (no digits) are returned as-is.

#### Properties (per variant)

- Replace `omit_rounding` with `rounding="omit"`.
- Replace `currency_display` with `currencyDisplay`.
- Replace `currency_position` with `currencyPosition`.
- Replace `always_selectall` with `alwaysSelectAll`.
- Replace `selectall` with `selectAll`.
- Replace `copy_selection` with `copySelection`.
- Replace `clean_copy_value` with `cleanCopyValue`.

#### Translations

- Replace `NumberFormat.clipboard_copy` with `NumberFormat.clipboardCopy`.
- Replace `NumberFormat.not_available` with `NumberFormat.notAvailable`.

#### Styling

- Replace CSS class `dnb-number-format--selectall` with `dnb-number-format--select-all`.

#### TypeScript types

- Replace `formatReturnValue` with `NumberFormatReturnValue`.
- Replace `formatValue` with `NumberFormatValue`.
- Replace `formatOptionParams` with `NumberFormatOptionParams`.
- Replace `formatReturnType` with `NumberFormatReturnType`.
- Replace `formatTypes` with `NumberFormatType`.
- Replace `formatCurrencyPosition` with `NumberFormatCurrencyPosition`.
- The `value` property in `NumberFormatReturnValue` changed from `number` to `NumberFormatValue` (`string | number`). If your code assumes `value` is always a `number`, add an explicit conversion with `Number(result.value)`.

### [StepIndicator](/uilib/components/step-indicator/)

> **Major change:** This component has been redesigned. The sidebar variant has been removed entirely.

#### Removals

- Major redesign of component. There is now only one variant (instead of two).
- Remove `StepIndicatorRenderCallback` type. Not needed anymore.

#### Properties

- Remove `on_item_render`. No longer has any other function than each step's `title` property.
- Remove step item `on_render`. No longer has any other function than the `title` property.
- Remove `sidebarId`. No longer has any sidebar. If an id is needed, use the `id` property.
- Remove `step_title_extended`. Only `stepTitle` is needed.
- Replace `is_current` with `isCurrent`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `info` with `information`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `current_step` with `currentStep`.
- Replace `overview_title` with `overviewTitle`.
- Replace `step_title` with `stepTitle`.
- Replace `hide_numbers` with `hideNumbers`.
- Replace `no_animation` with `noAnimation`.

#### Translations

- Replace `StepIndicator.overview_title` with `StepIndicator.overviewTitle`.
- Replace `StepIndicator.step_title` with `StepIndicator.stepTitle`.

#### Events

- Replace `on_change` with `onChange`.
- Replace `on_click` with `onClick`.
- Replace `data.on_click` with `data.onClick` for StepIndicatorItem.

#### StepItemWrapperProps

- Removed `number` as one can only change the render of content inside the button.
- Removed `status` as one can only change the render of content inside the button.
- Removed `hideNumbers` as can only hide numbers in main component.

#### StepIndicator.Sidebar

- Component removed entirely after redesign. The variant that used this component no longer exists.

### [GlobalError](/uilib/components/global-error/)

#### Properties

- Replace `status` with `statusCode`.
- Replace `code` with `errorMessageCode`.

#### Translations

- Replace translation `GlobalError.code` with `GlobalError.errorMessageCode`.

### [ToggleButton](/uilib/components/toggle-button/)

#### Properties

- The deprecated `onStateUpdate` prop has been removed. Use `onChange` instead.
- The deprecated `attributes` prop has been removed from ToggleButton and ToggleButtonGroup. Use spread props instead.
- Replace `icon_position` with `iconPosition`.
- Replace `icon_size` with `iconSize`.
- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `left_component` with `leftComponent`.

#### Events

- Replace `on_change` with `onChange`.

### [ToggleButton.Group](/uilib/components/toggle-button/)

#### Properties

- Replace `status_state` with `statusState`.
- Replace `statusState`'s value `warn` with `warning`.
- Replace `status_props` with `statusProps`.
- Replace `status_no_animation` with `statusNoAnimation`.
- Replace `label_direction` with `labelDirection`.
- Replace `label_sr_only` with `labelSrOnly`.
- Replace `left_component` with `leftComponent`.
- Replace `layout_direction` with `layoutDirection`.

#### Events

- Replace `on_change` with `onChange`.

### [Tooltip](/uilib/components/tooltip/)

#### Properties

- Replace `position` with `placement` to match the Popover API.
- Replace `active` with `open`.
- Remove `forceOpen` and use `open` instead. The `open` prop is now dynamically controlled — when `open` is a boolean it controls visibility, and when not provided (undefined) the Tooltip reverts to hover/focus behavior.
- Replace `size="basis"` with `size="default"`.

### [GlobalStatus](/uilib/components/global-status/)

#### Properties

- Replace `icon_size` with `iconSize`.
- Replace `no_animation` with `noAnimation`.
- Replace `hide_close_button` with `hideCloseButton`.
- Replace `close_text` with `closeText`.
- Replace `default_title` with `defaultTitle`.
- Replace `status_anchor_text` with `statusAnchorText`.
- Replace `omit_set_focus` with `omitSetFocus`.
- Replace `omit_set_focus_on_update` with `omitSetFocusOnUpdate`.
- Replace `status_id` with `statusId`.
- Replace `status_anchor_url` with `statusAnchorUrl`.
- Replace `status_anchor_label` with `statusAnchorLabel`.
- Replace `buffer_delay` with `bufferDelay`.
- Replace `state`'s value `info` with `information`.
- Replace `autoclose` with `autoClose`.
- Replace `autoscroll` with `autoScroll`.

#### Events

- Replace `on_adjust` with `onAdjust`.
- Replace `on_open` with `onOpen`.
- Replace `on_show` with `onShow`.
- Replace `on_hide` with `onHide`.
- Replace `on_close` with `onClose`. The `status_id` callback parameter has been renamed to `statusId`.

#### Translations

- Replace translation `GlobalStatus.close_text` with `GlobalStatus.closeText`.
- Replace translation `GlobalStatus.default_title` with `GlobalStatus.defaultTitle`.
- Replace translation `GlobalStatus.status_anchor_text` with `GlobalStatus.statusAnchorText`.

#### GlobalStatusController

- Replace `remove_on_unmount` with `removeOnUnmount`.

#### GlobalStatus.create

##### Properties

- Replace `status_id` with `statusId`.

##### Events

- Replace `on_show` with `onShow`.
- Replace `on_hide` with `onHide`.
- Replace `on_close` with `onClose`.

#### GlobalStatus.Remove

##### Properties

- Replace `status_id` with `statusId`.
- Replace `buffer_delay` with `bufferDelay`.

##### Events

- Replace `on_show` with `onShow`.
- Replace `on_hide` with `onHide`.
- Replace `on_close` with `onClose`.

#### GlobalStatus.Add

##### Properties

- Replace `status_id` with `statusId`.

##### Events

- Replace `on_show` with `onShow`.
- Replace `on_hide` with `onHide`.
- Replace `on_close` with `onClose`.

#### GlobalStatus.Update

##### Properties

- Replace `status_id` with `statusId`.

##### Events

- Replace `on_show` with `onShow`.
- Replace `on_hide` with `onHide`.
- Replace `on_close` with `onClose`.

### [CopyOnClick](/uilib/components/copy-on-click/)

#### Translations

- Replace `CopyOnClick.clipboard_copy` with `CopyOnClick.clipboardCopy`.

## Layout

### [Space](/uilib/layout/space/)

#### Properties

- Replace `no_collapse` with `noCollapse`.

### [Flex](/uilib/layout/flex/)

#### Properties

- Replace `spacing` with `gap` on all Flex components.
- `rowGap` no longer accepts value `true`. Remove the property to get the same behavior.

### Removal of FormRow and FormSet

For more information on how to replace these, see [FormSet/FormRow deprecation](/uilib/about-the-lib/releases/eufemia/form-set-row-deprecation-v11#deprecation).

- Replace `<FormRow>` with `<Flex.Horizontal align="baseline">`.
- Replace `<FormRow vertical>` with `<Flex.Vertical>`.
- Replace `<FormRow centered>` with `<Flex.Horizontal align="center">`.
- Replace `FormRow=` with `formElement=`.
- Replace `FormRow:` with `formElement:`.
- Replace `import { includeValidProps } from '@dnb/eufemia/components/form-row/FormRowHelpers'` with `import { pickFormElementProps } from '@dnb/eufemia/shared/helpers/filterValidProps'`.
- Replace `import { prepareFormRowContext } from '@dnb/eufemia/components/form-row/FormRowHelpers'` with `import { prepareFormElementContext } from '@dnb/eufemia/shared/helpers/filterValidProps'`.

If you migrate a `FormSet` that relied on a native browser submit, such as `method="post"` with an `action`, you can use `preventDefaultOnSubmit={false}` on [Form.Handler](/uilib/extensions/forms/Form/Handler/) to keep the native submit behavior.

## Helpers

### Provider/Context

- The `locales` prop on `Provider` and `Context` has been removed. Use `translations` instead. Passing `locales` will be silently ignored.

**Before:**

```tsx
<Provider locales={myLocales}>...</Provider>
```

**After:**

```tsx
<Provider translations={myTranslations}>...</Provider>
```

### [Component helpers](/uilib/helpers/)

#### Properties

- Remove `extendGracefully`, it no longer exists.

#### Removed helper functions

The following functions have been removed from `@dnb/eufemia/shared/component-helper`:

- `isTrue` – Checked if a value was truthy by comparing `String(value) === 'true' || String(value) === '1'`. Replace with direct boolean checks (e.g. `value === true` or simply `value`).
- `toCamelCase` – Converted snake_case strings to camelCase.
- `toSnakeCase` – Converted PascalCase strings to snake_case.
- `matchAll` – Polyfill for `String.matchAll()`. Use the native `String.matchAll()` instead.
- `combineDetails` – Unused aria-details combiner helper. Use `combineDescribedBy` or `combineLabelledBy` instead.
- `keycode` – Key-to-keycode converter. Use `KeyboardEvent.key` instead.
- `EventEmitter` – Internal event emitter utility. No replacement needed.
- `ErrorHandler` – Broken error handler utility. No replacement needed.

The following functions have been removed from `@dnb/eufemia/shared/helpers`:

- `insertElementBeforeSelection` – Unused helper for inserting DOM elements before a text selection.
- `convertStatusToStateOnly` – Trivial helper. Replace `convertStatusToStateOnly(status, state)` with `status ? state : null`.
- `isEdge` / `IS_EDGE` – Edge is now Chromium-based, making these detections obsolete.

#### Removed HOCs and conversion utilities

The following Higher-Order Components (HOCs), conversion functions, and types have been removed:

- `withCamelCaseProps` – HOC that converted snake_case props to camelCase.
- `withSnakeCaseProps` – HOC that converted camelCase props to snake_case.
- `classWithSnakeCaseProps` – Class-based HOC that converted camelCase props to snake_case.
- `convertCamelCasePropsToSnakeCase` – Converted camelCase props to snake_case.
- `convertSnakeCaseProps` – Converted snake_case props to camelCase.

The following TypeScript types have also been removed:

- `ToCamelCase`, `ToCamelCasePartial`, `ToCamelCaseFlat`, `ToCamelCasePartialFlat`, `IncludeCamelCase`
- `ToSnakeCase`, `ToSnakeCasePartial`, `IncludeSnakeCase`
- `AssertNoMissing`, `KeysWithUnderscore`

These were previously used to support dual snake_case/camelCase prop naming. Since v11 uses camelCase exclusively, they are no longer needed.

#### Renamed helper functions

- `extendPropsWithContextInClassComponent` has been renamed to `extendExistingPropsWithContext`.

#### Updated SCSS mixin: `isFirefox` (formerly `IS_FF`)

The `IS_FF` SCSS mixin has been renamed to `isFirefox` (see [SCSS mixin renames](#scss-mixin-renames)). Its implementation now uses `@supports (-moz-appearance: none)` instead of the deprecated `@-moz-document url-prefix()` hack. The behavior is unchanged.

#### Removed SCSS mixins

The following SCSS mixins have been removed:

- **`extendFocusRing`** (`style/core/utilities.scss`) — added an outer ring on top of `focusRing`. Replace with a custom `box-shadow` if needed.
- **`componentReset`** (`style/core/scopes.scss`) — applied core CSS reset rules to a single component. Use the global Eufemia CSS reset instead.

#### CSS reset: IE and Edge (EdgeHTML) support removed

All IE- and legacy-Edge-specific CSS rules have been removed from `reset.scss` and component styles. This includes vendor-prefixed properties like `-ms-overflow-style`, `-ms-high-contrast`, and legacy Edge (EdgeHTML) hacks. Only modern evergreen browsers are supported. If you still need to support these browsers, you must add your own fallback styles.

## Eufemia Forms

> This section covers changes specific to `@dnb/eufemia/extensions/forms`. Many of these are **behavioral changes and removals** that require manual review.

### General

- `Form.Card` no longer enables `outset` by default.
- `Form.ButtonRow` no longer has automatic horizontal alignment styles when placed next to a `Card`. If you relied on this spacing, add explicit spacing (e.g. via `left` or `Space`).
- `Card.Provider` / `Form.Card.Provider` has been removed (including `disableCardBreakout`).
- Replace `Form.useErrorMessage` with your error messages as an object in the `errorMessages` property (e.g., with a `useMemo` hook).
- Replace `Form.useError` with `Form.useValidation`.
- Replace `Form.useLocale` with `Form.useTranslation`.
- Replace `internal.error` with `error`.
- Replace Form.Iterate label variable `{itemNr}` with `{itemNo}`.
- Replace `Form.FieldProps` with `Field.Provider`.
- Replace `<Card stack>...</Card>` with `<Form.Card>...</Form.Card>`.
- Replace `<Card>...</Card>` with `<Form.Card>...</Form.Card>`.
- Removed automatic horizontal card-content alignment for `Form.MainHeading` and `Form.SubHeading` when placed above a card.
- Replace `StepsLayout` with `Wizard.Container`.
- Replace `StepsLayout.Step` with `Wizard.Step`.
- Replace `StepsLayout.NextButton` with `Wizard.Buttons`.
- Replace `StepsLayout.PreviousButton` with `Wizard.Buttons`.
- Replace `StepsLayout.Buttons` with `Wizard.Buttons`.
- Replace `StepsLayout.useStep` with `Wizard.useStep`.
- Replace `Iterate.ArrayPushButton` with `Iterate.PushButton`.
- Replace `Iterate.ArrayRemoveElementButton` with `Iterate.RemoveButton`.

Docs: [Eufemia Forms](/uilib/extensions/forms/)

### Ajv no longer auto-instantiated

**Breaking Change**: Ajv is no longer automatically instantiated in Eufemia Forms v11. The `ajv` package is still included as a dependency, but Eufemia Forms no longer creates an Ajv instance for you. You must explicitly create one using `makeAjvInstance()` and pass it to `Form.Handler`. This enables tree-shaking of Ajv for applications that don't use JSON Schema validation.

**Migration Required**: If you use JSON Schema validation with Ajv, you must:

**Update your imports and usage**:

Before (v10):

```tsx
import { Form, Field, JSONSchema } from '@dnb/eufemia/extensions/forms'

const schema: JSONSchema = {
  type: 'object',
  properties: {
    myField: { type: 'string', minLength: 3 },
  },
  required: ['myField'],
}

function MyApp() {
  return (
    <Form.Handler schema={schema}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
```

After (v11):

```tsx
import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajvInstance = makeAjvInstance()
const schema: JSONSchema = {
  type: 'object',
  properties: {
    myField: { type: 'string', minLength: 3 },
  },
  required: ['myField'],
}

function MyApp() {
  return (
    <Form.Handler schema={schema} ajvInstance={ajvInstance}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
```

**Alternative**: Consider using Zod schemas instead, which provide better TypeScript integration and are included by default:

```tsx
import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myField: z.string().min(3),
})

function MyApp() {
  return (
    <Form.Handler schema={schema}>
      <Field.String path="/myField" label="Label" />
    </Form.Handler>
  )
}
```

### InputPassword moved to Field.Password

The `InputPassword` component has been moved to `Field.Password`, and is now a part of Eufemia Forms. Change your import statement from `import InputPassword from '@dnb/eufemia/components/input/InputPassword'` to `import { Field } from '@dnb/eufemia/extensions/forms'`.

Docs: [Input](/uilib/components/input/), [All Fields](/uilib/extensions/forms/all-fields/)

### Error handling

**FormError**

**validationRule**

```tsx
// From
new FormError('Invalid value', {
  validationRule: 'pattern',
})

// To
new FormError('Field.errorPattern')
```

- Remove the `validationRule` parameter in favor of a translation key, like so: `new FormError('Field.errorRequired')`.

**errorMessages** object

```tsx
// From
const errorMessages = {
  pattern: 'Show this when "pattern" fails!',
}

// To
const errorMessages = {
  'Field.errorPattern': 'Show this when "pattern" fails!',
}
```

- Replace `required` with `Field.errorRequired`.
- Replace `pattern` with `Field.errorPattern`.
- Replace `minLength` with `StringField.errorMinLength`.
- Replace `maxLength` with `StringField.errorMaxLength`.
- Replace `minimum` with `NumberField.errorMinimum`.
- Replace `maximum` with `NumberField.errorMaximum`.
- Replace `exclusiveMinimum` with `NumberField.errorExclusiveMinimum`.
- Replace `exclusiveMaximum` with `NumberField.errorExclusiveMaximum`.
- Replace `multipleOf` with `NumberField.errorMultipleOf`.

**useErrorMessage**

- Removed. Provide your error messages as an object in the `errorMessages` property (e.g., with a `useMemo` hook).

See also: [Form error messages](/uilib/extensions/forms/Form/error-messages/), [useValidation](/uilib/extensions/forms/Form/useValidation/)

### [Form.Visibility](/uilib/extensions/forms/Form/Visibility/)

- Replace `continuousValidation` with `validateContinuously`.
- Replace `withValue` with `hasValue`.
- Replace `pathValue` with using `visibleWhen`.
- Replace `whenValue` with using `visibleWhen`.

### Every `Field.*` component

#### Properties

- Replace `continuousValidation` with `validateContinuously`.
- Replace `validator` with `onChangeValidator`.
- Replace `focusWhenOpen` with `focusOnOpen`.

Docs: [All Fields](/uilib/extensions/forms/all-fields/)

### [Field.Date](/uilib/extensions/forms/feature-fields/Date/)

#### Properties

- Replace `opened` with `open`.

#### `onType` event

- Replace `start_date` with `startDate`.
- Replace `end_date` with `endDate`.
- Replace `is_valid` with `isValid`.

#### Styling

- Replace CSS class `dnb-date-picker--opened` with `dnb-date-picker--open`.

### [Field.Expiry](/uilib/extensions/forms/feature-fields/Expiry/)

#### Properties

- The visible expiry segments are no longer native `input` elements. They are now exposed as section elements with `role="spinbutton"`. If you have Jest or DOM tests that query `input` or assert old input-specific ARIA attributes, update them to target the visible expiry field/segments instead.

### [Field.PhoneNumber](/uilib/extensions/forms/feature-fields/PhoneNumber/)

#### E.164 value format (breaking)

The component now emits values in E.164 format: `"+4712345678"` instead of `"+47 12345678"`. This applies to `onChange`, `transformOut`, the data context, and pattern/schema validation.

**Migration:** If you relied on the space between the country code and the phone number, update your code to handle E.164 format. The `additionalArgs` second argument of `onChange` still provides `countryCode` and `phoneNumber` separately. Spaced values (e.g. `"+47 12345678"`) are not accepted as input to `Field.PhoneNumber` — use E.164 format without spaces. However, `Value.PhoneNumber` and `NumberFormat` do accept and format spaced values.

If you used a `pattern` or `schema` that matched the space-separated format (e.g. `^\+47 [49]+`), remove the space from your pattern (e.g. `^\+47[49]+`).

#### Auto-detection of country codes

The component now auto-detects country codes from E.164 values like `"+4712345678"` and `00`-prefixed values like `"004712345678"`. No `transformIn` is needed for standard formats.

#### `detectCountryCode` utility

A new `detectCountryCode` utility is available for detecting E.164 country codes from phone number strings.

```ts
import detectCountryCode from '@dnb/eufemia/shared/detectCountryCode'
```

#### Translations

- Replace `PhoneNumber.label` translation string with `PhoneNumber.numberLabel`.

### [Field.PostalCodeAndCity](/uilib/extensions/forms/feature-fields/PostalCodeAndCity/)

#### Properties

- Replace `country` with `countryCode`.

### [Field.Selection](/uilib/extensions/forms/base-fields/Selection/)

#### Properties

- The `radio-list` variant has been removed. Use a composition pattern with [List](/uilib/components/list/) to build custom radio layouts ([example](/uilib/extensions/forms/base-fields/Selection/#radio-with-list-composition)).

#### `autocompleteProps` property

See docs about changed [Autocomplete properties](/uilib/about-the-lib/releases/eufemia/v11-info/#autocomplete)

#### `dropdownProps` property

See docs about changed [Dropdown properties](/uilib/about-the-lib/releases/eufemia/v11-info/#dropdown)

#### `data` property

- Replace `selected_value` with `selectedValue`.
- Replace `suffix_value` with `suffixValue`.
- Replace `search_content` with `searchContent`.
- Replace `class_name` with `className`.

### [Field.Password](/uilib/extensions/forms/feature-fields/more-fields/Password/)

#### Properties

- Replace property `show_password` with translation `Password.ariaLabelShow`.
- Replace property `hide_password` with translation `Password.ariaLabelHide`.

#### Events

- Replace `on_show_password` with `onShowPassword`.
- Replace `on_hide_password` with `onHidePassword`.

### [Iterate.PushContainer](/uilib/extensions/forms/Iterate/PushContainer/)

#### Properties

- Replace `requireCommit` with `preventUncommittedChanges`.

### [Wizard.Container](/uilib/extensions/forms/Wizard/Container/)

#### Properties

- Remove `variant`. No longer has any variants.
- Remove `scrollTopOnStepChange`, as it's now enabled by default. You can disable it with `omitScrollManagement`.
- Remove `sidebarId`. No longer has any sidebar. If an id is needed, use the `id` property.

### Wizard.Provider

The `Wizard.Provider` export has changed. It now points to the `WizardContext` object itself instead of `WizardContext.Provider`, aligning with the React 19 deprecation of `<Context.Provider>`.

The JSX usage (`<Wizard.Provider value={...}>`) remains the same — no changes needed in your templates. However, if you reference `Wizard.Provider` programmatically (e.g., identity checks against `WizardContext.Provider`), be aware that it is now the context object itself.

### [Wizard.Step](/uilib/extensions/forms/Wizard/Step/)

#### Properties

- Replace `active` with `include`.
- Replace `activeWhen` with `includeWhen`.

### [DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/)

#### Properties

- Replace `filterSubmitData` by using the `filterData` function in the second event parameter of the `onSubmit` or `onChange` events.

## SCSS mixin renames

All SCSS mixins have been renamed to follow the **camelCase** naming convention. If you `@use` Eufemia's SCSS source files directly and reference these mixins, update your `@include` calls:

### Utilities (`style/core/utilities.scss`)

- Replace `focus-visible` with `focusVisible`.
- Replace `IS_FF` with `isFirefox`.
- Replace `IS_CHROME` with `isChrome`.
- Replace `IS_SAFARI_MOBILE` with `isSafariMobile`.
- Replace `IS_SAFARI_DESKTOP` with `isSafariDesktop`.

### Typography (`elements/typography/style/typography-mixins.scss`)

- Replace `headingSize_xx-large` with `headingSizeXxLarge`.
- Replace `headingSize_x-large` with `headingSizeXLarge`.
- Replace `headingSize_large` with `headingSizeLarge`.
- Replace `headingSize_medium` with `headingSizeMedium`.
- Replace `headingSize_basis` with `headingSizeBasis`.
- Replace `headingSize_small` with `headingSizeSmall`.
- Replace `headingSize_x-small` with `headingSizeXSmall`.
- Replace `typography_lead` with `typographyLead`.
- Replace `headingSpacing_xx-large` with `headingSpacingXxLarge`.
- Replace `headingSpacing_x-large` with `headingSpacingXLarge`.
- Replace `headingSpacing_large` with `headingSpacingLarge`.

### DrawerList (`fragments/drawer-list/style/dnb-drawer-list.scss`)

- Replace `closDrawerList` with `closeDrawerList` (typo fix).

## SCSS: `@import` → `@use`

Eufemia's internal SCSS has been migrated from the deprecated `@import` to the Sass module system (`@use` / `@forward`). This does not change the compiled CSS output, but affects consumers who import Eufemia's SCSS source files directly.

If you import Eufemia's SCSS utilities (e.g. for mixins or breakpoints), update your imports:

**Before:**

```scss
@import '@dnb/eufemia/style/core/utilities.scss';

@include allBelow(small) {
  // ...
}

div {
  max-width: map-get($breakpoints, medium);
}
```

**After:**

```scss
@use '@dnb/eufemia/style/core/utilities.scss' as utilities;

@include utilities.allBelow(small) {
  // ...
}

div {
  max-width: map-get(utilities.$breakpoints, medium);
}
```

Using `@import` with Eufemia's SCSS source files still works, but will trigger Sass deprecation warnings. We recommend migrating to `@use`.

If you previously had `silenceDeprecations: ['import']` in your Sass config to suppress warnings from Eufemia, you can now remove it — Eufemia's own files no longer use `@import`.

## TypeScript

Several exported TypeScript `interface` declarations have been converted to `type` aliases for consistency. This is only a breaking change if you relied on [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) to augment these interfaces. Standard usage of these types (e.g. importing and using them for props) is unaffected.

Affected types include:

- `AvatarGroupProps`
- `DataValueReadProps`, `DataValueWriteProps`, `UseFieldProps`, `ValueProps` (from `@dnb/eufemia/extensions/forms`)
- `PaymentCardRawData`, `CardDesign`, `PaymentCardProps` (from `@dnb/eufemia/extensions/payment-card`)
- `SharedStateReturn` (from `@dnb/eufemia/shared`)

### Context type renames

All React context value types have been renamed to use a consistent `...ContextValue` suffix. If you import any of these types directly, update your imports:

| Before                    | After                    |
| ------------------------- | ------------------------ |
| `AccordionContextProps`   | `AccordionContextValue`  |
| `TooltipContextProps`     | `TooltipContextValue`    |
| `HeadingContextProps`     | `HeadingContextValue`    |
| `DrawerListContextProps`  | `DrawerListContextValue` |
| `UploadContextProps`      | `UploadContextValue`     |
| `DatePickerContextValues` | `DatePickerContextValue` |
| `CardContextState`        | `CardContextValue`       |
| `SliderContextTypes`      | `SliderContextValue`     |
| `SkeletonContextProps`    | `SkeletonContextValue`   |

The `ListContext` type (which previously collided with the `ListContext` variable) has been renamed to `ListContextValue`.

### Stuttering type name renames

Several exported types had redundant/repeated words in their names. These have been cleaned up:

| Before                                | After                        |
| ------------------------------------- | ---------------------------- |
| `InputInputElement`                   | `InputElement`               |
| `TextareaTextareaElement`             | `TextareaElement`            |
| `PaginationIndicatorIndicatorElement` | `PaginationIndicatorElement` |
| `SpaceTypesType`                      | `SpaceSize`                  |
| `SpaceTypesPositiveValuesType`        | `SpacePositiveSize`          |
| `SpaceTypesPositiveRemValuesType`     | `SpacePositiveRemValue`      |

### Plural to singular type suffix

Types using a plural `Types` suffix have been renamed to use singular form for consistency:

| Before                        | After                    |
| ----------------------------- | ------------------------ |
| `SectionStyleTypes`           | `SectionStyle`           |
| `FormStatusIconTypes`         | `FormStatusIcon`         |
| `HeightAnimationOnStartTypes` | `HeightAnimationOnStart` |
| `HeightAnimationOnEndTypes`   | `HeightAnimationOnEnd`   |
| `SpaceStringTypes`            | `SpaceStringValue`       |
| `FilterPropsValidationTypes`  | `FilterPropsValidation`  |
| `DataAttributeTypes`          | `DataAttributes`         |
| `StateTypes`                  | `FieldState`             |
| `FormatTypes`                 | `FormatType`             |
| `UploadAcceptedFileTypes`     | `UploadAcceptedFiles`    |

### Non-prefixed type renames

Several exported types lacked a component namespace prefix, risking name collisions. They have been prefixed:

| Before                                  | After                               |
| --------------------------------------- | ----------------------------------- |
| `End`                                   | `FlexEnd`                           |
| `Start`                                 | `FlexStart`                         |
| `Spans`                                 | `FlexSpans`                         |
| `Span` (flex)                           | `FlexSpan`                          |
| `AllProps` (Iterate/EditContainer)      | `IterateEditContainerAllProps`      |
| `AllProps` (Iterate/ViewContainer)      | `IterateViewContainerAllProps`      |
| `AllProps` (Iterate/PushContainer)      | `IteratePushContainerAllProps`      |
| `AllProps` (Form/Section/EditContainer) | `FormSectionEditContainerAllProps`  |
| `AllProps` (Form/Section/ViewContainer) | `FormSectionViewContainerAllProps`  |
| `GroupProps`                            | `AccordionGroupProps`               |
| `StoreDataReturn`                       | `AccordionStoreDataReturn`          |
| `StoreOptions`                          | `AccordionStoreOptions`             |
| `TextColor`                             | `SectionTextColor`                  |
| `OutlineColor`                          | `SectionOutlineColor`               |
| `BackgroundColor`                       | `SectionBackgroundColor`            |
| `DropShadow`                            | `SectionDropShadow`                 |
| `RoundedCorner`                         | `SectionRoundedCorner`              |
| `TriggeredBy`                           | `ModalTriggeredBy`                  |
| `CloseHandler`                          | `ModalCloseHandler`                 |
| `CloseHandlerParams`                    | `ModalCloseHandlerParams`           |
| `TriggerAttributes` (modal)             | `ModalTriggerAttributes`            |
| `TriggerAttributes` (popover)           | `PopoverTriggerAttributes`          |
| `ValueTypes`                            | `SliderValue`                       |
| `NumberFormatTypes`                     | `SliderNumberFormat`                |
| `ThumbState`                            | `SliderThumbState`                  |
| `DummyProps`                            | `TabsDummyProps`                    |
| `ContentWrapperProps`                   | `TabsContentWrapperProps`           |
| `ContentWrapperSelectedKey`             | `TabsContentWrapperSelectedKey`     |
| `ContentWrapperChildren`                | `TabsContentWrapperChildren`        |
| `CustomContentProps`                    | `TabsCustomContentProps`            |
| `CustomContentTitle`                    | `TabsCustomContentTitle`            |
| `CustomContentChildren`                 | `TabsCustomContentChildren`         |
| `AutoSizeProps`                         | `SkeletonAutoSizeProps`             |
| `ElementsHiddenProps`                   | `AvatarElementsHiddenProps`         |
| `LoadButtonProps`                       | `PaginationLoadButtonProps`         |
| `InfinityScrollerProps`                 | `PaginationInfinityScrollerProps`   |
| `InfinityLoadButtonProps`               | `PaginationInfinityLoadButtonProps` |
| `CreatePaginationReturn`                | `PaginationCreateReturn`            |
| `DateType`                              | `DatePickerDateType`                |
| `CalendarDay`                           | `DatePickerCalendarDay`             |
| `CalendarNavigationEvent`               | `DatePickerCalendarNavigationEvent` |
| `CalendarView`                          | `DatePickerCalendarView`            |
| `ReturnObject`                          | `DatePickerReturnObject`            |
| `InvalidDates`                          | `DatePickerInvalidDates`            |
| `PartialDates`                          | `DatePickerPartialDates`            |
| `SubmittedDates`                        | `DatePickerSubmittedDates`          |
| `FormatType`                            | `NumberFormatType`                  |
| `FormatCurrencyPosition`                | `NumberFormatCurrencyPosition`      |
| `FormatReturnValue`                     | `NumberFormatReturnValue`           |
| `FormatValue`                           | `NumberFormatValue`                 |
| `FormatReturnType`                      | `NumberFormatReturnType`            |
| `FormatOptionParams`                    | `NumberFormatOptionParams`          |
| `FormatDateOptions`                     | `DateFormatOptions`                 |
| `RelativeTimeUnit`                      | `DateFormatRelativeTimeUnit`        |
| `StickyTableHeaderProps`                | `TableStickyHeaderProps`            |
| `SortState`                             | `TableSortState`                    |
| `SortEventHandler`                      | `TableSortEventHandler`             |
| `SortHandler`                           | `TableSortHandler`                  |
| `SubmitButtonProps`                     | `InputSubmitButtonProps`            |
| `CustomSize`                            | `ProgressIndicatorCustomSize`       |
| `TimeLineItemStates`                    | `TimelineItemState`                 |
| `Columns` (grid/Item)                   | `GridItemColumns`                   |
| `Span` (grid/Item)                      | `GridItemSpan`                      |
| `Media` (grid/Item)                     | `GridItemMedia`                     |
| `Columns` (grid/Container)              | `GridContainerColumns`              |
| `Media` (grid/Container)                | `GridContainerMedia`                |

### Typed event handlers

All untyped event handler and render function prop types (`(...args: any[]) => any`) have been replaced with properly typed signatures. This is only a breaking change if your existing callback types are incompatible with the new, stricter signatures.

New event types have been introduced for the affected components. You can import them directly:

```tsx
import type { AccordionChangeEvent } from '@dnb/eufemia/components/Accordion'
import type {
  TabsEvent,
  TabsRenderComponents,
} from '@dnb/eufemia/components/Tabs'
import type {
  ToggleButtonChangeEvent,
  ToggleButtonGroupChangeEvent,
} from '@dnb/eufemia/components/ToggleButton'
import type {
  DrawerListEvent,
  DrawerListChangeEvent,
  DrawerListSelectEvent,
  DrawerListResizeEvent,
} from '@dnb/eufemia/fragments/DrawerList'
```

Affected components and props:

#### Accordion

| Prop                      | Before                    | After                                    |
| ------------------------- | ------------------------- | ---------------------------------------- |
| `onChange`                | `(...args: any[]) => any` | `(event: AccordionChangeEvent) => void`  |
| `onInit` (AccordionGroup) | `(...args: any[]) => any` | `(accordion: AccordionInstance) => void` |

#### Tabs

| Prop           | Before                    | After                                                   |
| -------------- | ------------------------- | ------------------------------------------------------- |
| `onChange`     | `(...args: any[]) => any` | `(event: TabsEvent) => void`                            |
| `onClick`      | `(...args: any[]) => any` | `(event: TabsEvent) => void \| boolean`                 |
| `onMouseEnter` | `(...args: any[]) => any` | `(event: TabsEvent) => void`                            |
| `onFocus`      | `(...args: any[]) => any` | `(event: TabsEvent) => void`                            |
| `render`       | `(...args: any[]) => any` | `(components: TabsRenderComponents) => React.ReactNode` |

#### ToggleButton

| Prop       | Before                    | After                                      |
| ---------- | ------------------------- | ------------------------------------------ |
| `onChange` | `(...args: any[]) => any` | `(event: ToggleButtonChangeEvent) => void` |

#### ToggleButton.Group

| Prop       | Before                    | After                                           |
| ---------- | ------------------------- | ----------------------------------------------- |
| `onChange` | `(...args: any[]) => any` | `(event: ToggleButtonGroupChangeEvent) => void` |

#### DrawerList

| Prop          | Before                    | After                                               |
| ------------- | ------------------------- | --------------------------------------------------- |
| `onOpen`      | `(...args: any[]) => any` | `(event: DrawerListEvent) => void`                  |
| `onClose`     | `(...args: any[]) => any` | `(event: DrawerListEvent) => void`                  |
| `onChange`    | `(...args: any[]) => any` | `(event: DrawerListChangeEvent) => void`            |
| `onPreChange` | `(...args: any[]) => any` | `(event: DrawerListChangeEvent) => boolean \| void` |
| `onResize`    | `(...args: any[]) => any` | `(event: DrawerListResizeEvent) => void`            |
| `onSelect`    | `(...args: any[]) => any` | `(event: DrawerListSelectEvent) => void`            |

#### ProgressIndicator

| Prop         | Before                    | After        |
| ------------ | ------------------------- | ------------ |
| `onComplete` | `(...args: any[]) => any` | `() => void` |

#### Render function / children types

Several component types that accepted `(...args: any[]) => any` for render functions, children, or display elements have been narrowed to `() => React.ReactNode`. This affects types such as `AccordionHeaderTitle`, `AccordionHeaderDescription`, `NumberFormatPrefix`, `NumberFormatSuffix`, `NumberFormatTooltip`, `SkeletonFigure`, `SkeletonChildren`, `ToggleButtonSuffix`, `ToggleButtonChildren`, `ToggleButtonGroupSuffix`, `ToggleButtonGroupChildren`, `PaymentCardChildren`, `TextareaChildren`, and `PaginationIndicatorElement`.

## Theming

### Z-index CSS custom properties

All hardcoded `z-index` values across Eufemia components have been replaced with centralized CSS custom properties. If you have custom CSS that sets `z-index` to interact with Eufemia component layering, use these tokens instead of hardcoded values:

| CSS custom property  | Value  | Used for                               |
| -------------------- | ------ | -------------------------------------- |
| `--z-index-section`  | `1`    | Content sections                       |
| `--z-index-dropdown` | `100`  | Inline dropdowns, drawer lists         |
| `--z-index-popover`  | `1000` | Popovers, floating elements            |
| `--z-index-tooltip`  | `1100` | Tooltips (always above popovers)       |
| `--z-index-modal`    | `3000` | Dialogs, drawers, full-screen overlays |

You can override these on `:root` or any wrapper element to adjust Eufemia's layering within your application:

```css
:root {
  --z-index-modal: 5000; /* raise modals above a third-party widget */
}
```

- Replace import from path `style/themes/theme-ui/` with `style/themes/ui/`.
- Replace import from path `style/themes/theme-sbanken/` with `style/themes/sbanken/`.
- Replace import from path `style/themes/theme-eiendom/` with `style/themes/eiendom/`.
- Replace import from path `style/themes/theme-carnegie/` with `style/themes/carnegie/`.
- The **ui-theme-tags** CSS package has been removed. This package applied Eufemia styles to plain HTML tags (e.g. `<h1>`, `<ul>`) inside `.dnb-core-style`. Use class-based element selectors (e.g. `dnb-h--xx-large`) instead.
- The **ui-theme-fonts** CSS package has been removed. Font faces and properties are already included in **ui-theme-basis**, so a separate import is no longer needed.

## Props Type Exports

All `export type Props` declarations have been renamed to use a component-prefixed name to avoid ambiguity when re-exported through barrel files.

If you import `Props` types from component modules, update your imports to use the new names:

| Module path                             | Before  | After                      |
| --------------------------------------- | ------- | -------------------------- |
| `components/card`                       | `Props` | `CardProps`                |
| `components/flex/Horizontal`            | `Props` | `HorizontalProps`          |
| `components/flex/Stack`                 | `Props` | `StackProps`               |
| `components/flex/Vertical`              | `Props` | `VerticalProps`            |
| `extensions/forms/Field/String`         | `Props` | `FieldStringProps`         |
| `extensions/forms/Field/Number`         | `Props` | `FieldNumberProps`         |
| `extensions/forms/Field/Boolean`        | `Props` | `FieldBooleanProps`        |
| `extensions/forms/Field/Selection`      | `Props` | `FieldSelectionProps`      |
| `extensions/forms/Field/Toggle`         | `Props` | `FieldToggleProps`         |
| `extensions/forms/Value/String`         | `Props` | `ValueStringProps`         |
| `extensions/forms/Value/Number`         | `Props` | `ValueNumberProps`         |
| `extensions/forms/Form/Handler`         | `Props` | `FormHandlerProps`         |
| `extensions/forms/Iterate/Array`        | `Props` | `IterateArrayProps`        |
| `extensions/forms/Wizard/Step`          | `Props` | `WizardStepProps`          |
| `extensions/forms/FieldBlock`           | `Props` | `FieldBlockProps`          |
| `extensions/forms/ValueBlock`           | `Props` | `ValueBlockProps`          |
| `extensions/forms/DataContext/Provider` | `Props` | `DataContextProviderProps` |

The table above shows the most commonly used types. The same pattern applies to all Field, Value, Form, Iterate, and Wizard sub-components (91 types total).

For example, update:

```diff
-import type { Props as StringFieldProps } from '@dnb/eufemia/extensions/forms/Field/String'
+import type { FieldStringProps } from '@dnb/eufemia/extensions/forms/Field/String'
```

An ESLint rule (`naming-conventions/no-bare-props-export`) is now enforced to prevent re-introducing bare `Props` exports.

## `createSpacingClasses` replaced with `applySpacing`

The internal spacing helper `createSpacingClasses` has been removed and replaced by `applySpacing` that returns both the spacing CSS classes and any CSS custom properties in one call:

- `applySpacing(props, target)` – merges spacing into an existing props object (append to `className`, merge into `style`). Recommended for most component root elements.

It is re-exported from `@dnb/eufemia/components/space/SpacingUtils`.

Migrate usages as shown below.

**Before (v10):**

```tsx
import { createSpacingClasses } from '@dnb/eufemia/components/space/SpacingUtils'

const mainParams = {
  className: clsx(
    'dnb-my-component',
    createSpacingClasses(props),
    className
  ),
}
```

**After (v11):**

```tsx
import { applySpacing } from '@dnb/eufemia/components/space/SpacingUtils'

const mainParams = applySpacing(props, {
  className: clsx('dnb-my-component', className),
})
```

The output CSS classes (`dnb-space__top--large`, etc.) are unchanged, so no styling needs to be updated.

_April 21, 2026_
