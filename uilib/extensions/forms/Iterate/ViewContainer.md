---
title: 'Iterate.ViewContainer'
description: '`Iterate.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.031Z
checksum: 3740fb2dd2daecacdcd46006f95723a17f40bf3c5b296b58cde948055a7d6676
---

# Iterate.ViewContainer

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.ViewContainer />)
```

## Description

`Iterate.ViewContainer` enables users to toggle (with animation) the content of each item between this view and the [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/) container. It can be used instead of the [Iterate.AnimatedContainer](/uilib/extensions/forms/Iterate/AnimatedContainer/).

By default, it features the [Iterate.Toolbar](/uilib/extensions/forms/Iterate/Toolbar/) containing a "Edit" button and a [Iterate.RemoveButton](/uilib/extensions/forms/Iterate/RemoveButton/) button. The "Remove" will delete the current item from the array.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer
      title="Edit account holder"
      titleWhenNew="New account holder"
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.EditContainer>

    <Iterate.ViewContainer title="Account holder">
      <Value.Name.Last itemPath="/name" />
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

## The item number in the title

You can use the `{itemNo}` variable in the `title` property to display the current item number.

```tsx
import { Iterate, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.Name.Last itemPath="/name" />
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

## Customize the Toolbar

```tsx
import { Iterate, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      <Value.Name.Last itemPath="/name" />

      <Iterate.Toolbar>
        <Iterate.ViewContainer.EditButton />
        <Iterate.ViewContainer.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

### Variants

#### `minimumOneItem`

This variant has the following behavior:

- When `ViewContainer` is visible, and the number of items in the array is one, the remove button will be hidden.

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer toolbarVariant="minimumOneItem">
      Item Content
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

## Accessibility

The `Iterate.ViewContainer` component has an `aria-label` attribute, which is set to the `title` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.

When the item (view and edit) container gets removed, the active element focus will be set on the previous item.

## Demos

<Examples.ViewAndEditContainer />

### Toolbar variant

#### Minimum one item

When having one item in the Iterate.Array:

<Examples.ToolbarVariantMiniumOneItemOneItem />

When having two items in the Iterate.Array:

<Examples.ToolbarVariantMiniumOneItemTwoItems />

## Properties

```json
{
  "title": {
    "doc": "The title of the container.",
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
  "[FlexVertical](/uilib/layout/flex/container/properties)": {
    "doc": "All Flex.Vertical properties.",
    "type": "Various",
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "IterateViewContainer.editButton": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    },
    "IterateViewContainer.removeButton": {
      "nb-NO": "Fjern",
      "en-GB": "Remove",
      "sv-SE": "Ta bort",
      "da-DK": "Fjern"
    }
  }
}
```
