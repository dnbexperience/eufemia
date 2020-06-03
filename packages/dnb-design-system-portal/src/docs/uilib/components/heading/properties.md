---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` or `children`                        | _(mandatory)_ a heading, can be text or a another component.                                                                                                                                                                                                                |
| <!--                                        | `group`                                                                                                                                                                                                                                                                     | _(optional)_ Give the heading and the context a group so ... | --> |
| `increase`                                  | _(optional)_ If set to true, the heading level will be incremented by 1.                                                                                                                                                                                                    |
| `decrease`                                  | _(optional)_ If set to true, the heading level will be decremented by 1.                                                                                                                                                                                                    |
| `skip_correction`                           | _(optional)_ If set to true, the heading will not be corrected and now warnings will be shown. Warnings do not show up in **production builds**.                                                                                                                            |
| `debug`                                     | _(optional)_ If set to true, the content will have a prefix, showing the heading level.                                                                                                                                                                                     |
| `element`                                   | _(optional)_ define what HTML element should be used. Defaults to semantic heading element.                                                                                                                                                                                 |
| `[heading options]`                         | _(optional)_ accepts all [heading.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Heading/toLocaleString) options as an object - can also be a JSON given as the parameter e.g. `options='{"minimumFractionDigits":"2"}'`. |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                       |

Properties which do apply to the provider `Heading.Level` as well:

- `increase`
- `decrease`
- `skip_correction`
- `debug`
