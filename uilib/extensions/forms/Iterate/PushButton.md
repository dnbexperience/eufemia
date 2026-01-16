---
title: 'PushButton'
description: '`Iterate.PushButton` builds on top of the same data flow logic as field components, but the only thing it changes in the value it receives or retrieves from source data is adding a new item to the array.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/PushButton/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Handler>,
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
  </Form.Handler>,
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
  </Form.Handler>,
)
```
