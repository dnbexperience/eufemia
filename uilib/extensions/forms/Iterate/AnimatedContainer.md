---
title: 'AnimatedContainer'
description: '`Iterate.AnimatedContainer` can be used to animate items when they are added or removed.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/AnimatedContainer/metadata.json
---

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.AnimatedContainer />)
```

## Description

`Iterate.AnimatedContainer` can be used to animate items when they are added or removed. It provides a smooth transition effect for a better user experience.

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.AnimatedContainer>Item Content</Iterate.AnimatedContainer>
  </Iterate.Array>,
)
```

## The item number in the title

You can use the `{itemNo}` variable in the `title` or the `titleWhenNew` property to display the current item number.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.AnimatedContainer title="Item {itemNo}">
      <Field.Name.Last itemPath="/name" />
    </Iterate.AnimatedContainer>
  </Iterate.Array>,
)
```

## Accessibility

The `Iterate.AnimatedContainer` component has an `aria-label` attribute, which is set to the `title` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.

## Demos

```tsx
const MyForm = () => {
  const { count } = Iterate.useCount('myForm')
  return (
    <Form.Handler
      defaultData={{
        myList: ['Item 1'],
      }}
      id="myForm"
    >
      <Form.Card>
        <Iterate.Array
          path="/myList"
          placeholder={<>Empty list</>}
          animate
        >
          <Iterate.AnimatedContainer title="Title {itemNo}">
            <Field.String label="Label" itemPath="/" />

            <Iterate.Toolbar>
              <Iterate.RemoveButton />
            </Iterate.Toolbar>
          </Iterate.AnimatedContainer>
        </Iterate.Array>

        <Iterate.PushButton
          path="/myList"
          pushValue={`Item ${String(count('/myList') + 1)}`}
          text="Add new item"
        />
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
```
