---
showTabs: true
---

## Events

| Events          | Description                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change`     | _(optional)_ will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the prop `number_format` is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`. |
| `on_drag_start` | _(optional)_ will be called once the user stops dragging. Returns `{ event }`.                                                                                                                                                                                                                |
| `on_drag_end`   | _(optional)_ will be called once the user starts dragging. Returns `{ event }`.                                                                                                                                                                                                               |
| ~~`on_init`~~   | _(optional)_ will be called once the component is ready to use. The callback `value` is a number `{ value }`.                                                                                                                                                                                 |
