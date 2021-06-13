---
showTabs: true
---

## Global Properties

These properties are available in many other components and elements.

| Properties | Description                                                                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `space`    | _(optional)_ Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. |
| `top`      | _(optional)_ Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.                                               |
| `right`    | _(optional)_ Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.                                             |
| `bottom`   | _(optional)_ Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.                                            |
| `left`     | _(optional)_ Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.                                              |

## Component Properties

| Properties    | Description                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `element`     | _(optional)_ defines the HTML element used. Defaults to `div`.                                                                                                                                         |
| `stretch`     | _(optional)_ if set to `true`, then the space element will be 100% in `width`.                                                                                                                         |
| `inline`      | _(optional)_ if set to `true`, then `display: inline-block;` is used, so the HTML elements gets aligned horizontally. Defaults to `false`.                                                             |
| `no_collapse` | _(optional)_ if set to `true`, then a wrapper with `display: flow-root;` is used. This way You avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline="true"` in combination. |

## Zero

Use either `0` or `false` (as a number/boolean os string) to set a `margin` of 0.

## Provider

Also, Provider is supporting the `collapse` property.

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider space={{ no_collapse: true }}>
    <Space>I do not collapse</Space>
    <Space>I do not collapse</Space>
  </Provider>
)
```
