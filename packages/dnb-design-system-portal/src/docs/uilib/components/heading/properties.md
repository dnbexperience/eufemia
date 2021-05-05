---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` or `children`                        | _(mandatory)_ a heading, can be text or a another component.                                                                                                            |
| `size`                                      | _(optional)_ Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Defaults to the predefined heading sizes.                 |
| `increase`                                  | _(optional)_ If set to true, the heading level will be incremented by 1.                                                                                                |
| `decrease`                                  | _(optional)_ If set to true, the heading level will be decremented by 1.                                                                                                |
| `inherit`                                   | _(optional)_ If set to true, the heading last used level will be inherited. Also from inside a level context.                                                           |
| `reset`                                     | _(optional)_ If set to true, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.                                      |
| `skip_correction`                           | _(optional)_ If set to true, the heading will not be corrected and warnings will not be shown. Warnings do not show up in **production builds** else either.            |
| `debug`                                     | _(optional)_ If set to true, the content will have a prefix, showing the heading level.                                                                                 |
| `debug_counter`                             | _(optional)_ If set to true, the content will have both a prefix and a JSON log attached to both headings and level contexts.                                           |
| `element`                                   | _(optional)_ define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element. |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                     |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                   |

Properties which do apply to the provider (level context) `Heading.Level` as well:

- `increase`
- `decrease`
- `inherit`
- `reset`
- `skip_correction`
- `debug`
