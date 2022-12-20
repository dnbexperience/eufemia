---
showTabs: true
---

## Events

Events are a part of the accordion feature and needs to be enabled with the `accordion` property on the main Table.

| Events     | Description                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `onClick`  | _(optional)_ will emit when user clicks/expands the table row. Returns a native click.                                                 |
| `onOpened` | _(optional)_ Will emit when table row is expanded. Returns an object with the table row as the target: `{ target }`.                   |
| `onClosed` | _(optional)_ Will emit when table row is closed (after it was open). Returns an object with the table row as the target: `{ target }`. |
