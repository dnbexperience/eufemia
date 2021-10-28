---
showTabs: false
draft: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`                                   | _(optional)_ define what HTML or React element should be used (e.g. `element={Link}`). Defaults to semantic `a` element.                                                                      |
| `href`                                      | _(optional)_ relative or absolute url.                                                                                                                                                        |
| `to`                                        | _(optional)_ use this prop only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.                                          |
| `target`                                    | _(optional)_ defines the opening method. Use `_blank` to open a new browser window/tab.                                                                                                       |
| `target_blank_title`                        | _(optional)_ the title shown as a tooltip when target is set to `_blank`.                                                                                                                     |
| `target_blank_external_title`               | _(optional)_ the title shown as a tooltip when target is set to `_blank` and the href contains a different hostname or the anchor is marked with `external="true"`.                           |
| `external`                                  | _(optional)_ If set to `true` it will enable `target="_blank"` and change both the Tooltip text and aria label (screen reader text) to use `target_blank_external_title`. Defaults to `auto`. |
| `tooltip`                                   | _(optional)_ Provide a string or a React Element to be shown as the tooltip content.                                                                                                          |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                           |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                         |

### External Links

When a link (`href`) points to another host than the current location is using, it will enable the behavior and handle the anchor like you would have set `external="true"`, as long as the property is not set to a different value.

```jsx
render(
  <Anchor external to="https://external-domain.no">
    External url
  </Anchor>
)
```

### Router Link

You can make use of the `element` property in combination with the `to` property. This way you merge together all the Eufemia styling and properties with the one from the router link.

```jsx
import { Link } from 'gatsby'

render(
  <Anchor to="/url" element={Link}>
    Link
  </Anchor>
)
```
