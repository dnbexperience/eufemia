---
title: 'VisuallyHidden'
description: 'VisuallyHidden has all the styles necessary to hide it from visual clients, but keep it for screen readers.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.602Z
checksum: 28d243b62406799fd86da1f9d89208ecb4b4735e8ed07aff554b859e2b71065c
---

# VisuallyHidden

## Import

```tsx
import { VisuallyHidden } from '@dnb/eufemia'
```

## Description

`VisuallyHidden` is a utility component that can be used to hide its children visually while keeping them visible to screen readers and other assistive technology. It uses the global helper class `.dnb-sr-only` under the hood.

**NOTE:** Many semantic elements, such as button elements, have meaning to assistive devices and browsers that provide context for the user and, in many cases, provide or restrict interactive behaviors. Use caution when overriding our defaults and make sure that the element you choose to render provides the same experience for all users. In short, the component shouldn't be used to hide interactive content.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/visually-hidden)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/visually-hidden)

## Demos

### VisuallyHidden

```tsx
render(
  <P>
    <span>before|</span>
    <VisuallyHidden>hidden content</VisuallyHidden>
    <span>|after</span>
  </P>
)
```

### VisuallyHidden with focusable content

Use `VisuallyHidden` with `focusable={true}` to visually hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). The container will be displayed when any child element of the container receives focus.

```tsx
render(
  <VisuallyHidden focusable>
    <Anchor href="/">Hidden, but focusable content</Anchor>
  </VisuallyHidden>
)
```

### VisuallyHidden with example of use case

```tsx
render(
  <Anchor href="/">
    Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
  </Anchor>
)
```

### VisuallyHidden with custom element

```tsx
const Box = styled.div`
  width: 1rem;
  height: 1rem;
`
const BoxBefore = styled(Box)`
  background-color: var(--color-summer-green);
`
const BoxAfter = styled(Box)`
  background-color: var(--color-emerald-green);
`
render(
  <>
    <BoxBefore />
    <VisuallyHidden aria-label="I'm a region" element={Section}>
      <P>but, not visible to you!</P>
    </VisuallyHidden>
    <BoxAfter />
  </>
)
```

## Properties

```json
{
  "focusable": {
    "doc": "Set to `true` to hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user) root. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "element": {
    "doc": "Custom root HTML element for the component. Defaults to `<span>`.",
    "type": ["string", "React.Element"],
    "status": "optional"
  }
}
```
