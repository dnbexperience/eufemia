---
metadata: https://eufemia.dnb.no/uilib/components/modal/event-table/metadata.json
---

<PropertiesTable props={ModalEventsWithSnakeCase} />

## `triggeredBy`

The `triggeredBy` property is given when the `onClose` or the `onClosePrevent` event is triggered. It can contain one of the following values:

- `button`: The close button that triggered the event.
- `handler`: The `close` handler given by the function (as the content/children).
- `keyboard`: The escape key that triggered the event.
- `overlay`: The overlay element that triggered the event.
- `unmount`: The unmount event that triggered the `openState` property change.
