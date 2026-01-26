---
title: 'Iterate.PushContainer'
description: '`Iterate.PushContainer` enables users to create a new item in the array.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.017Z
checksum: b226c78d5cb4bb63718571c5862be3893d1a33ae211292f94d0d0772cf40eea0
---

# Iterate.PushContainer

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.PushContainer />)
```

## Description

`Iterate.PushContainer` enables users to create a new item in the array. It can be used instead of the [Iterate.PushButton](/uilib/extensions/forms/Iterate/PushButton/), but with fields in the container.

It allows the user to fill in the fields without storing them in the data context.

Good to know:

- Fields inside the container must have an `itemPath` defined, instead of a `path`.
- If the user enters data without committing it to the outer context, that data will be lost when navigating to another step in the Wizard. To prevent this, you can use the `preventUncommittedChanges` property on the PushContainer. When enabled, it will display an error message if the user tries to proceed without committing their changes.
- You can provide `data`, `defaultData` in addition to `isolatedData` to prefill the fields.
- The `path` you define needs to point to an existing [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) path.

## Usage

You may place it below the [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) component like this:

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer path="/myList" title="New item title">
      <Field.Name.Last itemPath="/name" />
    </Iterate.PushContainer>
  </Form.Handler>
)
```

## Prevent the form from being submitted

To prevent the [Form.Handler](/uilib/extensions/forms/Form/Handler/) from being submitted when there are fields with errors inside the PushContainer, you can use the `bubbleValidation` property.

```tsx
import { Form, Field, Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer path="/myList" bubbleValidation>
      <Field.Name.Last itemPath="/name" required />
    </Iterate.PushContainer>
  </Form.Handler>
)
```

## Show a button to create a new item

By default, it keeps the form open after a new item has been created. You can change this behavior by using the `openButton` and `showOpenButtonWhen` properties.

These properties allow you to render a button (`openButton`) and determine when to show it based on the logic provided by the `showOpenButtonWhen` function. The `showOpenButtonWhen` function receives the current list of items as an argument.

