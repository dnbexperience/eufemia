---
showTabs: true
---

## Tooltip properties

| Properties                                  | Description                                                                                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`                                  | _(optional)_ Provide a string or a React Element to be shown as the tooltip content.                                                             |
| `active`                                    | _(optional)_ set to `true` the tooltip will show up.                                                                                             |
| `position`                                  | _(optional)_ defines the offset position to the target element the arrow appears. Can be `top`, `right`, `left` and `bottom`. Defaults to `top`. |
| `position`                                  | _(optional)_ defines the offset position to the target element the arrow appears. Can be `top`, `right`, `left` and `bottom`. Defaults to `top`. |
| `align`                                     | _(optional)_ defines the offset alignment to the target element the arrow appears. Can be `center`, `right` and `left`.Defaults to `center`.     |
| `arrow`                                     | _(optional)_ defines the direction where the arrow appears. Can be `center`, `top`, `right`, `bottom` and `left`. Defaults to `center`.          |
| `animate_position`                          | _(optional)_ set to `true` to animate a single Tooltip from one element to another element. You also need to set a unique `group` name.          |
| `fixed_position`                            | _(optional)_ If set to `true`, the Tooltip will be fixed in its scroll position by using CSS `position: fixed;`. Defaults to `false`.            |
| `skip_portal`                               | _(optional)_ set to `true` to disable the React Portal behavior. Defaults to `false`.                                                            |
| `no_animation`                              | _(optional)_ set to `true` if no fade-in animation should be used.                                                                               |
| `show_delay`                                | _(optional)_ define the delay until the tooltip should show up after the initial hover / active state.                                           |
| `hide_delay`                                | _(optional)_ define the delay until the tooltip should disappear up after initial visibility.                                                    |
| `target_element`                            | _(optional)_ provide an element directly as a React Node or a React Ref that will be wrapped and rendered.                                       |
| `target_selector`                           | _(optional)_ specify a vanilla HTML selector by a string as the target element.                                                                  |
| `size`                                      | _(optional)_ defines the spacing size of the tooltip. Can be `large` or `basis`. Defaults to `basis`.                                            |
| `group`                                     | _(optional)_ if the tooltip should animate from one target to the next, define a unique ID.                                                      |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                            |
