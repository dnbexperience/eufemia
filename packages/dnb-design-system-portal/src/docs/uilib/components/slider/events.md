---
showTabs: true
---

## Events

| Events        | Description                                                                                                                                                                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`    | _(optional)_ will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the prop `numberFormat` is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`. |
| `onDragStart` | _(optional)_ will be called once the user stops dragging. Returns `{ event }`.                                                                                                                                                                                                               |
| `onDragEnd`   | _(optional)_ will be called once the user starts dragging. Returns `{ event }`.                                                                                                                                                                                                              |
| ~~`onInit`~~  | _(optional)_ will be called once the component is ready to use. The callback `value` is a number `{ value }`.                                                                                                                                                                                |
