---
title: 'PortalRoot'
description: 'PortalRoot is a React component that helps you make React Portals.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.889Z
checksum: 38d092b4ad2fd4f7fdae39a7c2361f67a11171d1a440dd483dfe3306f64e0d50
---

# PortalRoot

## Import

```tsx
import { PortalRoot } from '@dnb/eufemia'
```

## Description

`PortalRoot` is a React component that helps you make React's [createPortal](https://react.dev/reference/react-dom/createPortal).

It lets you render some children into a different part of the DOM.

### Good to know

- It contains CSS styles and screen reader accessibility features needed for proper usage of portals.
- It comes with support for [style isolation](/uilib/usage/customisation/styling/style-isolation/).
- Everything inside the `PortalRoot` can later be customized and stacked on top of each other using CSS `z-index`.
- It is used in other components, like [Tooltip](/uilib/components/tooltip), [Modal](/uilib/components/modal), [TermDefinition](/uilib/components/term-definition) and [DatePicker's calendar](/uilib/components/date-picker).
- A wrapper is inserted automatically as a child node to the HTML `<body>` or the `<IsolatedStyleScope scopeHash="your-scope" />` element.
- It adds `dnb-core-style` class to the portal element, so you do not need to deal with that yourself.
- In order to remove it from the accessibility tree, it uses `role="presentation"`. That means, when your content is visible, you need to set focus to it, so screen readers can read it.
- `PortalRoot` props override values from `PortalRoot.Provider` if both are present.
- `beforeSelector` takes precedence over `insideSelector` when both are provided on the same level.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/portal-root)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/portal-root)

## Usage

For basic usage, just wrap your content with the `PortalRoot` component:

```tsx
import { PortalRoot } from '@dnb/eufemia'

render(<PortalRoot>Your content</PortalRoot>)
```

It will create a wrapper div and insert it as a child node to the HTML `<body>` element:

```html
<body>
  <!-- The portal root will be inserted here -->
  <!-- Other content -->
</body>
```

## Define where the portal root should be rendered

Sometimes you might want to have more control over where the portal root element is placed in the HTML structure.

To achieve this, you can create an element in your HTML with the id `eufemia-portal-root`:

```html
<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="eufemia-portal-root" />
  </div>
</body>
```

### Customize with id property

You can also customize the portal root element by passing a custom `id` property to the `PortalRoot` component:

```tsx
import { PortalRoot } from '@dnb/eufemia'

// This will use the existing element with id="my-custom-portal-root"
render(<PortalRoot id="my-custom-portal-root">Your content</PortalRoot>)
```

This will create or reuse an element with the specified id in the HTML structure:

```html
<body>
  <div class="with-something-else">
    <div id="app" />
    <div id="my-custom-portal-root" />
  </div>
</body>
```

### Without pre-existing element

If you are not able to modify the HTML structure, you can make use of the `beforeSelector` or `insideSelector` property to define where the portal root should be placed.

You can pass these selectors directly to `PortalRoot`:

```tsx
import { PortalRoot } from '@dnb/eufemia'

// Insert the portal root before the element with id="my-custom-id"
render(
  <PortalRoot beforeSelector="#my-custom-id">Your content</PortalRoot>
)

// Insert the portal root as the first child inside the element with class="my-selector"
render(<PortalRoot insideSelector=".my-selector">Your content</PortalRoot>)
```

### Customize properties via provider (context)

You can also pass properties to each `PortalRoot` by using the `PortalRoot.Provider`.

In this example, the `DatePicker` component renders its portal content before the element with the id `my-custom-id`.

```tsx
import { PortalRoot, DatePicker } from '@dnb/eufemia'

render(
  <PortalRoot.Provider beforeSelector="#my-custom-id">
    <DatePicker />
  </PortalRoot.Provider>
)
```

This makes the `DatePicker` render its portal content right before `my-custom-id`.

```html
<body>
  <div class="with-something-else">
    <!-- The portal root will be inserted here -->
    <div id="my-custom-id" />
  </div>
</body>
```

## Properties

```json
{
  "props": {
    "innerRef": {
      "doc": "The ref of the element that will be used.",
      "type": [
        "React.Ref<HTMLElement>",
        "React.MutableRefObject<HTMLElement>"
      ],
      "status": "optional"
    },
    "id": {
      "doc": "The id attribute for the portal root element.",
      "type": "string",
      "status": "optional"
    },
    "insideSelector": {
      "doc": "CSS selector for a container to place the portal root inside. The portal element is inserted as the first child of the matched element.",
      "type": "string",
      "status": "optional"
    },
    "beforeSelector": {
      "doc": "CSS selector for a target element; the portal root will be inserted directly before the first matched element.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "The content that will be placed in a React Portal.",
      "type": "ReactNode",
      "status": "required"
    }
  }
}
```
