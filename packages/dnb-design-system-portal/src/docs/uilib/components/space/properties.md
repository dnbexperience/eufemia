---
showTabs: true
---

## Properties

| Properties | Description                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `top`      | _(optional)_ will use `margin-top`                                                                                                                                                                     |
| `left`     | _(optional)_ will use `margin-left`                                                                                                                                                                    |
| `bottom`   | _(optional)_ will use `margin-bottom`                                                                                                                                                                  |
| `right`    | _(optional)_ will use `margin-right`                                                                                                                                                                   |
| `element`  | _(optional)_ defines the HTML element used. Defaults to `div`.                                                                                                                                         |
| `inline`   | _(optional)_ if set to `true`, then `display: inline-block;` is used, so the HTML elements gets aligned horizontally. Defaults to `false`.                                                             |
| `collapse` | _(optional)_ if set to `false`, then a wrapper with `display: flow-root;` is used. This way You avoid **Margin Collapsing**. Defaults to `true`. _Note:_ You can't use `inline="true"` in combination. |

## Zero

Use either `0` or `false` (as a number/boolean os string) to set a `margin` of 0.

## Provider

Also, Provider is supporting the `collapse` property.

```jsx
import Provider from `dnb-ui-lib/shared/Provider`

render(
  <Provider space={{ collapse: false }}>
    <Space>I do not collapse</Space>
    <Space>I do not collapse</Space>
  </Provider>
)
```
