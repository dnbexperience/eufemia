---
title: 'getData'
description: '`Form.getData` lets you access your form data outside of the form context.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/getData/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.getData
```

## Description

With the `Form.getData` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  return <Form.Handler id={myFormId}>...</Form.Handler>
}

// Later, when there is data available
const { getValue, data, filterData, reduceToVisibleFields } =
  Form.getData(myFormId)
```

- `getValue` will return the value of the given path.
- `data` will return the whole dataset (unvalidated).
- `filterData` will filter the data based on your own logic.
- `reduceToVisibleFields` will reduce the given data set to only contain the visible fields (mounted fields).

You link them together via the `id` (string, function, object or React Context as the reference) property.

TypeScript support:

```tsx
type Data = { foo: string }
const { data } = Form.getData<Data>('unique')
```

Related helpers:

- [Form.setData](/uilib/extensions/forms/Form/setData/)
- [Form.useData](/uilib/extensions/forms/Form/useData/)

## Visible data

You can use the `reduceToVisibleFields` function to get only the data of visible (mounted) fields.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  return (
    <Form.Handler id={myFormId}>
      <Form.Visibility pathTrue="/isVisible">
        <Field.String path="/foo" />
      </Form.Visibility>
    </Form.Handler>
  )
}

// Later, when there is data available
const { data, reduceToVisibleFields } = Form.getData(myFormId)
const visibleData = reduceToVisibleFields(data)
```

## Filter data

You can use the `filterData` function to filter your data.

You simply give it the [same kind of filter](/uilib/extensions/forms/Form/Handler/demos/#filter-your-data) as you would within the `onSubmit` event callback.

The callback function receives the following properties in an object:

- `path` The path of the field.
- `value` The value of the field.
- `displayValue` The displayed value of the field.
- `label` The label of the field.
- `props` The given field properties.
- `error` The error of the field. Is `undefined` if there is no error.

The callback function should return a `boolean` or `undefined`. Return `false` to exclude an entry.

It returns the filtered form data.

```tsx
const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" disabled />
    </Form.Handler>
  )
}

const filterDataHandler = ({ path, value, data, props, error }) => {
  if (props.disabled === true) {
    return false
  }
}

// Later, when there is data available
const { filterData } = Form.getData(myFormId)
const filteredData = filterData(filterDataHandler)
```

## Demos

### Get data outside of the form

```tsx
const existingData = {
  foo: 'bar',
}
const Component = () => {
  const { data } = Form.useData('default-id', existingData)
  return (
    <Form.Handler id="default-id">
      <Field.String path="/foo" label={data.foo} />
    </Form.Handler>
  )
}
render(<Component />)
```

### Filter your data

```tsx
// Method A (if you know the paths)
const filterDataPaths = {
  '/foo': ({ value }) => {
    if (value === 'foo') {
      return false
    }
  },
}

// Method B (will iterate over all fields regardless of the path)
// Method B (will iterate over all fields regardless of the path)
const filterDataHandler = ({ value }) => {
  if (value === 'foo') {
    return false
  }
}
const Component = () => {
  return (
    <Form.Handler id="filter-data">
      <Flex.Stack>
        <Field.String path="/foo" value="foo" />
        <Field.String path="/bar" value="bar" />
      </Flex.Stack>
    </Form.Handler>
  )
}
const { filterData } = Form.getData('filter-data')
render(
  <Flex.Stack>
    <Component />
    <Section backgroundColor="sand-yellow" innerSpace>
      <pre>{JSON.stringify(filterData(filterDataPaths))}</pre>
      <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>
    </Section>
  </Flex.Stack>,
)
```
