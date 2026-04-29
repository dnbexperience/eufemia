---
title: 'Menu'
description: 'Menu is a composable dropdown menu component for actions and navigation, with keyboard navigation, nested menus, and full accessibility support.'
version: 11.0.4
generatedAt: 2026-04-29T19:30:10.851Z
checksum: 1fc99517592ef537de08c221f7492a20a5f0da34d4c6422f3025968fc4f94199
---

# Menu

## Import

```tsx
import { Menu } from '@dnb/eufemia'
```

## Description

Menu provides an accessible dropdown menu for actions and navigation with a composable, tree-shakeable API.

Use `Menu.Root` as the wrapper, `Menu.Button` for the trigger, `Menu.List` for the list container, `Menu.Action` for individual items, and `Menu.Divider` for visual separators.

`Menu.Button` supports all [Button](/uilib/components/button/properties) props (e.g. `text`, `icon`, `variant`, `size`, `disabled`), so you can customise the trigger the same way you would with a regular Button.

Nested menus are supported by nesting another `Menu.Root` inside `Menu.List` — use a `Menu.Action` as the direct child of the nested `Menu.Root` to serve as the sub-menu trigger.

For inline expandable groups, use `Menu.Accordion` instead of a nested `Menu.Root`. It reveals child items with a height animation inside the current menu, rather than opening a separate popover.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/menu)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/menu)

## Accessibility

- The menu uses ARIA `role="menu"` and `role="menuitem"` semantics.
- The trigger receives `aria-haspopup="menu"` and `aria-expanded` attributes automatically.
- Keyboard navigation follows the [WAI-ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apd/patterns/menu/):
  - **Arrow Up/Down**: Move focus between items (wraps around).
  - **Home/End**: Jump to first/last item.
  - **Enter/Space**: Activate the focused item.
  - **Escape**: Close the menu.
  - **Tab**: Close the menu and move focus naturally.
  - **Arrow Right**: Open a sub-menu (when the item has one).
  - **Arrow Left**: Close a sub-menu and return to the parent.
- Type-ahead: pressing a letter key jumps to the first matching item.
- Focus is moved to the menu container when it opens. Arrow keys then move focus to individual items. Focus returns to the trigger when the menu closes.
- Disabled items receive `aria-disabled` and are skipped during keyboard navigation.
- Dividers use `role="separator"`.

## Demos

### Basic Menu

```tsx
render(
  <Menu.Root>
    <Menu.Button />
    <Menu.List>
      <Menu.Action text="Action" onClick={() => null} />
      <Menu.Action text="Link" href="https://www.dnb.no/" />
    </Menu.List>
  </Menu.Root>
)
```

### Accordion

```tsx
render(
  <Menu.Root>
    <Menu.Button text="File" icon="chevron_down" />
    <Menu.List>
      <Menu.Action
        icon={file_add}
        text="New"
        onClick={() => console.log('new')}
      />
      <Menu.Action
        icon={folder}
        text="Open"
        onClick={() => console.log('open')}
      />
      <Menu.Divider />

      <Menu.Accordion icon={folder} text="Export as">
        <Menu.Action
          icon={file_pdf}
          text="PDF"
          onClick={() => console.log('export pdf')}
        />
        <Menu.Action
          icon={file_png}
          text="PNG"
          onClick={() => console.log('export png')}
        />
      </Menu.Accordion>

      <Menu.Divider />
      <Menu.Action
        icon={save}
        text="Save"
        onClick={() => console.log('save')}
      />
    </Menu.List>
  </Menu.Root>
)
```

### Nested Menu

```tsx
render(
  <Menu.Root arrowPosition="left">
    <Menu.Button text="File" icon="chevron_down" />
    <Menu.List>
      <Menu.Action
        icon={file_add}
        text="New"
        onClick={() => console.log('new')}
      />
      <Menu.Action
        icon={folder}
        text="Open"
        onClick={() => console.log('open')}
      />
      <Menu.Divider />

      <Menu.Root placement="right" arrowPosition="top">
        <Menu.Action icon={folder} text="Export as" />
        <Menu.List>
          <Menu.Action
            icon={file_pdf}
            text="PDF"
            onClick={() => console.log('export pdf')}
          />
          <Menu.Action
            icon={file_png}
            text="PNG"
            onClick={() => console.log('export png')}
          />
          <Menu.Action
            icon={file}
            text="SVG"
            onClick={() => console.log('export svg')}
          />
        </Menu.List>
      </Menu.Root>

      <Menu.Divider />
      <Menu.Action
        icon="close"
        text="Close"
        onClick={() => console.log('close')}
      />
    </Menu.List>
  </Menu.Root>
)
```

### With Links

```tsx
render(
  <Menu.Root>
    <Menu.Button text="Navigate" icon="chevron_down" variant="tertiary" />
    <Menu.List>
      <Menu.Action icon={home} text="Home" href="/" />
      <Menu.Action icon={layout_card} text="Dashboard" href="/dashboard" />
      <Menu.Action
        icon={launch}
        text="External"
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Menu.List>
  </Menu.Root>
)
```

### Max Visible List Items

```tsx
render(
  <Menu.Root>
    <Menu.Button text="Long list" icon="chevron_down" />
    <Menu.List maxVisibleListItems={4}>
      <Menu.Action text="Item 1" />
      <Menu.Action text="Item 2" />
      <Menu.Action text="Item 3" />
      <Menu.Action text="Item 4" />
      <Menu.Action text="Item 5" />
      <Menu.Action text="Item 6" />
      <Menu.Action text="Item 7" />
      <Menu.Action text="Item 8" />
    </Menu.List>
  </Menu.Root>
)
```

