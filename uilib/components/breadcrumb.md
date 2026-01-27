---
title: 'Breadcrumb'
description: 'The Breadcrumb component is a bar for navigation showing current web path.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.634Z
checksum: 2d81d07f6c96525a1e6f3d0128462d27621080b2c5411a2e8ef86321138b9f36
---

# Breadcrumb

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
  </Breadcrumb>
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
  />
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

## Properties

### `Breadcrumb` properties

```json
{
  "props": {
    "data": {
      "doc": "List of pages to render as breadcrumbitems. Each object in data can include all properties from [BreadcrumbItem properties](/uilib/components/breadcrumb/properties#breadcrumbitem-properties).",
      "type": "Array<BreadcrumbItemProps>",
      "status": "optional"
    },
    "children": {
      "doc": "Content of the component. Can be used instead of property `data`, by adding Breadcrumbitem children `<Breadcrumb.Item {...props} />`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "variant": {
      "doc": "Defaults to 'responsive' or 'single' depending on content. Options: `responsive` | `single` | `multiple` | `collapse` .",
      "type": ["responsive", "single", "multiple", "collapse"],
      "status": "optional"
    },
    "href": {
      "doc": "For variant `single`, set `href` for button click. Can be used instead of event/property `onClick`.",
      "type": "string",
      "status": "optional"
    },
    "navText": {
      "doc": "Every `<nav>` on a page needs an unique aria-label text.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "goBackText": {
      "doc": "Override with a custom 'Back' text for variant `single` (Not recommended).",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "homeText": {
      "doc": "Override with a custom 'Home' text (Not recommended)",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "backToText": {
      "doc": "Override with a custom 'Back to...' text (Not recommended).",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "styleType": {
      "doc": "Use one of the Section component style types (style_type). Defaults to `transparent`.",
      "type": "Various",
      "status": "optional"
    },
    "collapsedStyleType": {
      "doc": "Use one of the Section component variants. Defaults to `info`.",
      "type": ["error", "info", "warning", "success"],
      "status": "optional"
    },
    "className": {
      "doc": "Custom className for the component root.",
      "type": "string",
      "status": "optional"
    },
    "isCollapsed": {
      "doc": "For variant `collapse`, override isCollapsed for the collapsed content by updating this value using the provided property `onClick`.",
      "type": "boolean",
      "status": "optional"
    },
    "spacing": {
      "doc": "Include spacing properties from [Section](/uilib/components/section/properties) in breadcrumb. If only `true` is given, the spacing will be `small`. Defaults to `false`.",
      "type": "Various",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `Breadcrumb.Item` properties

```json
{
  "props": {
    "text": {
      "doc": "Text displaying inside Breadcrumb item.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "variant": {
      "doc": "The component variant. Options: `home` | `previous` | `current`.",
      "type": ["home", "previous", "current"],
      "status": "optional"
    },
    "icon": {
      "doc": "Override icon displaying on the left side (Not recommended). Default: `chevron_left`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "href": {
      "doc": "Set what happens when the user clicks on the item. Also see `onClick` event.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

**NB:** When interactive, the item is an inherited [Button](/uilib/components/button/). You can therefore swap out the underlying HTML element, by providing a new `element` or use other Button properties, such as `to` instead of `href`.

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Breadcrumb.backToText": {
      "nb-NO": "Tilbake til...",
      "en-GB": "Back to...",
      "sv-SE": "Tillbaka till...",
      "da-DK": "Tilbage til..."
    },
    "Breadcrumb.goBackText": {
      "nb-NO": "Tilbake",
      "en-GB": "Back",
      "sv-SE": "Tillbaka",
      "da-DK": "Tilbage"
    },
    "Breadcrumb.homeText": {
      "nb-NO": "Hjem",
      "en-GB": "Home",
      "sv-SE": "Hem",
      "da-DK": "Hjem"
    },
    "Breadcrumb.navText": {
      "nb-NO": "Sidehierarki",
      "en-GB": "Page hierarchy",
      "sv-SE": "Sidstruktur",
      "da-DK": "Sidehierarki"
    }
  }
}
```

## `Breadcrumb` events

```json
{
  "props": {
    "onClick": {
      "doc": "Will be called by user click interaction, to handle click event on \"Back\" for variant `single` and \"Back to...\" for variant `collapse`.",
      "type": "function",
      "status": "optional"
    },
    "onToggle": {
      "doc": "Will be called when breadcrumb expands or collapses.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

## `Breadcrumb.Item` events

```json
{
  "props": {
    "onClick": {
      "doc": "Will be called by user click interaction.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
