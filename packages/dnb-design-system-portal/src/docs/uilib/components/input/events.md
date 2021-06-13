---
showTabs: true
---

## Events

| Events      | Description                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on_change` | _(optional)_ will be called on value changes made by the user. Returns an object with the value as a string and the a native event: `{ value, event }`. |
| `on_focus`  | _(optional)_ will be called on focus set by the user. Returns `{ value, event }`.                                                                       |
| `on_blur`   | _(optional)_ will be called on blur set by the user. Returns `{ value, event }`.                                                                        |
| `on_submit` | _(optional)_ will be called on submit button click. Returns `{ value, event }`.                                                                         |

### Manipulate the input value during typing

You have two possibilities to manipulate the value while a user is typing. Either you handle the value with your own state, or you return a modified value in the `on_change` event listener:

```jsx
import { format } from '@dnb/eufemia/components/number-format/NumberUtils'

function Component() {
  const onChangeHandler = ({ value }) => {
    return format(value)
  }

  return <Input on_change={onChangeHandler} />
}
```

### Prevent setting a new value

You can use e.g. `event.preventDefault()` during `onKeyDown`, or return false during `onChange`. They are not 100% the same user experiance, but can both usefull in different use casecases.

```jsx
function Component() {
  const onKeyDownHandler = ({ event }) => {
    event.preventDefault()
  }
  const onChangeHandler = ({ value }) => {
    return false
  }

  return <Input onKeyDown={onKeyDownHandler} onChange={onChangeHandler} />
}
```