The button will be shown instead of the content provided by the children when the `showOpenButtonWhen` function returns `true`.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer
      path="/myList"
      title="New item title"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another item" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      Will be hidden based on the showOpenButtonWhen function
    </Iterate.PushContainer>
  </Form.Handler>
)
```

The `Iterate.PushContainer.OpenButton` accepts the same properties as the [Button](/uilib/components/button/) component.

## Show the next item number in the open button

You can use the `{nextItemNo}` variable in the `text` or `children` property to display the next item number.

```tsx
import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">...</Iterate.Array>

    <Iterate.PushContainer
      path="/myList"
      title="New item title"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add no. {nextItemNo}" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <Field.Name.Last itemPath="/name" />
    </Iterate.PushContainer>
  </Form.Handler>
)
```

## Technical details

Under the hood, it uses the [Form.Isolation](/uilib/extensions/forms/Form/Isolation/) component to isolate the data from the rest of the form. It also uses the [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/) inside the [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) component to render the fields.

All fields inside the container will be stored in the data context at this path: `/pushContainerItems/0`.

## Demos

### Prevent uncommitted changes

This example uses the `preventUncommittedChanges` property to display an error message if the user has made changes and attempts to navigate to the next Wizard step.

Try entering something in the input field, then navigate to the next step. An error message will appear to indicate that changes must be committed first.

```tsx
render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Form.Card>
          <Form.SubHeading>People</Form.SubHeading>
          <Iterate.Array path="/people" animate placeholder="No people">
            <Value.Name.First itemPath="/firstName" />
          </Iterate.Array>

          <Iterate.PushContainer
            path="/people"
            title="New person"
            preventUncommittedChanges
            bubbleValidation
            openButton={
              <Iterate.PushContainer.OpenButton
                top
                variant="tertiary"
                text="Add new person"
              />
            }
            showOpenButtonWhen={(list) => list.length > 0}
          >
            <Field.Name.First itemPath="/firstName" />
          </Iterate.PushContainer>
        </Form.Card>

        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <Iterate.Array path="/people">
          <Value.Name.First itemPath="/firstName" />
        </Iterate.Array>
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
```

### Initially open

```tsx
const MyEditItemForm = () => {
  return (
    <Field.Composition>
      <Field.Name.First itemPath="/firstName" width="medium" />
      <Field.Name.Last itemPath="/lastName" width="medium" required />
    </Field.Composition>
  )
}
const MyEditItem = () => {
  return (
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}
const MyViewItem = () => {
  const item = Iterate.useItem()
  console.log('index:', item.index)
  return (
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" showEmpty />
        <Value.Name.Last itemPath="/lastName" placeholder="-" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}
const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/accounts"
      title="New account holder"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another account" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.PushContainer>
  )
}
const MyForm = () => {
  return (
    <Form.Handler
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
      <Flex.Stack>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Form.Card gap={false}>
          <Iterate.Array path="/accounts">
            <MyViewItem />
            <MyEditItem />
          </Iterate.Array>

          <CreateNewEntry />
        </Form.Card>

        <Form.SubmitButton variant="send" />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### With existing data

<Examples.ViewAndEditContainer />

### Isolated data

This demo shows how to use the `isolatedData` property to provide data to the PushContainer.

```tsx
const formData = {
  persons: [
    {
      firstName: 'Ola',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Kari',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Per',
      lastName: 'Hansen',
    },
  ],
}
function RepresentativesView() {
  return (
    <Iterate.ViewContainer>
      <Value.Composition>
        <Value.String itemPath="/firstName" />
        <Value.String itemPath="/lastName" />
      </Value.Composition>
    </Iterate.ViewContainer>
  )
}
function RepresentativesEdit() {
  return (
    <Iterate.EditContainer>
      <Field.Name.First itemPath="/firstName" />
      <Field.Name.Last itemPath="/lastName" />
    </Iterate.EditContainer>
  )
}
function ExistingPersonDetails() {
  const { data, getValue } = Form.useData()
  const person = getValue(data['selectedPerson'])?.data || {}
  return (
    <Flex.Stack>
      <Field.Name.First
        readOnly
        itemPath="/firstName"
        value={person.firstName}
      />
      <Field.Name.Last
        readOnly
        itemPath="/lastName"
        value={person.lastName}
      />
    </Flex.Stack>
  )
}
function NewPersonDetails() {
  return (
    <Flex.Stack>
      <Field.Name.First required itemPath="/firstName" />
      <Field.Name.Last required itemPath="/lastName" />
    </Flex.Stack>
  )
}
function PushContainerContent() {
  const { data, update } = Form.useData()
  const selectedPerson = data['selectedPerson'] // Because of missing TypeScript support

  // Clear the PushContainer data when the selected person is "other",
  // so the fields do not inherit existing data.
  React.useLayoutEffect(() => {
    if (selectedPerson === 'other') {
      update('/pushContainerItems/0', {})
    }
  }, [selectedPerson, update])
  return (
    <>
      <Field.Selection
        variant="radio"
        required
        path="/selectedPerson"
        dataPath="/persons"
      >
        <Field.Option value="other" label="Other person" />
      </Field.Selection>

      <HeightAnimation top>
        <Form.Visibility
          visibleWhen={{
            path: '/selectedPerson',
            hasValue: (value) =>
              typeof value === 'string' && value !== 'other',
          }}
        >
          <ExistingPersonDetails />
        </Form.Visibility>

        <Form.Visibility
          visibleWhen={{
            path: '/selectedPerson',
            hasValue: (value) => value === 'other',
          }}
        >
          <NewPersonDetails />
        </Form.Visibility>
      </HeightAnimation>
    </>
  )
}
function RepresentativesCreateNew() {
  return (
    <Iterate.PushContainer
      path="/representatives"
      title="Add new representative"
      isolatedData={{
        persons: formData.persons.map((data, i) => {
          return {
            title: [data.firstName, data.lastName].join(' '),
            value: `/persons/${i}`,
            data,
          }
        }),
      }}
      openButton={
        <Iterate.PushContainer.OpenButton
          variant="tertiary"
          text="Add new representative"
        />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <PushContainerContent />
    </Iterate.PushContainer>
  )
}
render(
  <Form.Handler>
    <Form.MainHeading>Representatives</Form.MainHeading>
    <Flex.Stack>
      <Form.Card>
        <Iterate.Array path="/representatives">
          <RepresentativesView />
          <RepresentativesEdit />
        </Iterate.Array>
        <RepresentativesCreateNew />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log placeholder="-" />
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Iterate.Array path="/x" required>
          <Value.Address itemPath="/y" />
        </Iterate.Array>
        <Iterate.PushContainer
          path="/x"
          variant="outline"
          top
          bottom
          bubbleValidation
        >
          <Field.Address label="variant outline" itemPath="/y" required />
        </Iterate.PushContainer>
        <Iterate.PushContainer
          path="/x"
          variant="filled"
          top
          bottom
          bubbleValidation
        >
          <Field.Address label="variant filled" itemPath="/y" required />
        </Iterate.PushContainer>
        <Iterate.PushContainer
          path="/x"
          variant="basic"
          top
          bottom
          bubbleValidation
        >
          <Field.Address label="variant basic" itemPath="/y" required />
        </Iterate.PushContainer>
        <Wizard.Buttons />
      </Wizard.Step>
      <Wizard.Step title="Step 2">
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
```

## Properties

```json
{
  "path": {
    "doc": "The path to the array to add the new item to.",
    "type": "string",
    "status": "required"
  },
  "itemPath": {
    "doc": "The path to the item in a nested array, to add the new item to.",
    "type": "string",
    "status": "optional"
  },
  "insertAt": {
    "doc": "The index to insert the new item at.",
    "type": "number",
    "status": "optional"
  },
  "title": {
    "doc": "The title of the container.",
    "type": "React.Node",
    "status": "optional"
  },
  "data": {
    "doc": "Prefilled data to be used by fields. The data will be put into this path: `/pushContainerItems/0`. Use `defaultData` when possible.",
    "type": ["object", "array"],
    "status": "optional"
  },
  "defaultData": {
    "doc": "Prefilled data to be used by fields. The data will be put into this path: `/pushContainerItems/0`.",
    "type": ["object", "array"],
    "status": "optional"
  },
  "isolatedData": {
    "doc": "Provide additional data that will be put into the root of the isolated data context (parallel to `/pushContainerItems/0`).",
    "type": "object",
    "status": "optional"
  },
  "required": {
    "doc": "If the fields inside the container are required.",
    "type": "boolean",
    "status": "optional"
  },
  "bubbleValidation": {
    "doc": "Prevent the form from being submitted when there are fields with errors inside the PushContainer.",
    "type": "boolean",
    "status": "optional"
  },
  "preventUncommittedChanges": {
    "doc": "Prevents uncommitted changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.",
    "type": "boolean",
    "status": "optional"
  },
  "showResetButton": {
    "doc": "Show a button to clear the PushContainer data.",
    "type": "boolean",
    "status": "optional"
  },
  "openButton": {
    "doc": "The button to open container.",
    "type": "React.Node",
    "status": "optional"
  },
  "showOpenButtonWhen": {
    "doc": "Define when the \"open button\" should be shown. Should be a function that returns a boolean.",
    "type": "function",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.",
    "type": "string",
    "status": "optional"
  },
  "toolbar": {
    "doc": "A custom toolbar to be shown below the container.",
    "type": "React.Node",
    "status": "optional"
  },
  "dataReference": {
    "doc": "Provide a reference by using `Form.Isolation.createDataReference`.",
    "type": "IsolationDataReference",
    "status": "optional"
  },
  "children": {
    "doc": "The container contents.",
    "type": "React.Node",
    "status": "required"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "IteratePushContainer.createButton": {
      "nb-NO": "Legg til",
      "en-GB": "Add",
      "sv-SE": "Lägg till",
      "da-DK": "Tilføj"
    },
    "IteratePushContainer.itemsLimitReached": {
      "nb-NO": "Du har nådd grensen på: {limit}",
      "en-GB": "You have reached the limit of: {limit}",
      "sv-SE": "Du har nått gränsen på: {limit}",
      "da-DK": "Du har nået grænsen: {limit}"
    }
  }
}
```

## Events

```json
{
  "onCommit": {
    "doc": "Will be called on a nested form context commit – if validation has passed. The first parameter is the committed data object. The second parameter is an object containing a method to clear the internal data `{ clearData }`.",
    "type": "function",
    "status": "optional"
  }
}
```
