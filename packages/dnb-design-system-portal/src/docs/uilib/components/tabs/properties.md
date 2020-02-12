---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                             |     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `selected_key`                              | _(optional)_ in case one of the tabs should be opened by a `key`.                                                                                                                                       |     |
| `active_item`                               | _(optional)_ in case one of the tabs should be opened by a url.                                                                                                                                         |     |
| `align`                                     | _(optional)_ to align the tab list on the right side `align="right"`. Default to `left`.                                                                                                                |     |
| `section_style`                             | _(optional)_ to enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to null.                           |
| `section_spacing`                           | _(optional)_ to modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to null.                                                    |
| `data`                                      | _(mandatory)_ defines the data structure to load as a JSON. e.g. `[{title: '...', content: 'Current tab', key|hash: '...'}]`                                                                            |     |
| `children, content`                         | _(mandatory)_ the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`. |
| `prevent_rerender`                          | _(optional)_ if set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.                      |     |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                   |

## Key

The key can be both a string or a number.
But if the key is a number (integer), we have to deliver the content directly in the tab item:

```js
const tabsDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> }
]
```

## Example Data

```js
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]
```

## Current tab

The current Tab content can be a `string`, a function returning content or a `React component`.
