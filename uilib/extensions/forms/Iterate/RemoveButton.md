---
title: 'Iterate.RemoveButton'
description: '`Iterate.RemoveButton` connects to the array of a surrounding Iterate.Array and removes the item when clicked.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.477Z
checksum: f8ee112a21fc50920cdfd3cec2d68bd5c9db04abc522b7368dec8674cc28ddc9
---

# Iterate.RemoveButton

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
  </Form.Handler>
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
  </Form.Handler>
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
  </Iterate.Array>
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
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "showConfirmDialog": {
      "doc": "Use `true` to show a confirmation dialog before removing the item.",
      "type": "boolean",
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "RemoveButton.confirmRemoveText": {
      "nb-NO": "Er du sikker på at du vil slette dette?",
      "en-GB": "Are you sure you want to delete this?",
      "sv-SE": "Är du säker på att du vill ta bort detta?",
      "da-DK": "Er du sikker på, at du vil fjerne dette?"
    },
    "RemoveButton.text": {
      "nb-NO": "Fjern",
      "en-GB": "Remove",
      "sv-SE": "Ta bort",
      "da-DK": "Fjern"
    }
  }
}
```
