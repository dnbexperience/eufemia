---
showTabs: true
---

import DrawerListProperties from 'Pages/uilib/components/fragments/drawer-list/properties'

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#data-structure).

| Properties                                  | Description                                                                                                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                                     | _(optional)_ give a title to let the user know what they has to do. Defaults to `Valgmeny` .                                                                            |
| `icon`                                      | _(optional)_ icon to be included in the dropdown.                                                                                                                       |
| `icon_size`                                 | _(optional)_ change the size of the icon pragmatically.                                                                                                                 |
| `icon_position`                             | _(optional)_ position of icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.                                                                       |
| `triangle_position`                         | _(optional)_ position of arrow / triangle of the drawer. Set to `left` or `right`. Defaults to `right`.                                                                 |
| `size`                                      | _(optional)_ define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.                                          |
| `more_menu`                                 | _(optional)_ same as `prevent_selection`, but the icon used is `more` (three dots). Defaults to `false`.                                                                |
| `align_dropdown`                            | _(optional)_ use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`. |
| `skip_portal`                               | _(optional)_ set to `true` to disable the React Portal behavior. Defaults to `false`.                                                                                   |
| `status`                                    | _(optional)_ text with a status message. The style defaults to an error message.                                                                                        |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                    |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                       |
| `label`                                     | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                                                                           |
| `label_direction`                           | _(optional)_ use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`                                                            |
| `suffix`                                    | _(optional)_ text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component. |
| `label_sr_only`                             | _(optional)_ use `true` to make the label only readable by screen readers.                                                                                              |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                   |

## DrawerList Properties

<DrawerListProperties />

## Data structure

```js
// as array
const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show insted of "content", once selected
    selected_value: 'Item 1 Value',

    // Item content as a string or array
    content: 'Item 1 Content'
  },

  // more items ...
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content']
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B']
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>]
  }
]

// as object
const data = {
  a: 'A',
  b: 'B'
}
```
