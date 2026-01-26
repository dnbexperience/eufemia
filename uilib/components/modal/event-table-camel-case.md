---
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.411Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

<PropertiesTable props={ModalEvents} />

## Properties

<PropertiesTable props={ModalPropertiesWithSnakeCase} />

## Trigger Properties

Properties targeting the trigger component (Button), but they will be set the same way as all the other properties:

```tsx
render(
  <Modal
    triggerAttributes={{
      icon: 'bell',
    }}
    right="small"
  >
    ... content ...
  </Modal>
)
```

## Modal Translations

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

## Events

<PropertiesTable props={ModalEventsWithSnakeCase} />

## `triggeredBy`

The `triggeredBy` property is given when the `onClose` or the `onClosePrevent` event is triggered. It can contain one of the following values:

- `button`: The close button that triggered the event.
- `handler`: The `close` handler given by the function (as the content/children).
- `keyboard`: The escape key that triggered the event.
- `overlay`: The overlay element that triggered the event.
- `unmount`: The unmount event that triggered the `openState` property change.

### Selective on_close_prevent

```tsx
render(
  <Modal
    preventClose={true}
    onClosePrevent={({ triggeredBy, close /* id, event */ }) => {
      switch (triggeredBy) {
        case 'keyboard':
        case 'button':
          close()
          break
        case 'overlay': {
          const timeout = setTimeout(close, 1e3)
          return () => clearTimeout(timeout) // clear timeout on unmount
        }
      }
    }}
  >
    ...
  </Modal>
)
```
