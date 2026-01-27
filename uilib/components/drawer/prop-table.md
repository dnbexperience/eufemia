---
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.702Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

```json
{
  "props": {
    "containerPlacement": {
      "doc": "Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.",
      "type": ["left", "right", "top", "bottom"],
      "status": "optional"
    },
    "title": {
      "doc": "The drawer title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "className": {
      "doc": "Give the Drawer content a class name (maps to `dnb-drawer`).",
      "type": "string",
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the drawer content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventCoreStyle": {
      "doc": "By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "navContent": {
      "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": ["left", "right", "centered", "center"],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": ["boolean", "string"],
      "status": "optional"
    }
  }
}
```

## Properties

```json
{
  "props": {
    "containerPlacement": {
      "doc": "Defines on what side the Drawer should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.",
      "type": ["left", "right", "top", "bottom"],
      "status": "optional"
    },
    "title": {
      "doc": "The drawer title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Drawer content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Drawer content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "className": {
      "doc": "Give the Drawer content a class name (maps to `dnb-drawer`).",
      "type": "string",
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the drawer content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventCoreStyle": {
      "doc": "By default the drawer content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "navContent": {
      "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the drawer.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": ["left", "right", "centered", "center"],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the drawer content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": ["boolean", "string"],
      "status": "optional"
    }
  }
}
```

### More properties

The properties of [Modal](/uilib/components/modal) formatted as camel case are also provided.
See the table below:

<PropertiesTable props={ModalProperties} />

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Modal.close_title": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "Modal.dialog_title": {
      "nb-NO": "Separat Vindu",
      "en-GB": "Dialog Window",
      "sv-SE": "Separat Fönster",
      "da-DK": "Separat vindue"
    }
  }
}
```

### Drawer sizes

The Drawer is responsive with the following properties:

```css
--drawer-width: 40vw;
--drawer-min-width: 384px;
--drawer-max-width: 40rem;
```

## Events

Drawer includes the same events as [Modal](/uilib/components/modal), only formatted as camel case.

<PropertiesTable props={ModalEvents} />
