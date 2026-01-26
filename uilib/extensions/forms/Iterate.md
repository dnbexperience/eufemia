---
title: 'Iterate'
description: '`Iterate` contains components and functionality for traversing values and parts of data sets such as arrays, which contain a varying number of elements where the number of components on the screen depends on how many elements the data consists of.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.035Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Iterate

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
```

## Description

Iterate is a set of components and functionality designed for traversing values and parts of data sets, such as arrays.

It is particularly useful when dealing with data that contains a varying number of items, as the number of components on the screen depends on the number of items in the data.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate)

## Usage

1. Define a `value` property with an array of items you want to iterate over. This can be a list of strings, objects, or any other type of data.
2. Put [Field.\*](/uilib/extensions/forms/all-fields/) or [Values.\*](/uilib/extensions/forms/Value/) with an `itemPath` inside.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']} onChange={console.log}>
    <Field.String itemPath="/" />
  </Iterate.Array>
)
```

You can also iterate over objects and easily integrate it with the [Form.Handler](/uilib/extensions/forms/Form/Handler) data handling, as shown in the example below:

```tsx
import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    defaultData={{
      listOfHeroes: [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'The Hulk' },
      ],
    }}
    onChange={console.log}
  >
    <Iterate.Array path="/listOfHeroes">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>
  </Form.Handler>
)
```

## Components

<ListIterateComponents size="small" />
