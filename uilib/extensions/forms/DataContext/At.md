---
title: 'DataContext.At'
description: '`DataContext.At` makes it possible to dig into a data set to set a pointer as the root for sub components, as well as iterate array-data.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.782Z
checksum: 8a9587445730d13aaa069f93aa4a0e76d55c22df3e4141147ec1c2a767ed23ac
---

# DataContext.At

## Description

`DataContext.At` makes it possible to dig into a data set to set a pointer as the root for sub components, as well as iterate array-data.

```tsx
import { DataContext, Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler
    data={{
      foo: {
        one: 1,
        two: 2,
      },
      bar: 'Bar',
    }}
  >
  <DataContext.At path="/foo">
    <Field.Number path="/one" label="One" />
    <Field.Number path="/two" label="Two" />
  </DataContext.At>
</Form.Handler><DataContext.At data={existingData}>...</DataContext.At>,
)
```

## Demos

### At path

```tsx
render(
  <Form.Handler
    data={{
      foo: {
        one: 1,
        two: 2,
      },
      bar: 'Bar',
    }}
  >
    <DataContext.At path="/foo">
      <Field.Number path="/one" label="One" />
      <Field.Number path="/two" label="Two" />
    </DataContext.At>
  </Form.Handler>
)
```

### Iterate path

```tsx
render(
  <Form.Handler
    data={{
      list: [
        {
          title: 'Object 1',
        },
        {
          title: 'Object 2',
        },
      ],
      bar: 'Bar',
    }}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
  >
    <DataContext.At path="/list" iterate>
      <Value.String path="/title" label="Title" />
      <Field.String path="/title" label="Title" />
    </DataContext.At>
  </Form.Handler>
)
```

## Properties

```json
{
  "children": {
    "doc": "Features with given path as root for the DataContext.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "path": {
    "doc": "JSON Pointer path to where in the outer DataContext source to point at.",
    "type": "string",
    "status": "optional"
  },
  "iterate": {
    "doc": "True to iterate elements at given path based on the source data, including the index in the outer path, instead of just rendering children once.",
    "type": "boolean",
    "status": "optional"
  }
}
```
