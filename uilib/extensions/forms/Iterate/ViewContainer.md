---
title: 'Iterate.ViewContainer'
description: '`Iterate.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.286Z
checksum: fd927e5e6079ac54f6e5194de24331ff79e64fc4982b0071ecc885c7a6568fde
---

# Iterate.ViewContainer

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.ViewContainer />)
```

## Description

`Iterate.ViewContainer` enables users to toggle (with animation) the content of each item between this view and the [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/) container. It can be used instead of the [Iterate.AnimatedContainer](/uilib/extensions/forms/Iterate/AnimatedContainer/).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/ViewContainer)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/ViewContainer)

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


```tsx
const MyEditItemForm = () => {
  return <Field.Composition>
              <Field.Name.First itemPath="/firstName" width="medium" />
              <Field.Name.Last itemPath="/lastName" width="medium" required />
            </Field.Composition>;
};
const MyEditItem = () => {
  return <Iterate.EditContainer title="Edit account holder {itemNo}" titleWhenNew="New account holder {itemNo}">
              <MyEditItemForm />
            </Iterate.EditContainer>;
};
const MyViewItem = () => {
  const item = Iterate.useItem();
  console.log('index:', item.index);
  return <Iterate.ViewContainer title="Account holder {itemNo}">
              <Value.SummaryList>
                <Value.Name.First itemPath="/firstName" showEmpty />
                <Value.Name.Last itemPath="/lastName" placeholder="-" />
              </Value.SummaryList>
            </Iterate.ViewContainer>;
};
const CreateNewEntry = () => {
  return <Iterate.PushContainer path="/accounts" title="New account holder" openButton={<Iterate.PushContainer.OpenButton text="Add another account" />} showOpenButtonWhen={list => list.length > 0}>
              <MyEditItemForm />
            </Iterate.PushContainer>;
};
const MyForm = () => {
  return <Form.Handler data={{
    accounts: [{
      firstName: 'Tony',
      lastName: 'Rogers'
    }]
  }} onChange={data => console.log('DataContext/onChange', data)} onSubmit={async data => console.log('onSubmit', data)}>
              <Flex.Stack>
                <Form.MainHeading>Accounts</Form.MainHeading>

                <Form.Card gap={false}>
                  <Iterate.Array path="/accounts" animate>
                    <MyViewItem />
                    <MyEditItem />
                  </Iterate.Array>

                  <CreateNewEntry />
                </Form.Card>

                <Form.SubmitButton variant="send" />
              </Flex.Stack>
            </Form.Handler>;
};
render(<MyForm />);
```


### Toolbar variant

#### Minimum one item

When having one item in the Iterate.Array:


```tsx
render(<Iterate.Array defaultValue={['foo']}>
        <Iterate.ViewContainer toolbarVariant="minimumOneItem">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer toolbarVariant="minimumOneItem">
          Edit Content
        </Iterate.EditContainer>
      </Iterate.Array>)
```


When having two items in the Iterate.Array:


```tsx
render(<Iterate.Array defaultValue={['foo', 'bar']}>
        <Iterate.ViewContainer toolbarVariant="minimumOneItem">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer toolbarVariant="minimumOneItem">
          Edit Content
        </Iterate.EditContainer>
      </Iterate.Array>)
```

## Properties


```json
{
  "props": {
    "title": {
      "doc": "The title of the container.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.",
      "type": [
        "\"outline\"",
        "\"filled\"",
        "\"basic\""
      ],
      "status": "optional"
    },
    "toolbar": {
      "doc": "An alternative toolbar to be shown in the container.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "toolbarVariant": {
      "doc": "Use variants to render the toolbar differently. Currently there are the `minimumOneItem` and `custom` variants. See the info section for more info.",
      "type": [
        "\"minimumOneItem\"",
        "\"custom\""
      ],
      "status": "optional"
    },
    "[FlexVertical](/uilib/layout/flex/container/properties)": {
      "doc": "All Flex.Vertical properties.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
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
