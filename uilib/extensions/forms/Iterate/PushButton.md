---
title: 'Iterate.PushButton'
description: '`Iterate.PushButton` builds on top of the same data flow logic as field components, but the only thing it changes in the value it receives or retrieves from source data is adding a new item to the array.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.003Z
checksum: 197d8ae847f788628e541f64a96a84e035ec18e2b7161c0d972b31ccdbcac29f
---

# Iterate.PushButton

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.PushButton />)
```

## Description

`Iterate.PushButton` connects to the array of a surrounding `Iterate.Array` or an array from the source pointed at through `path` and adds a new item to the array when clicked.

```tsx
import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>

    <Iterate.PushButton
      path="/myList"
      text="Add another item"
      pushValue={{}}
    />
  </Form.Handler>
)
```

In order to create new items you can also use the [Iterate.PushContainer](/uilib/extensions/forms/Iterate/PushContainer/) component.

## Show the next item number in the button

You can use the `{nextItemNo}` variable in the `text` or `children` property to display the next item number.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">
      <Field.String itemPath="/" />
    </Iterate.Array>

    <Iterate.PushButton
      path="/myList"
      pushValue="push value"
      text="Add no. {nextItemNo}"
    />
  </Form.Handler>
)
```

## Demos

### Primitive items

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Iterate.Array path="/" animate>
        <Value.String itemPath="/" />
      </Iterate.Array>
      <Iterate.PushButton
        text="Add another item"
        path="/"
        pushValue="new"
      />
    </Flex.Stack>
  </Form.Handler>
)
```

### Object items

```tsx
render(
  <Form.Handler
    data={[
      {
        name: 'Iron Man',
      },
      {
        name: 'Captain America',
      },
      {
        name: 'Thor',
      },
    ]}
    onChange={(value) => console.log('onChange', value)}
  >
    <Iterate.Array path="/" animate>
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>

    <Iterate.PushButton
      top="small"
      text="Add another item"
      path="/"
      pushValue={{}}
    />
  </Form.Handler>
)
```

## Properties

```json
{
  "path": {
    "doc": "The path to the array to add the new item to.",
    "type": "string",
    "status": "required"
  },
  "itemPath": {
    "doc": "The path to the item in a nested array, to add the new item to.",
    "type": "string",
    "status": "optional"
  },
  "pushValue": {
    "doc": "The element to add to the array when the button is clicked. Can be a function to returns the push value.",
    "type": "unknown",
    "status": "optional"
  },
  "[Button](/uilib/components/button/properties)": {
    "doc": "All button properties.",
    "type": "Various",
    "status": "optional"
  }
}
```
