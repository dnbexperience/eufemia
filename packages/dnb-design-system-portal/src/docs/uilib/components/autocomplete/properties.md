---
showTabs: true
---

import DrawerListProperties from 'Docs/uilib/components/fragments/drawer-list/properties'

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#data-structure).

| Properties                                                       | Description                                                                                                                                                                                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`                                                           | _(optional)_ if set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.                                                                                                      |
| `input_value`                                                    | _(optional)_ lets you define a custom input value.                                                                                                                                                                               |
| `placeholder` or `title`                                         | _(optional)_ use this to define the pre-filled placeholder text in the input. Defaults to `title="Skriv og velg"`.                                                                                                               |
| `disable_filter`                                                 | _(optional)_ if set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.                                                                                                 |
| `disable_highlighting`                                           | _(optional)_ if set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.                                                                                                 |
| `disable_reorder`                                                | _(optional)_ if set to `true`, reordering of search results will be disabled. Defaults to `false`.                                                                                                                               |
| `search_numbers`                                                 | _(optional)_ if set to `true` and `search_in_word_index` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.                                                      |
| `search_in_word_index`                                           | _(optional)_ this gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`.                                                                           |
| `keep_value`                                                     | _(optional)_ use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur.                 |
| `keep_value_and_selection`                                       | _(optional)_ like `keep_value` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept.                                                                                |
| `prevent_selection`                                              | _(optional)_ if set to `true`, no permanent selection will be made. Also, the typed value will not disappear on input blur (like `keep_value`). Defaults to `false`.                                                             |
| `show_clear_button`                                              | _(optional)_ if set to `true`, a clear button is shown inside the input field. Defaults to `false`.                                                                                                                              |
| `icon`                                                           | _(optional)_ to be included in the autocomplete input.                                                                                                                                                                           |
| `icon_size`                                                      | _(optional)_ change the size of the icon pragmatically.                                                                                                                                                                          |
| `icon_position`                                                  | _(optional)_ position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.                                                                                                                         |
| `input_icon`                                                     | _(optional)_ same as `icon`.                                                                                                                                                                                                     |
| `triangle_position`                                              | _(optional)_ position of icon arrow / triangle the drawer. Set to `left` or `right`. Defaults to `left`.                                                                                                                         |
| `size`                                                           | _(optional)_ define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.                                                                                               |
| `drawer_class`                                                   | _(optional)_ define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.                       |
| `show_submit_button`                                             | _(optional)_ use `true` to show a Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.                                                                                  |
| `title`                                                          | _(optional)_ give a title to let the user know what theyhaves to do. Defaults to `Skriv og få alternativer'` .                                                                                                                   |
| `align_autocomplete`                                             | _(optional)_ use `right` to change the options alignment direction. Defaults to `left`.                                                                                                                                          |
| `no_options`                                                     | _(optional)_ text show in the "no options" item. Defaults to `Ingen alternativer`.                                                                                                                                               |
| `aria_live_options`                                              | _(optional)_ text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.                                                                    |
| `show_all`                                                       | _(optional)_ text that lets a user unravel all the available options. Defaults to `Vis alt`.                                                                                                                                     |
| `indicator_label`                                                | _(optional)_ text show on indicator "options" item. Defaults to `Henter data ...`.                                                                                                                                               |
| `show_options_sr`                                                | _(optional)_ only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`. |
| `selected_sr`                                                    | _(optional)_ only for screen readers (VocieOver). The label used to announce the selected item. Defaults to `Valgt:`.                                                                                                            |
| `submit_button_title`                                            | _(optional)_ title on submit button. Defaults to `Vis alternativer`.                                                                                                                                                             |
| `submit_button_icon`                                             | _(optional)_ the icon used in the submit button. Defaults to `chevron_down`.                                                                                                                                                     |
| `submit_element`                                                 | _(optional)_ replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from '@dnb/eufemia/components/input/Input'`.                                          |
| `opened`                                                         | _(optional)_ if set to `true`, the Autocomplete will be rendered initially with a visible and accessible data list / options.                                                                                                    |
| `open_on_focus`                                                  | _(optional)_ use `true` to auto open the list once the user is entering the input field with the keyboard.                                                                                                                       |
| `stretch`                                                        | _(optional)_ if set to `true`, then the autocomplete will be 100% in available `width`.                                                                                                                                          |
| `skip_portal`                                                    | _(optional)_ set to `true` to disable the React Portal behavior. Defaults to `false`.                                                                                                                                            |
| `status`                                                         | _(optional)_ text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.                                                                             |
| `status_state`                                                   | _(optional)_ defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.                                                                                                            |
| `status_props`                                                   | _(optional)_ use an object to define additional FormStatus properties.                                                                                                                                                           |
| `global_status_id`                                               | _(optional)_ the `status_id` used for the target [GlobalStatus](/uilib/components/global-status).                                                                                                                                |
| `label`                                                          | _(optional)_ prepends the Form Label component. If no ID is provided, a random ID is created.                                                                                                                                    |
| `label_direction`                                                | _(optional)_ use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`                                                                                                                     |
| `label_sr_only`                                                  | _(optional)_ use `true` to make the label only readable by screen readers.                                                                                                                                                       |
| `suffix`                                                         | _(optional)_ text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.                                                  |
| `skeleton`                                                       | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                                                              |
| `input_ref`                                                      | _(optional)_ use a React.Ref to get access to the `input` DOM element.                                                                                                                                                           |
| `input_element`                                                  | _(optional)_ lets you provide a custom React element as the input HTML element.                                                                                                                                                  |
| [DrawerList](/uilib/components/fragments/drawer-list/properties) | _(optional)_ all DrawerList properties.                                                                                                                                                                                          |
| [Space](/uilib/components/space/properties)                      | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                            |

<DrawerListProperties />

## Data structure

```js
// as array
const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show instead of "content", once selected
    selected_value: 'Item 1 Value',
    suffix_value: 'Addition 1',

    // Item content as a string, array or React Element
    content: 'Item 1 Content',
  },

  // more items ...
  {
    selected_key: 'key_1',
    content: (
      <>
        <IconPrimary icon="bell" />
        <span className="dnb-typo-bold">Searchable content</span>
      </>
    ),
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    suffix_value: 'Addition 3',
    content: (
      <Autocomplete.HorizontalItem>
        <IconPrimary icon="bell" />
        <span className="dnb-typo-bold">Searchable content</span>
      </Autocomplete.HorizontalItem>
    ),
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    suffix_value: 'Addition 4',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

// as object
const data = {
  a: 'A',
  b: 'B',
}
```
