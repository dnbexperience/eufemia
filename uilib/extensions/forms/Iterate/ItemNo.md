---
title: 'ItemNo'
description: '`Iterate.ItemNo` is a helper component that can be used to render the current item number (index) in a given string.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/ItemNo/metadata.json
---

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.ItemNo />)
```

## Description

`Iterate.ItemNo` is a helper component that can be used to render the current item number (index) in a given string. It will replace `{itemNo}` with the current item number.

```tsx
import { Form, Iterate } from '@dnb/eufemia/extensions/forms'

const myString = 'Item no. {itemNo}'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Form.SubHeading>
      <Iterate.ItemNo>{myString}</Iterate.ItemNo>
    </Form.SubHeading>
  </Iterate.Array>,
)
```

## Demos

### Default

```tsx
render(
  <Iterate.Array value={['foo', 'bar']}>
    <Form.SubHeading>
      <Iterate.ItemNo>{'Item no. {itemNo}'}</Iterate.ItemNo>
    </Form.SubHeading>
  </Iterate.Array>,
)
```
