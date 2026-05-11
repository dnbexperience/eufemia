---
title: 'Iterate.ItemNo'
description: '`Iterate.ItemNo` is a helper component that can be used to render the current item number (index) in a given string.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.616Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Iterate.ItemNo

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.ItemNo />)
```

## Description

`Iterate.ItemNo` is a helper component that can be used to render the current item number (index) in a given string. It will replace `{itemNo}` with the current item number.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/ItemNo)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/ItemNo)

```tsx
import { Form, Iterate } from '@dnb/eufemia/extensions/forms'

const myString = 'Item no. {itemNo}'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Form.SubHeading>
      <Iterate.ItemNo>{myString}</Iterate.ItemNo>
    </Form.SubHeading>
  </Iterate.Array>
)
```


## Demos

### Default


```tsx
render(<Iterate.Array value={['foo', 'bar']}>
        <Form.SubHeading>
          <Iterate.ItemNo>{'Item no. {itemNo}'}</Iterate.ItemNo>
        </Form.SubHeading>
      </Iterate.Array>)
```
