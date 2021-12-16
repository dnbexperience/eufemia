---
showTabs: true
---

## Description

The DrawerList component is a fragment inside other components.

It is used e.g. in the [Dropdown](/uilib/components/dropdown).

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

    // Item content as a string or array
    content: 'Item 1 Content',
  },

  // more items ...
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

// as object
const data = {
  a: 'A',
  b: 'B',
}
```

### Example usage of `options_render`

```jsx
render(
  <DrawerList
    options_render={({ Items, Item, data }) => (
      <>
        <Items />
        <Item>Addition</Item>
        {data.length > 1 && <li>Addition</li>}
      </>
    )}
  />
)
```

### data-dnb-drawer-list-active

When a DrawerList is open, it will set an HTML attribute on the main HTML Element called `data-dnb-drawer-list-active`. The attribute value will be the ID of the current DrawerList.

This can be used to handle z-index issues from within CSS only:

```css
html[data-dnb-drawer-list-active='DrawerList-ID'] {
  /* Your css */
}
```
