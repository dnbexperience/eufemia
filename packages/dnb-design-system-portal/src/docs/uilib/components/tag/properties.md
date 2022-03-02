---
showTabs: true
---

## Properties

### `Tag` properties

| Properties                                  | Description                                                                                                                                                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` or `children`                        | _(optional)_ The content of the tag can be a string or a React Element.                                                                                                                                         |
| `icon`                                      | _(optional)_ To be included in the tag. Primary Icons can be set as a string (e.g. icon="chevron_right"), other icons should be set as React elements. Note, we recommend not to use icons with clickable tags. |
| `hasLabel`                                  | _(optional)_ If a label is given, typical inside a table or dl (definition list), then you can disable Tag.Group as a dependent of Tag. Use `true` to omit the `Tag group required:` warning.                   |
| `skeleton`                                  | _(optional)_ Applies loading skeleton.                                                                                                                                                                          |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                                                                                                           |
| [Space](/uilib/components/space/properties) | _(optional)_ Spacing properties like `top` or `bottom` are supported.                                                                                                                                           |
| `omitOnKeyUpDeleteEvent`                    | _(optional)_ Set to `true` to omit triggering an event when the user releases the `Delete` or `Backspace` keys. Defaults to `false`.                                                                            |

### `Tag.Group` properties

| Properties                                  | Description                                                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                                     | _(required)_ The label description of the group of tags.                                                                                    |
| `children`                                  | _(optional)_ Content of the component. Can be used instead of the `data`-property, by adding Tag elements as children `<Tag {...props} />`. |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                                       |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                       |