### With Headers

```tsx
render(
  <Menu.Root>
    <Menu.Button text="Edit" icon="chevron_down" />
    <Menu.List>
      <Menu.Header text="Clipboard" />
      <Menu.Action
        icon={scissors}
        text="Cut"
        onClick={() => console.log('cut')}
      />
      <Menu.Action
        icon={copy}
        text="Copy"
        onClick={() => console.log('copy')}
      />
      <Menu.Action icon={edit} text="Paste" disabled />
      <Menu.Divider />
      <Menu.Header text="Selection" />
      <Menu.Action icon="check" text="Select All" />
    </Menu.List>
  </Menu.Root>
)
```

## Menu.Root

```json
{
  "props": {
    "open": {
      "doc": "Controlled open state. Use together with `onOpenChange`.",
      "type": "boolean",
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Position of the popover arrow relative to the popover. `top` and `bottom` positions are only applicable when `placement` is `left` or `right`, and vice versa.",
      "type": [
        "\"left\"",
        "\"right\"",
        "\"center\"",
        "\"top\"",
        "\"bottom\""
      ],
      "defaultValue": "\"center\"",
      "status": "optional"
    },
    "placement": {
      "doc": "Preferred placement of the menu relative to the trigger.",
      "type": ["\"top\"", "\"right\"", "\"bottom\"", "\"left\""],
      "defaultValue": "\"bottom\"",
      "status": "optional"
    },
    "autoAlignMode": {
      "doc": "Control when the menu automatically flips its placement to fit within the viewport. `\"initial\"`: flip only on open. `\"scroll\"`: also flip during scroll. `\"never\"`: always use specified placement.",
      "type": ["\"initial\"", "\"scroll\"", "\"never\""],
      "defaultValue": "\"initial\"",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "Render inline instead of inside a portal.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "Disable the open/close animation.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    }
  }
}
```

## Menu.Button

```json
{
  "props": {
    "icon": {
      "doc": "Icon displayed on the trigger button.",
      "type": "IconIcon",
      "defaultValue": "\"more\"",
      "status": "optional"
    },
    "variant": {
      "doc": "Button variant.",
      "type": ["\"primary\"", "\"secondary\"", "\"tertiary\""],
      "defaultValue": "\"secondary\"",
      "status": "optional"
    },
    "text": {
      "doc": "Visible text label for the trigger button.",
      "type": "string",
      "status": "optional"
    },
    "[Button props]": {
      "doc": "All [Button](/uilib/components/button/properties) props are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## Menu.List

```json
{
  "props": {
    "children": {
      "doc": "Menu items. Use `Menu.Action` and `Menu.Divider` as direct children.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "maxVisibleListItems": {
      "doc": "Sets the maximum visible list items before the content scrolls. The component measures the rendered height of the first visible items. An explicit `style.maxHeight` overrides this.",
      "type": "number",
      "status": "optional"
    }
  }
}
```

## Menu.Action

```json
{
  "props": {
    "text": {
      "doc": "Action label text.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon": {
      "doc": "Icon displayed before the text.",
      "type": "IconIcon",
      "status": "optional"
    },
    "href": {
      "doc": "When provided, the action renders as a link.",
      "type": "string",
      "status": "optional"
    },
    "to": {
      "doc": "Use this property when using a router Link component as the `element`. The `to` value is passed to the router element for client-side navigation.",
      "type": "string",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML or React element should be used for the link (e.g. `element={Link}` for a router Link component). Defaults to a semantic `a` element.",
      "type": "React.Element",
      "status": "optional"
    },
    "target": {
      "doc": "Link target attribute (e.g. `_blank`).",
      "type": "string",
      "status": "optional"
    },
    "rel": {
      "doc": "Link rel attribute (e.g. `noopener noreferrer`).",
      "type": "string",
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the action. Sets `aria-disabled` and prevents click/keyboard activation.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "children": {
      "doc": "Custom content rendered inside the action item.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```

## Menu.Accordion

```json
{
  "props": {
    "text": {
      "doc": "Accordion trigger label text.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon": {
      "doc": "Icon displayed before the text.",
      "type": "IconIcon",
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the accordion trigger. Sets `aria-disabled` and prevents toggling.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "children": {
      "doc": "Menu items rendered inside the accordion when open. Use `Menu.Action` and `Menu.Divider` as children.",
      "type": "React.ReactNode",
      "status": "required"
    }
  }
}
```

## Menu.Header

```json
{
  "props": {
    "text": {
      "doc": "Header text displayed in the menu.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "children": {
      "doc": "Alternative to `text`. Content rendered inside the header.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```

## Menu.Divider

No properties.

## Menu.Root Events

```json
{
  "props": {
    "onOpenChange": {
      "doc": "Called whenever the open state changes. Receives the new open state as a boolean.",
      "type": "(open: boolean) => void",
      "status": "optional"
    }
  }
}
```

## Menu.Action Events

```json
{
  "props": {
    "onClick": {
      "doc": "Called when the action is clicked or activated via keyboard (Enter/Space). The menu closes automatically after the handler is invoked unless used as a trigger for a nested `Menu.Root`.",
      "type": "(event: React.MouseEvent<HTMLLIElement>) => void",
      "status": "optional"
    }
  }
}
```

## Menu.Accordion Events

```json
{
  "props": {
    "onOpenChange": {
      "doc": "Called whenever the accordion open state changes. Receives the new open state as a boolean.",
      "type": "(open: boolean) => void",
      "status": "optional"
    }
  }
}
```
