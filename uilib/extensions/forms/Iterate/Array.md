---
title: 'Iterate.Array'
description: '`Iterate.Array` works in many ways similar to field-components. It has a value-property that can receive an array or you can give it a path if you want it to retrieve an array from a surrounding DataContext. All children components of Iterate.Array are rendered once per item the array-value consists of.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.442Z
checksum: 6f082af7a54a82076a4489c446ffb8acad486b7c8dc38119d5665dde0ae043a4
---

# Iterate.Array

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Array />)
```

## Description

`Iterate.Array` works in many ways similar to field components. It has a `value` property that can receive an array, or you can give it a `path` if you want it to retrieve an array from a surrounding `DataContext`. All child components of `Iterate.Array` are rendered once per item the array value consists of.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array
    label="Array label"
    value={['Iron Man', 'Captain America', 'The Hulk']}
  >
    <Field.String itemPath="/" />
  </Iterate.Array>
)
```

## About `itemPath` and `path`

`itemPath` points to the root of each iterated item, while `path` points to the root of the data source:

```tsx
import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    defaultData={{
      listOfHeroes: [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'The Hulk' },
      ],
    }}
    onChange={console.log}
  >
    <Iterate.Array path="/listOfHeroes">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>
  </Form.Handler>
)
```

## Individual values and dynamic paths

Since `Iterate.Array` renders its children once per item, the field components inside must receive values based on the different items in the array. This can be done in two ways:

### 1. itemPath

If field components inside `Iterate.Array` are given an `itemPath` property, this will look for values based on the array item being the root of the structure, even if the array often comes from a surrounding data set. This means you do not need to think about which index the field should point to, because it is handled by `Iterate.Array` internally. You can treat the individual item as its own structure.

### 2. Function callback as children (render property)

If you want to provide values to individual field components directly instead of pointing to them with paths, you can give `Iterate.Array` a render property. It works a bit like an array map call. The render function provides the value of the item as the first argument, the index of which item you are on as the second, and the internal array as the third.

```tsx
render(
  <Iterate.Array path="/listOfHeroes">
    {(itemValue, itemIndex, internalArray) => {
      return <Field.Name.Last itemPath="/name" />
    }}
  </Iterate.Array>
)
```

You can also get the index by using the `useItem` hook:

```tsx
const MyItem = () => {
  const { index } = Iterate.useItem()

  return <Field.Name.Last itemPath="/name" />
}

render(
  <Iterate.Array path="/listOfHeroes">
    <MyItem />
  </Iterate.Array>
)
```

## The item number in labels

