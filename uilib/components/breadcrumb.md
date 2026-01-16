---
title: 'Breadcrumb'
description: 'The Breadcrumb component is a bar for navigation showing current web path.'
metadata: https://eufemia.dnb.no/uilib/components/breadcrumb/metadata.json
---

## Import

```tsx
import { Breadcrumb } from '@dnb/eufemia'
```

## Description

The Breadcrumb is a component for navigation and for showing the current website path or tree.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=17025-0)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/breadcrumb)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/breadcrumb)

## Demos

### Breadcrumb

To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to `data`. If you have other specific cases, check out how to customize with [children in Breadcrumb](/uilib/components/breadcrumb/#pages-as-child-components).

```tsx
// You can also import pages from a store and only do a remapping
const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
  {
    text: 'Breadcrumbs',
    href: '/uilib/components/breadcrumbs',
  },
]
render(<Breadcrumb data={pages} spacing />)
```

- The first item, `Home`, gets assigned a home icon and an appropriate text label based on the current locale.
- The last item in pages will be static text, corresponding to the current page.
- Breadcrumb will collapse on small screens

### Pages as child components

For customizing the Breadcrumb to fit your needs, you can add each page as a child component.

```tsx
render(
  <Breadcrumb spacing>
    <Breadcrumb.Item
      onClick={() => {
        console.log('go home!')
      }}
      variant="home"
    />
    <Breadcrumb.Item
      text="Page item"
      onClick={() => {
        console.log('go to page 1')
      }}
    />
    <Breadcrumb.Item
      text="Page item"
      onClick={() => {
        console.log('go to page 2')
      }}
      variant="current"
    />
  </Breadcrumb>,
)
```

### Single Breadcrumb

When you only want a single button for `back`.

```tsx
render(
  <Breadcrumb
    onClick={() => {
      console.log('Going back!')
    }}
  />,
)
```

This can also be forced using the `variant="single"` property.

### Always be collapsed (`variant="collapse"`)

Expands when user clicks

```tsx
const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
]
render(<Breadcrumb variant="collapse" data={pages} spacing />)
```

### Never collapse (`variant="multiple"`)

```tsx
const pages = [
  {
    text: '',
    href: '/',
  },
  {
    text: 'UI Library',
    href: '/uilib',
  },
  {
    text: 'Components',
    href: '/uilib/components',
  },
  {
    text: 'Breadcrumbs',
    href: '/uilib/components/breadcrumbs',
  },
]
render(<Breadcrumb variant="multiple" data={pages} spacing />)
```
