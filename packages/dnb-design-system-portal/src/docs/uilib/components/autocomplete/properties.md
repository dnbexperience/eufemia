---
showTabs: true
---

import DrawerListProperties from 'Pages/uilib/components/fragments/drawer-list/properties'

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#data-structure).

| Properties                                  | Description                                                                                                                                                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                                      | _(optional)_ if set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.                                                                                     |
| `placeholder` or `title`                    | _(optional)_ use this to define the pre filled placeholder text in the input. Defaults to `title="Skriv og velg"`.                                                                                              |
| `disable_filter`                            | _(optional)_ if set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.                                                                                |
| `disable_highlighting`                      | _(optional)_ if set to `true`, word highlighting will disabled, but the options will still get filtered. Defaults to `false`.                                                                                   |
| `disable_reorder`                           | _(optional)_ if set to `true`, reordering of search results will be disabled. Defaults to `false`.                                                                                                              |
| `search_in_word_index`                      | _(optional)_ this gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`.                                                          |
| `keep_value`                                | _(optional)_ use `true` to not remove the typed value on input blur, if it is invalid. By default the typed value will disappear / replaced by a selected value from the data list during the input field blur. |
| `keep_value_and_selection`                  | _(optional)_ like `keep_value` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept.                                                               |
| `prevent_selection`                         | _(optional)_ if set to `true`, no permanent selection will be made. Also, the the typed value will not disappear on input blur (like `keep_value`). Defaults to false`.                                         |
| `icon`                                      | _(optional)_ to be included in the autocomplete input.                                                                                                                                                          |
| `icon_size`                                 | _(optional)_ change the size of the icon pragmatically.                                                                                                                                                         |
| `icon_position`                             | _(optional)_ position of icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.                                                                                                            |
| `input_icon`                                | _(optional)_ same as `icon`.                                                                                                                                                                                    |
| `triangle_position`                         | _(optional)_ position of icon arrow / triangle the drawer. Set to `left` or `right`. Defaults to `left`.                                                                                                        |
| `size`                                      | _(optional)_ define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.                                                                              |
| `drawer_class`                              | _(optional)_ define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.      |
| `show_submit_button`                        | _(optional)_ use `true` to show a Dropdown button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.                                                                     |
| `title`                                     | _(optional)_ give a title to let the user know what they has to do. Defaults to `Skriv og få alternativer'` .                                                                                                   |
| `align_autocomplete`                        | _(optional)_ use `right` to change the options alignment direction. Defaults to `left`.                                                                                                                         |
| `no_options`                                | _(optional)_ text show in the "no options" item. Defaults to `Ingen alternativer`.                                                                                                                              |
| `aria_live_options`                         | _(optional)_ text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.                                                   |
| `indicator_label`                           | _(optional)_ text show on indicator "options" item. Defaults to `Henter data ...`.                                                                                                                              |
| `submit_button_title`                       | _(optional)_ title on submit button. Defaults to `Vis alternativer`.                                                                                                                                            |
| `submit_button_icon`                        | _(optional)_ the icon used in the submit button. Defaults to `chevron_down`.                                                                                                                                    |
| `submit_element`                            | _(optional)_ replace the drop down / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from '@dnb/eufemia/components/input/Input'`.                        |
| `open_on_focus`                             | _(optional)_ use `true` to auto open the list once the users is entering the input field with the keyboard.                                                                                                     |
| `stretch`                                   | _(optional)_ if set to `true`, then the autocomplete will be 100% in available `width`.                                                                                                                         |
| `skip_portal`                               | _(optional)_ set to `true` to disable the React Portal behavior. Defaults to `false`.                                                                                                                           |
| `status`                                    | _(optional)_ text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.                                                            |
| `status_state`                              | _(optional)_ defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.                                                                                            |
| `global_status_id`                          | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                                                               |
| `label`                                     | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                                                                                                                   |
| `label_direction`                           | _(optional)_ use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`                                                                                                    |
| `input_ref`                                 | _(optional)_ use a React.Ref to get access to the `input` DOM element.                                                                                                                                          |
| `suffix`                                    | _(optional)_ text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.                                 |
| `label_sr_only`                             | _(optional)_ use `true` to make the label only readable by screen readers.                                                                                                                                      |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                           |

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