You can use the `{itemNo}` variable in the label to display the current item number. This is useful when you have a list of items and you want to display the item number in the label.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Field.String itemPath="/" label="Item no. {itemNo}" />
  </Iterate.Array>
)
```

The [Iterate.ViewContainer](/uilib/extensions/forms/Iterate/ViewContainer/) and the [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/) also support `{itemNo}` in the `title` property to display the current item number.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']}>
    <Iterate.ViewContainer title="Item no. {itemNo}">
      ...
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

### Initial container mode

This section describes the behavior of the `EditContainer` and the `ViewContainer` components.

By default, the container mode is set to `auto`. This means that the container will open (switch to `edit` mode) when there is an error in the container or the value is falsy (empty string, null, undefined, etc.).

When a new item is added via the [Iterate.PushButton](/uilib/extensions/forms/Iterate/PushButton/) component, the item before it will change to `view` mode, if it had no validation errors.

## Filter data

You can filter data by paths specific or all paths.

- `/myList/0` will filter out the first item of the list, including `foo` and `bar`.
- `/myList/1/foo` will filter out `foo` inside the second item of the list.
- `/myList/*/foo` will filter out all `foo` object keys from all items of the list.
- `/myList/*/subList/*/foo` does support multi wildcard paths.

In the example below, the data given in `onSubmit` will still have "foo2" and "bar2" of the list.

```tsx
import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

const myFilter = {
  '/myList/0': false,
}

render(
  <Form.Handler
    data={{
      myList: [
        { foo: 'foo1', bar: 'bar1' },
        { foo: 'foo2', bar: 'bar2' },
      ],
    }}
    onSubmit={(data, { filterData }) => {
      console.log('onSubmit', filterData(myFilter))
    }}
  >
    <Iterate.Array path="/myList">
      <Field.String itemPath="/foo" label="Foo no. {itemNo}" />
      <Field.String itemPath="/bar" label="Bar no. {itemNo}" />
    </Iterate.Array>
  </Form.Handler>
)
```

Instead of `false` you can provide a function that returns `false` based on your logic.

## Demos

### Primitive items as fields

```tsx
render(
  <Iterate.Array
    defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
    onChange={console.log}
  >
    <Field.String itemPath="/" />
  </Iterate.Array>
)
```

### Primitive items as values

```tsx
render(
  <Value.SummaryList>
    <Iterate.Array
      defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
    >
      <Value.String itemPath="/" />
    </Iterate.Array>
  </Value.SummaryList>
)
```

### Object items

```tsx
render(
  <Iterate.Array
    defaultValue={[
      {
        accountName: 'Brukskonto',
        accountNumber: '90901134567',
      },
      {
        accountName: 'Sparekonto',
        accountNumber: '90901156789',
      },
    ]}
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Composition>
      <Field.BankAccountNumber itemPath="/accountNumber" />
      <Field.String label="Account name" itemPath="/accountName" />
    </Field.Composition>
  </Iterate.Array>
)
```

### Render properties with primitive items

You can provide the child as a function that receives the value of the item as the first argument, and the index of which item you are on as the second.

```tsx
render(
  <Iterate.Array
    defaultValue={['foo', 'bar']}
    onChange={(value) => console.log('onChange', value)}
  >
    {(elementValue) => <Field.String value={elementValue} />}
  </Iterate.Array>
)
```

### Render properties with object items

```tsx
render(
  <Iterate.Array
    defaultValue={[
      {
        num: 1,
        txt: 'One',
      },
      {
        num: 2,
        txt: 'Two',
      },
    ]}
    onChange={(value) => console.log('onChange', value)}
  >
    {({ num, txt }) => (
      <Field.Composition width="large">
        <Field.Number value={num} width="small" />
        <Field.String value={txt} width={false} />
      </Field.Composition>
    )}
  </Iterate.Array>
)
```

### Conditions using Visibility

The second field will be visible when the first has a value.

```tsx
render(
  <Form.Handler>
    <Iterate.Array path="/myList" defaultValue={[{}]}>
      <Flex.Stack>
        <Field.Name.First className="firstName" itemPath="/firstName" />

        <Form.Visibility
          animate
          visibleWhen={{
            itemPath: '/firstName',
            hasValue: (value) => Boolean(value),
          }}
        >
          <Field.Name.Last className="lastName" itemPath="/lastName" />
        </Form.Visibility>
      </Flex.Stack>
    </Iterate.Array>
  </Form.Handler>
)
```

### Dynamic path value

```tsx
render(
  <Form.Handler
    defaultData={{
      count: 0,
    }}
  >
    <Flex.Stack>
      <Field.Number path="/count" width="small" showStepControls />
      <Iterate.Array
        path="/items"
        countPath="/count"
        countPathTransform={({ value, index }) => {
          return 'myObject' in (value || {})
            ? value
            : {
                myObject: index,
              }
        }}
        animate
      >
        <Field.Number itemPath="/myObject" label="Item no. {itemNo}" />
      </Iterate.Array>
      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>
)
```

### Animated container

With an optional `title` and [Iterate.Toolbar](/uilib/extensions/forms/Iterate/Toolbar/).

<Examples.AnimatedContainer />

### Toggle between a view and edit container

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
      data={{
        accounts: [
          {
            firstName: 'Tony',
            lastName: 'Rogers',
          },
        ],
      }}
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
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
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Customize the view and edit containers

- Using `variant="filled"` will render the [Iterate.ViewContainer](/uilib/extensions/forms/Iterate/ViewContainer) and [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer) with a background color.
- Using `toolbarVariant="custom"` will render the [Iterate.Toolbar](/uilib/extensions/forms/Iterate/Toolbar/) without any spacing so you can customize it to your needs.

```tsx
const MyEditItemForm = () => {
  return (
    <Flex.Stack>
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Flex.Stack>
  )
}
const EditItemToolbar = () => {
  return (
    <Iterate.Toolbar>
      <Flex.Horizontal
        justify="space-between"
        style={{
          width: '100%',
        }}
      >
        <Flex.Horizontal gap="large">
          <Iterate.EditContainer.DoneButton />
          <Iterate.EditContainer.CancelButton />
        </Flex.Horizontal>
        <Iterate.ViewContainer.RemoveButton
          showConfirmDialog
          left={false}
        />
      </Flex.Horizontal>
    </Iterate.Toolbar>
  )
}
const MyEditItem = (props) => {
  return (
    <Iterate.EditContainer
      variant="filled"
      toolbarVariant="custom"
      toolbar={<EditItemToolbar />}
      {...props}
    >
      <ValueWithAvatar />
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}
const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/persons"
      title="New person"
      variant="filled"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another person" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.PushContainer>
  )
}
const ValueWithAvatar = () => {
  const { value } = Iterate.useItem()
  const firstName = String(value['firstName'] || '')
  return (
    <Flex.Horizontal align="center">
      <Avatar.Group label={firstName}>
        <Avatar>{firstName.substring(0, 1).toUpperCase()}</Avatar>
      </Avatar.Group>
      <Value.String itemPath="/firstName" />
    </Flex.Horizontal>
  )
}
const MyViewItem = () => {
  return (
    <Iterate.ViewContainer
      variant="filled"
      toolbarVariant="custom"
      toolbar={<></>}
    >
      <Flex.Horizontal align="center" justify="space-between">
        <ValueWithAvatar />

        <Iterate.Toolbar>
          <Iterate.ViewContainer.EditButton />
        </Iterate.Toolbar>
      </Flex.Horizontal>
    </Iterate.ViewContainer>
  )
}
render(
  <Form.Handler
    data={{
      persons: [
        {
          firstName:
            'Tony with long name that maybe will wrap over to a new line',
          lastName: 'Last',
        },
        {
          firstName: 'Maria',
          lastName: 'Last',
        },
      ],
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
    onSubmitRequest={() => console.log('onSubmitRequest')}
  >
    <Flex.Stack>
      <Form.MainHeading>Persons</Form.MainHeading>

      <Form.Card gap={false}>
        <Iterate.Array path="/persons" limit={2}>
          <MyViewItem />
          <MyEditItem />
        </Iterate.Array>

        <CreateNewEntry />
      </Form.Card>

      <Form.SubmitButton variant="send" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Using a line divider

```tsx
const MyEditItem = () => {
  return (
    <Iterate.EditContainer variant="basic" divider="line">
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Iterate.EditContainer>
  )
}
const MyViewItem = () => {
  return (
    <Iterate.ViewContainer variant="basic" divider="line">
      <Value.Name.First itemPath="/firstName" />
      <Value.Name.Last itemPath="/lastName" />
    </Iterate.ViewContainer>
  )
}
render(
  <Form.Handler
    data={{
      accounts: [
        {
          firstName: 'Tony',
          lastName: 'Last',
        },
        {
          firstName: 'Maria',
          lastName: 'Last',
        },
      ],
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
    onSubmitRequest={() => console.log('onSubmitRequest')}
  >
    <Flex.Stack>
      <Form.MainHeading>Accounts</Form.MainHeading>

      <Form.Card>
        <Iterate.Array path="/accounts" divider="line">
          <MyViewItem />
          <MyEditItem />
        </Iterate.Array>
      </Form.Card>

      <Form.SubmitButton variant="send" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Initially open

```tsx
render(
  <Form.Handler required>
    <Wizard.Container>
      <Wizard.Step>
        <Form.Card>
          <Iterate.Array path="/myList" defaultValue={[{}]}>
            <Iterate.ViewContainer>
              <Value.String label="Item {itemNo}" itemPath="/foo" />
            </Iterate.ViewContainer>
            <Iterate.EditContainer>
              <Field.String
                label="Item {itemNo}"
                itemPath="/foo"
                defaultValue="foo"
              />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushButton
            text="Add"
            path="/myList"
            variant="tertiary"
            pushValue={{}}
          />
        </Form.Card>

        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step>
        <Iterate.Array path="/myList" defaultValue={[{}]}>
          <Iterate.EditContainer>
            <Field.String
              label="Item {itemNo}"
              itemPath="/foo"
              defaultValue="foo"
            />
          </Iterate.EditContainer>
          <Iterate.ViewContainer>
            <Value.String label="Item {itemNo}" itemPath="/foo" />
          </Iterate.ViewContainer>
        </Iterate.Array>

        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>

    <Tools.Log top />
  </Form.Handler>
)
```

### Required

With a [Iterate.PushContainer](/uilib/extensions/forms/Iterate/PushContainer/) to add a new item.

The new item gets inserted at the beginning of the array by using the `reverse` property.

```tsx
const MyViewItem = () => {
  return (
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" />
        <Value.Name.Last itemPath="/lastName" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}
const MyEditItem = () => {
  return (
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <MyEditItemContent />
    </Iterate.EditContainer>
  )
}
const MyEditItemContent = () => {
  return (
    <Field.Composition width="large">
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Field.Composition>
  )
}
render(
  <Form.Handler>
    <Form.Card>
      <Iterate.PushContainer
        path="/myListOfPeople"
        title="New account holder"
      >
        <MyEditItemContent />
      </Iterate.PushContainer>

      <Iterate.Array
        path="/myListOfPeople"
        reverse
        animate
        required
        errorMessages={{
          'Field.errorRequired': 'Custom message',
        }}
      >
        <MyViewItem />
        <MyEditItem />
      </Iterate.Array>
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

With a [Iterate.PushButton](/uilib/extensions/forms/Iterate/PushButton/) to add a new item.

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Iterate.Array
        path="/items"
        animate
        required
        errorMessages={{
          'Field.errorRequired': 'Custom message',
        }}
        validateInitially
      >
        <Flex.Horizontal>
          <Field.String itemPath="/" />
          <Iterate.RemoveButton />
        </Flex.Horizontal>
      </Iterate.Array>

      <Iterate.PushButton
        path="/items"
        pushValue="baz"
        text="Add item to hide error"
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

### Minium one item

There are several ways to achieve this:

#### By using a schema

This example uses the `minItems` in a schema with a custom error message.

```tsx
const schema = {
  type: 'object',
  properties: {
    myList: {
      type: 'array',
      minItems: 1,
    },
  },
}
```

It will show the error message when the array is empty.

```tsx
const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myList: {
      type: 'array',
      minItems: 1,
    },
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Iterate.Array
      path="/myList"
      defaultValue={[
        {
          foo: 'Remove me to see the minItems error.',
        },
      ]}
      errorMessages={{
        minItems: 'You need at least one item.',
      }}
    >
      <Iterate.ViewContainer>
        <Value.String itemPath="/foo" />

        <Iterate.Toolbar>
          <Iterate.ViewContainer.EditButton />
          <Iterate.ViewContainer.RemoveButton showConfirmDialog />
        </Iterate.Toolbar>
      </Iterate.ViewContainer>

      <Iterate.EditContainer>
        <Field.String label="Item {itemNo}" itemPath="/foo" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Iterate.PushButton
      text="Add another item"
      path="/myList"
      variant="tertiary"
      pushValue={{}}
    />

    <Tools.Log top />
  </Form.Handler>
)
```

#### By using the `toolbarVariant` property

This example uses the container's `toolbarVariant` property with the value `minimumOneItem`.

It hides the toolbar in the `EditContainer` when there is only one item in the array. And it hides the remove button in the `ViewContainer` when there is only one item in the array.

```tsx
const MyForm = () => {
  const { getCountryNameByIso } = Value.SelectCountry.useCountry()
  return (
    <Form.Handler
      onSubmit={async (data) => console.log('onSubmit', data)}
      onSubmitRequest={() => console.log('onSubmitRequest')}
    >
      <Flex.Stack>
        <Form.MainHeading>Statsborgerskap</Form.MainHeading>

        <Form.Card>
          <Iterate.Array
            path="/countries"
            defaultValue={[null]}
            onChangeValidator={(arrayValue) => {
              const findFirstDuplication = (arr) =>
                arr.findIndex((e, i) => arr.indexOf(e) !== i)
              const index = findFirstDuplication(arrayValue)
              if (index > -1) {
                return new Error(
                  `You cannot have duplicate items: ${getCountryNameByIso(
                    String(arrayValue.at(index))
                  )}`
                )
              }
            }}
          >
            <Iterate.ViewContainer toolbarVariant="minimumOneItem">
              <Value.SelectCountry
                label="Land du er statsborger i"
                itemPath="/"
              />
            </Iterate.ViewContainer>

            <Iterate.EditContainer toolbarVariant="minimumOneItem">
              <Field.SelectCountry
                label="Land du er statsborger i"
                itemPath="/"
                required
              />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushButton
            path="/countries"
            pushValue={null}
            text="Legg til flere statsborgerskap"
          />
        </Form.Card>

        <Form.SubmitButton variant="send" />

        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### With DataContext and add/remove buttons

```tsx
render(
  <Form.Handler
    data={{
      avengers: [
        {
          nickname: 'Iron Man',
          firstName: 'Tony',
          lastName: 'Stark',
        },
        {
          nickname: 'Captain America',
          firstName: 'Steve',
          lastName: 'Rogers',
        },
      ],
    }}
    onChange={(data) => console.log('DataContext/onChange', data)}
  >
    <Flex.Stack>
      <Form.MainHeading>Avengers</Form.MainHeading>

      <Form.Card>
        <Iterate.Array
          path="/avengers"
          onChange={(value) => console.log('Iterate/onChange', value)}
          animate
        >
          <Iterate.AnimatedContainer
            title={
              <Value.String
                label={false}
                itemPath="/nickname"
                placeholder="A Nick name"
              />
            }
          >
            <Field.Name
              itemPath="/nickname"
              width="medium"
              label="Nick name"
            />

            <Field.Composition>
              <Field.Name.First itemPath="/firstName" width="medium" />
              <Field.Name.Last itemPath="/lastName" width="medium" />
            </Field.Composition>

            <Iterate.Toolbar>
              <Iterate.RemoveButton showConfirmDialog />
            </Iterate.Toolbar>
          </Iterate.AnimatedContainer>
        </Iterate.Array>

        <Iterate.PushButton
          text="Add another avenger"
          path="/avengers"
          pushValue={{}}
        />
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

### Static generated in a Table

```tsx
render(
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Age</Th>
      </Tr>
    </thead>
    <tbody>
      <Iterate.Array
        withoutFlex
        defaultValue={[
          {
            name: 'Iron Man',
            age: 45,
          },
          {
            name: 'Captain America',
            age: 123,
          },
          {
            name: 'The Hulk',
            age: 3337,
          },
        ]}
      >
        <Tr>
          <Td>
            <Value.Name.Last itemPath="/name" />
          </Td>
          <Td>
            <Value.Number itemPath="/age" />
          </Td>
        </Tr>
      </Iterate.Array>
    </tbody>
  </Table>
)
```

### Value composition

```tsx
render(
  <Value.Composition>
    <Iterate.Array
      defaultValue={[
        {
          value: 'value 1',
        },
        {
          value: 'value 2',
        },
      ]}
    >
      <Value.String itemPath="/value" />
    </Iterate.Array>
  </Value.Composition>
)
```

### Array validator

You can also add a validator to ensure that the array contains at least one item:

```tsx
const validator = (arrayValue) => {
  if (!(arrayValue?.length > 0)) {
    return new Error('You need at least one item')
  }
}
```

```tsx
render(
  <Form.Handler
    defaultData={{
      items: ['foo'],
    }}
    onSubmit={async () => console.log('onSubmit')}
  >
    <Form.Card>
      <Iterate.Array
        path="/items"
        onChangeValidator={(arrayValue) => {
          if (!(arrayValue && arrayValue.length > 1)) {
            return new Error('You need at least two items')
          }
        }}
        animate
      >
        <Flex.Horizontal align="flex-end">
          <Field.String
            label="Item no. {itemNo}"
            itemPath="/"
            width="medium"
            size="medium"
          />
          <Iterate.RemoveButton showConfirmDialog />
        </Flex.Horizontal>
      </Iterate.Array>

      <Iterate.PushButton top path="/items" pushValue={null} text="Add" />
      <Form.SubmitButton />
    </Form.Card>
  </Form.Handler>
)
```

### Nested Iterate

```tsx
render(
  <Form.Handler
    data={{
      outer: [
        {
          inner: ['foo', 'bar'],
        },
      ],
    }}
  >
    <Iterate.Array path="/outer">
      <Iterate.Array itemPath="/inner">
        <Field.String label="Item {itemNo}" itemPath="/" />
      </Iterate.Array>
    </Iterate.Array>

    <Tools.Log />
  </Form.Handler>
)
```

### Nested Iterate with PushContainer

This demo uses the [Iterate.PushContainer](/uilib/extensions/forms/Iterate/PushContainer/) component to add new items to an nested array by using the `itemPath` property.

```tsx
function EditPerson() {
  return (
    <Flex.Stack>
      <Field.Name.Last itemPath="/name" />

      <FieldBlock label="Citizenship's" asFieldset>
        <Iterate.Array
          itemPath="/citizenships"
          animate
          required
          errorMessages={{
            'Field.errorRequired': 'At least one citizenship is required.',
          }}
        >
          <Flex.Horizontal align="center">
            <Field.SelectCountry label={false} itemPath="/" />
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.Array>
      </FieldBlock>

      <Iterate.PushContainer
        itemPath="/citizenships"
        openButton={
          <Iterate.PushContainer.OpenButton
            top
            text="Add another citizenship"
            variant="tertiary"
          />
        }
        showOpenButtonWhen={(list) => list.length > 0}
        toolbar={
          <Iterate.Toolbar>
            <Iterate.EditContainer.DoneButton text="Add citizenship" />
          </Iterate.Toolbar>
        }
      >
        <Field.SelectCountry label="New citizenship" itemPath="/" />
      </Iterate.PushContainer>
    </Flex.Stack>
  )
}
render(
  <Form.Handler
    required
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Flex.Stack>
      <Iterate.PushContainer
        path="/persons"
        title="New person"
        openButton={
          <Iterate.PushContainer.OpenButton
            text="Add new person"
            variant="tertiary"
          />
        }
        showOpenButtonWhen={(list) => list.length > 0}
      >
        <EditPerson />
      </Iterate.PushContainer>

      <Iterate.Array
        path="/persons"
        required
        errorMessages={{
          required: 'Please add at least one person.',
        }}
      >
        <Iterate.ViewContainer title="Persons">
          <Value.SummaryList>
            <Value.Name.Last itemPath="/name" />

            <ValueBlock label="Citizenship's">
              <Iterate.Array itemPath="/citizenships">
                <Value.SelectCountry inline label={false} itemPath="/" />
              </Iterate.Array>
            </ValueBlock>
          </Value.SummaryList>

          <Iterate.Toolbar>
            <Iterate.ViewContainer.EditButton />
            <Iterate.ViewContainer.RemoveButton showConfirmDialog />
          </Iterate.Toolbar>
        </Iterate.ViewContainer>

        <Iterate.EditContainer title="Edit person">
          <EditPerson />
        </Iterate.EditContainer>
      </Iterate.Array>

      <Form.SubmitButton text="Save" />

      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>
)
```

## Properties

### Iterate-specific properties

```json
{
  "props": {
    "value": {
      "doc": "The data to iterate over. Alternative you can use the `path` prop.",
      "type": "array",
      "status": "optional"
    },
    "path": {
      "doc": "A path (JSON Pointer) to the array to iterate over.",
      "type": "string",
      "status": "optional"
    },
    "itemPath": {
      "doc": "A path (JSON Pointer) to nested array items.",
      "type": "string",
      "status": "optional"
    },
    "required": {
      "doc": "If the array is required. It does not automatically inherit the `required` property in the same way that `Field.*` components do. You may provide a custom error message to give the user a more useful message than the default one: `errorMessages={{ 'Field.errorRequired': 'Custom message' }}`",
      "type": "boolean",
      "status": "optional"
    },
    "minItems": {
      "doc": "The minimum amount of items required to iterate over.",
      "type": "number",
      "status": "optional"
    },
    "maxItems": {
      "doc": "The maximum amount of items to iterate over before showing the error.",
      "type": "number",
      "status": "optional"
    },
    "limit": {
      "doc": "Limit the number of rendered items to iterate over. Defaults to `undefined`.",
      "type": "number",
      "status": "optional"
    },
    "reverse": {
      "doc": "When `true` it will reverse the order of the items.",
      "type": "boolean",
      "status": "optional"
    },
    "countPath": {
      "doc": "A path (JSON Pointer) to the array length.",
      "type": "string",
      "status": "optional"
    },
    "countPathTransform": {
      "doc": "Will transform the current value before it is displayed.",
      "type": "function",
      "status": "optional"
    },
    "countPathLimit": {
      "doc": "Will limit the iterate amount by given \"countPathLimit\" value.",
      "type": "number",
      "status": "optional"
    },
    "withoutFlex": {
      "doc": "When `true` it will omit the Flex.Stack wrapper so it can be used for tables and lists.",
      "type": "boolean",
      "status": "optional"
    },
    "animate": {
      "doc": "When `true` it will animate the height of the items.",
      "type": "boolean",
      "status": "optional"
    },
    "placeholder": {
      "doc": "Will be shown if the value or data context value is empty.",
      "type": "React.Node",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "Will be used to compare the value in order to show the placeholder.",
      "type": "unknown",
      "status": "optional"
    },
    "containerMode": {
      "doc": "Defines the container mode for all nested containers. Can be `view`, `edit` or `auto`. When using `auto`, it will automatically open if there is an error in the container. When a new item is added, the item before it will change to `view` mode, if it had no validation errors. Defaults to `auto`.",
      "type": "string",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "children": {
      "doc": "React.Node or a function so you can get the current value as the first function parameter, and the index as the second parameter as well as the array of internal items as the third parameter.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "[Flex.Stack](/uilib/layout/flex/stack/properties)": {
      "doc": "All Flex.Stack properties.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## Events

### Iterate-specific events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
