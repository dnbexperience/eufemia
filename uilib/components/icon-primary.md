---
title: 'IconPrimary'
description: 'The IconPrimary component loads by default all the primary icons used internally in the components.'
metadata: https://eufemia.dnb.no/uilib/components/icon-primary/metadata.json
---

## Import

```tsx
import { IconPrimary } from '@dnb/eufemia'
```

## Description

The IconPrimary component loads by default all [Primary Icons](/icons/primary) so they can easily be included and used without additionally importing every icon.

There is also the basic [Icon](/uilib/components/icon/) component, you can use for all other kinds of graphical icons.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/icon-primary)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/icon-primary)

## Demos

### Default and Medium-sized icons (responsive)

```tsx
<IconPrimary icon="question" title="Give icons a title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>
```

### Default Icon with custom, but fixed size (64)

```tsx
render(
  <IconPrimary icon="question" size="64" title="I'm not responsive!" />,
)
```
