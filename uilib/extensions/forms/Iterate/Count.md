---
title: 'Count'
description: '`Iterate.Count` is a helper component / function that returns the count of a data array or object.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/Count/metadata.json
---

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Count />)
```

## Description

`Iterate.Count` is a helper component that returns the count of a data array or object.

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

const MyComponent = () => {
  return <Iterate.Count path="/myList" />
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>,
)
```

You can use the hook as well:

```tsx
const MyComponent = () => {
  const { count } = Iterate.useCount() // id of the form is not needed when called inside a Form.Handler

  return count('/myList')
}

render(
  <Form.Handler data={{ myList: ['foo', 'bar'] }}>
    <MyComponent />
  </Form.Handler>,
)
```

You can also give a custom `filter` function to count only specific items:

```tsx
<Iterate.Count path="/myList" filter={(item) => item !== 'bar'} />
```

Or give the hook a filter:

```tsx
const MyComponent = () => {
  const { count } = Iterate.useCount()

  return count('/myList', (item) => item !== 'bar')
}
```

You can also count over objects:

```tsx
<Form.Handler data={{ myList: { foo: 1, bar: 2 } }}>
  <Iterate.Count path="/myList" filter={([key, value]) => key !== 'bar'} />
</Form.Handler>
```

And you can call it outside of the context as well:

```tsx
render(
  <>
    <Form.Handler id="myForm" data={{ myList: ['foo', 'bar'] }}>
      Form Content
    </Form.Handler>

    <Iterate.Count path="/myList" id="myForm" />
  </>,
)
```

And call it as a function as well (id is required):

```tsx
const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const count = Iterate.count({ id: myFormId, path: '/myList' })

  return (
    <Form.Handler id={myFormId} data={{ myList: ['foo', 'bar'] }}>
      <MyComponent />
    </Form.Handler>
  )
}
```

## Demos

### Default

```tsx
render(
  <Form.Handler
    data={{
      myList: ['foo', 'bar'],
    }}
  >
    <Iterate.Count path="/myList" />
  </Form.Handler>,
)
```

### Interactive

```tsx
const MyForm = () => {
  const { count } = Iterate.useCount('myForm')
  return (
    <Form.Handler
      id="myForm"
      data={{
        myList: [1, 2],
      }}
    >
      <output>
        Total: <Iterate.Count path="/myList" />
      </output>

      <Iterate.Array path="/myList">
        <Iterate.AnimatedContainer gap={false}>
          <Flex.Horizontal align="center">
            <strong>
              <Value.Number itemPath="/" />
            </strong>
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.AnimatedContainer>
      </Iterate.Array>
      <Iterate.PushButton
        path="/myList"
        pushValue={() => {
          return (
            Iterate.count({
              id: 'myForm',
              path: '/myList',
            }) + 1
          )
        }}
        top
      >
        Add item nr. {count('/myList') + 1}
      </Iterate.PushButton>
    </Form.Handler>
  )
}
render(<MyForm />)
```
