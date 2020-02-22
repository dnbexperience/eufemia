---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data` or `children`                        | _(mandatory)_ the data we want to fill the list with. Provide the data as a `JSON string`, `array` or `object` in these [data structure](#data-structure). <br /> If You don't have to define a `value`, You can also send in a `function` witch will be called once the user opens the DrawerList. |
| `value`                                     | _(optional)_ a number as a string or integer, defines the selected item. Defaults to `null` and the `title` will be shown. <br /> **NB:** In case the DrawerList will be re-rendered, this value will be used again. Use `default_value` instead.                                                   |
| `default_value`                             | _(optional)_ if you want to define only a startup value (integer) or have to handle a re-render without handling the state during the re-render by yourself, then using `default_value` is a good choice . Defaults to `null`.                                                                      |
| `icon_position`                             | _(optional)_ position of icon inside the drawer-list. Set to `left` or `right`. Defaults to `right` if not set.                                                                                                                                                                                     |
| `direction`                                 | _(optional)_ defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.                                                                                                                                                                     |
| `prevent_selection`                         | _(optional)_ if true, the DrawerList will then act as a **Popup Menu**. No lasting selection will be made. Make sure You define a `title` for accessibility. No visual title vil be shown, only the arrow. Defaults to `false`.                                                                     |
| `focusable`                                 | _(optional)_ If set to true, the element is then focusable by assertive technologies.                                                                                                                                                                                                               |
| `prevent_close`                             | _(optional)_ If set to true, the DrawerList will not close on any events. Defaults to `false`.                                                                                                                                                                                                      |
| `keep_open`                                 | _(optional)_ If set to true, the DrawerList will close on outside clicks, but not on selection. Defaults to `false`.                                                                                                                                                                                |
| `align_drawer`                              | _(optional)_ use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`.                                                                                                                             |
| `scrollable`                                | _(optional)_ defines if the options list should be scrollable (the `max-height` is set by default to `50vh`). Defaults to `true`.                                                                                                                                                                   |
| `no_scroll_animation`                       | _(optional)_ to disable scrolling animation. Defaults to `false`.                                                                                                                                                                                                                                   |
| `no_animation`                              | _(optional)_ to disable appear/disappear (show/hide) animation. Defaults to `false`.                                                                                                                                                                                                                |
| `max_height`                                | _(optional)_ defines if the height (in `rem`) of the options list. Defaults to null, as this is set automatically by default.                                                                                                                                                                       |
| `wrapper_element`                           | _(optional)_ has to be a HTML Element, ideal a mother element, used to calculate sizes and distances. .                                                                                                                                                                                             |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                                               |

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
