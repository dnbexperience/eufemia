---
title: 'Iterate.EditContainer'
description: '`Iterate.EditContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.997Z
checksum: e26a9cd2ef9add46be0be2b3722e39b9885b72d1bce7283500f4f6fc4969a44d
---

# Iterate.EditContainer

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.EditContainer />)
```

## Description

`Iterate.EditContainer` enables users to toggle (with animation) the content of each item between the [Iterate.ViewContainer](/uilib/extensions/forms/Iterate/ViewContainer/) and this edit container. It can be used instead of the [Iterate.AnimatedContainer](/uilib/extensions/forms/Iterate/AnimatedContainer/).

By default, it features the [Iterate.Toolbar](/uilib/extensions/forms/Iterate/Toolbar/) containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.

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

You can use the `{itemNo}` variable in the `title` or the `titleWhenNew` property to display the current item number.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.EditContainer>
  </Iterate.Array>
)
```

## Get the internal item object

You can get the internal item object by using the `Iterate.useItem` hook.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyItemForm = () => {
  // TypeScript type inference
  const item = Iterate.useItem<{ foo: string }>()
  console.log('My item:', item.index, item.value.foo)

  return <Field.String itemPath="/" />
}

render(
  <Iterate.Array value={['foo', 'bar']}>
    <MyItemForm />
  </Iterate.Array>
)
```

## Customize the Toolbar

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer>
      <Field.Name.Last itemPath="/name" />
      <Iterate.Toolbar>
        <Iterate.EditContainer.DoneButton />
        <Iterate.EditContainer.CancelButton />
      </Iterate.Toolbar>
    </Iterate.EditContainer>
  </Iterate.Array>
)
```

### Variants

#### `minimumOneItem`

This variant has the following behavior:

- When `EditContainer` is visible, and the number of items in the array is one, the entire toolbar will be hidden.

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.EditContainer toolbarVariant="minimumOneItem">
      Item Content
    </Iterate.EditContainer>
  </Iterate.Array>
)
```

## Accessibility

The `Iterate.EditContainer` component has an `aria-label` attribute, which is set to the `title` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.

When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container.

## Demos

<Examples.ViewAndEditContainer />

### Toolbar variant

#### Minimum one item

When having one item in the Iterate.Array:

<Examples.ToolbarVariantMiniumOneItemOneItem />

When having two items in the Iterate.Array:

<Examples.ToolbarVariantMiniumOneItemTwoItems />

#### EditContainer with error

Press the submit button to see the error.

```tsx
render(
  <Form.Handler
    data={{
      outsideOfCard: [
        {
          name: undefined, // // <- Trigger an error
        },
      ],
      insideOfCard: [
        {
          name: undefined, // // <- Trigger an error
        },
      ],
      withFilledVariant: [
        {
          name: undefined, // // <- Trigger an error
        },
      ],
      withFilledVariantInsideOfCard: [
        {
          name: undefined, // // <- Trigger an error
        },
      ],
      withBasicVariant: [
        {
          name: '', // // <- Trigger an error
        },
      ],
      withBasicVariantInsideOfCard: [
        {
          name: '', // // <- Trigger an error
        },
      ],
    }}
  >
    <Flex.Stack>
      <Iterate.Array path="/outsideOfCard">
        <Iterate.EditContainer title="Outside of card">
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>

      <Form.Card>
        <Iterate.Array path="/insideOfCard">
          <Iterate.EditContainer title="Inside of card">
            <Field.String label="Name" itemPath="/name" required />
          </Iterate.EditContainer>
        </Iterate.Array>
      </Form.Card>

      <Iterate.Array path="/withFilledVariant">
        <Iterate.EditContainer title="Filled variant" variant="filled">
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>

      <Form.Card>
        <Iterate.Array path="/withFilledVariantInsideOfCard">
          <Iterate.EditContainer
            title="Filled variant inside of card"
            variant="filled"
          >
            <Field.String label="Name" itemPath="/name" required />
          </Iterate.EditContainer>
        </Iterate.Array>
      </Form.Card>

      <Iterate.Array path="/withBasicVariant">
        <Iterate.EditContainer title="Basic variant" variant="basic">
          <Field.String label="Name" itemPath="/name" required />
        </Iterate.EditContainer>
      </Iterate.Array>

      <Form.Card>
        <Iterate.Array path="/withBasicVariantInsideOfCard">
          <Iterate.EditContainer
            title="Basic variant inside of card"
            variant="basic"
          >
            <Field.String label="Name" itemPath="/name" required />
          </Iterate.EditContainer>
        </Iterate.Array>
      </Form.Card>
    </Flex.Stack>

    <Form.SubmitButton text="Press me to see the error" />
  </Form.Handler>
)
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

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "IterateEditContainer.cancelButton": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "IterateEditContainer.confirmResetText": {
      "nb-NO": "Er du sikker på at du vil nullstille endringene?",
      "en-GB": "Are you sure you want to clear the changes?",
      "sv-SE": "Är du säker på att du vill återställa ändringarna?",
      "da-DK": "Er du sikker på, at du vil nulstille ændringerne?"
    },
    "IterateEditContainer.doneButton": {
      "nb-NO": "Ferdig",
      "en-GB": "Done",
      "sv-SE": "Klar",
      "da-DK": "Færdig"
    },
    "IterateEditContainer.errorInContainer": {
      "nb-NO": "Feilene ovenfor må rettes.",
      "en-GB": "Please correct the errors above.",
      "sv-SE": "Felen ovan måste åtgärdas.",
      "da-DK": "Fejlene ovenfor skal rettes."
    },
    "IterateEditContainer.removeButton": {
      "nb-NO": "Fjern",
      "en-GB": "Remove",
      "sv-SE": "Ta bort",
      "da-DK": "Fjern"
    },
    "IterateEditContainer.resetButton": {
      "nb-NO": "Nullstill",
      "en-GB": "Reset",
      "sv-SE": "Återställ",
      "da-DK": "Nulstil"
    }
  }
}
```
