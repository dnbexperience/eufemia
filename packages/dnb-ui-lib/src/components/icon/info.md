---
component: 'Icon'
class: 'dnb-icon'
status: 'ready'
version: 0.5.0
---

The main Icon component is basically only a wrapper for what ever Icon You send into it. This means a `span` wrapping an inline `svg`.

#### More details

To make it clear that all the "often used" icons are loaded at once, we have an additional Icon component, named `IconWithAllIcons` or `dnb-icon-with-all-icons`.

| Properties   | Description                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `icon`       | _(mandatory)_ a React SVG Component or the icon name (in case we use `IconWithAllIcons` or `dnb-icon-with-all-icons`).  |
| `alt`        | _(mandatory)_ the alternative label (text version) of the icon.                                                         |
| `size`       | _(optional)_ the dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16` |
| `color`      | _(optional)_ sets a color property to the `svg` markup. Default is no color, witch means _black_                        |
| `modifier`   | _(optional)_ modifier class.                                                                                            |
| `attributes` | _(optional)_ insert any other attributes. For example `disabled` or any other custom attributes.                        |
