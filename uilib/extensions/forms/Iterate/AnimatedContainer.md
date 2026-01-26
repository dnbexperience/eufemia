---
title: 'Iterate.AnimatedContainer'
description: '`Iterate.AnimatedContainer` can be used to animate items when they are added or removed.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.975Z
checksum: e26a9cd2ef9add46be0be2b3722e39b9885b72d1bce7283500f4f6fc4969a44d
---

# Iterate.AnimatedContainer

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
  </Iterate.Array>
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
  </Iterate.Array>
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

## Properties

```json
{
  "title": {
    "doc": "The title of the container.",
    "type": "React.Node",
    "status": "optional"
  },
  "titleWhenNew": {
    "doc": "The title for a new item.",
    "type": "React.Node",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.",
    "type": "string",
    "status": "optional"
  },
  "toolbar": {
    "doc": "An alternative toolbar to be shown in the container.",
    "type": "React.Node",
    "status": "optional"
  },
  "toolbarVariant": {
    "doc": "Use variants to render the toolbar differently. Currently there are the `minimumOneItem` and `custom` variants. See the info section for more info.",
    "type": "string",
    "status": "optional"
  },
  "open": {
    "doc": "If the container should be open or not. This is taken care of internally by default.",
    "type": "boolean",
    "status": "optional"
  },
  "[FlexVertical](/uilib/layout/flex/container/properties)": {
    "doc": "All Flex.Vertical properties.",
    "type": "Various",
    "status": "optional"
  }
}
```
