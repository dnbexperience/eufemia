---
title: 'HelpButton'
description: 'A help button with custom semantics, helping screen readers determine the meaning of that button.'
metadata: https://eufemia.dnb.no/uilib/components/help-button/metadata.json
---

## Import

```tsx
import { HelpButton } from '@dnb/eufemia'
```

## Description

A help button with custom semantics, helping screen readers determine the meaning of the button. Visually, it is a default [icon button](/uilib/components/button#icon-button) with the `question` icon as its basis.

This button is used as the default [Modal trigger button](/uilib/components/modal/demos).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=43836-5699)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/help-button)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/help-button)

## Demos

### Default HelpButton

```tsx
render(<HelpButton>Text</HelpButton>)
```

### Help button inside a suffix

```tsx
render(
  <Input
    size={10}
    placeholder="Input ..."
    suffix={<HelpButton title="Custom title">Text</HelpButton>}
  />,
)
```

### Help button in different sizes

```tsx
<HelpButton title="Custom title">Text</HelpButton>
<HelpButton
  size="small"
  left
  on_click={() => {
    console.log('on_click')
  }}
>
  Text
</HelpButton>
```

### Help button with an information icon

```tsx
render(
  <HelpButton icon="information" tooltip="More info">
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <Dd>Description</Dd>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
    </Dl>
  </HelpButton>,
)
```

### Help button used inside text

```tsx
render(
  <span>
    Text <HelpButton>Text</HelpButton> Text
  </span>,
)
```
