---
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.660Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

```tsx
render(
  <Drawer openState="opened">
    <CopyOnClick>I'm inside the drawer</CopyOnClick>
  </Drawer>
)
```

## Properties

```json
{
  "props": {
    "showCursor": {
      "doc": "Define if the copy cursor should be visible. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "If `true`, the copy functionality and copy cursor will be omitted. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copyContent": {
      "doc": "Contents to copy. Used when the copied value should differ from the visually shown value(`children`).",
      "type": "React.Node",
      "status": "optional"
    },
    "tooltipContent": {
      "doc": "The message shown in the tooltip when the content is copied. Defaults to the translation `CopyOnClick.clipboard_copy`.",
      "type": "React.Node",
      "status": "optional"
    },
    "children": {
      "doc": "Contents.",
      "type": "React.Node",
      "status": "required"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "CopyOnClick.clipboard_copy": {
      "nb-NO": "Kopiert",
      "en-GB": "Copied",
      "sv-SE": "Kopierad",
      "da-DK": "Kopieret"
    }
  }
}
```
