---
title: 'At'
description: '`DataContext.At` makes it possible to dig into a data set to set a pointer as the root for sub components, as well as iterate array-data.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/At/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Handler>,
)
```
