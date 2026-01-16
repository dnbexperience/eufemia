---
title: 'RemoveButton'
description: '`Iterate.RemoveButton` connects to the array of a surrounding Iterate.Array and removes the item when clicked.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/RemoveButton/metadata.json
---

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.RemoveButton />)
```

## Description

`Iterate.RemoveButton` connects to the array of a surrounding `Iterate.Array` and removes the item when clicked.

```tsx
import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler defaultData={{ myList: ['foo'] }}>
    <Iterate.Array path="/myList">
      <Iterate.RemoveButton text="Remove item" />
    </Iterate.Array>
  </Form.Handler>,
)
```

## Confirm removal

You can use the `showConfirmDialog` property to open a confirmation dialog before removing the item.

```tsx
<Iterate.RemoveButton showConfirmDialog />
```

## The item number in the title

You can use the `{itemNo}` variable in the `text` or the `children` property to display the current item number.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler defaultData={{ myList: ['foo'] }}>
    <Iterate.Array path="/myList">
      <Iterate.RemoveButton text="Remove item {itemNo}" />
    </Iterate.Array>
  </Form.Handler>,
)
```

## Demos

### Primitive items

```tsx
render(
  <Iterate.Array
    value={['One', 'Two', 'Three', 'Four', 'Five']}
    onChange={(value) => console.log('onChange', value)}
    animate
  >
    <Flex.Horizontal align="center">
      <Field.String itemPath="/" />
      <Iterate.RemoveButton
        icon={TrashIcon}
        onChange={(value) => console.log('onChange', value)}
      />
    </Flex.Horizontal>
  </Iterate.Array>,
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
      <Flex.Horizontal align="center">
        <Field.Name.Last itemPath="/name" />
        <Iterate.RemoveButton text="Remove avenger" />
      </Flex.Horizontal>
    </Iterate.Array>
  </Form.Handler>,
)
```
