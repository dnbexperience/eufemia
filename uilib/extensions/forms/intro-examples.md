---
title: 'Examples'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/intro-examples/metadata.json
---

## Demos

Here are some examples and case demos (fullscreen) of how you can use the form components.

- [Case Demo 1 (fullscreen)](/uilib/extensions/forms/demo-cases/casedemo1/)
- [Case Demo 2 (fullscreen)](/uilib/extensions/forms/demo-cases/casedemo2/)

## Base field components

Base field components are targeting the data type they produce. They can
receive values and change handlers directly by properties.

```tsx
render(
  <Form.Card>
    <Field.String
      label="Text field"
      value="Lorem Ipsum"
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.Number
      label="Number Field"
      value={789}
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.Boolean
      label="Boolean Field"
      value={true}
      onChange={(value) => console.log('onChange', value)}
    />
  </Form.Card>,
)
```

## Feature fields

Feature fields build on top of base field components and provide standard
properties for simplified form implementations.

```tsx
render(
  <Form.Card>
    <Field.String label="Fornavn" value="John" />
    <Field.String label="Etternavn" value="Smith" />
    <Field.NationalIdentityNumber value="20058512345" />
    <Field.Email value="john@smith.email" />
    <Field.PhoneNumber value="+47 98765432" />
  </Form.Card>,
)
```

## Layout components

Wrapping inputs in [Flex.Stack](/uilib/layout/flex/stack/) and [Form.Card](/uilib/extensions/forms/Form/Card/) with the `stack` property, provides the standard design without
the need for local styles.

```tsx
render(
  <Flex.Stack>
    <Form.MainHeading>Profile</Form.MainHeading>

    <Form.Card>
      <Form.SubHeading>Name</Form.SubHeading>

      <Field.String label="Fornavn" value="John" />
      <Field.String label="Etternavn" value="Smith" />
    </Form.Card>

    <Form.Card>
      <Form.SubHeading>More information</Form.SubHeading>

      <Field.NationalIdentityNumber value="20058512345" />
      <Field.Email value="john@smith.email" />
      <Field.PhoneNumber value="+47 98765432" />
    </Form.Card>
  </Flex.Stack>,
)
```

## Visibility based on data

Certain fields are displayed based on specific data requirements.

```tsx
render(
  <Form.Handler
    defaultData={{
      firstName: undefined,
      lastName: 'Smith',
      advanced: false,
      ssn: '123',
      email: '@smith.email',
      phone: '+47 98765432',
    }}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Flex.Stack>
      <Form.MainHeading>Profile</Form.MainHeading>

      <Form.Card>
        <Form.SubHeading>Name</Form.SubHeading>

        <Field.String path="/firstName" label="Fornavn" />
        <Field.String path="/lastName" label="Etternavn" />
      </Form.Card>

      <Field.Boolean
        path="/advanced"
        variant="checkbox-button"
        label="More fields"
      />
      <Form.Visibility pathTrue="/advanced">
        <Flex.Stack>
          <Form.Card>
            <Form.SubHeading>More information</Form.SubHeading>

            <Field.NationalIdentityNumber value="20058512345" />
            <Field.Email value="john@smith.email" />
            <Field.PhoneNumber value="+47 98765432" />
          </Form.Card>
        </Flex.Stack>
      </Form.Visibility>
    </Flex.Stack>
  </Form.Handler>,
)
```

## Validation

Here are some examples of validation properties of field components.

```tsx
render(
  <Form.Handler
    defaultData={{
      firstName: undefined,
      lastName: 'Smith',
      ssn: '123',
      email: '@smith.email',
      phone: '+47 98765432',
    }}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.MainHeading>Profile</Form.MainHeading>

    <Form.Card>
      <Field.String path="/firstName" label="Fornavn" required />
      <Field.String path="/lastName" label="Etternavn" required />
      <Field.NationalIdentityNumber path="/ssn" validateInitially />
      <Field.Email path="/email" validateInitially />
      <Field.PhoneNumber path="/phone" validateInitially />
    </Form.Card>
  </Form.Handler>,
)
```

## Using [Form.Handler](/uilib/extensions/forms/Form/Handler/)

Wrapping fields with a [Form.Handler](/uilib/extensions/forms/Form/Handler/) component lets them read and
write data to one common data set, and have input and output of data in
one place instead of connecting to every single field component.

```tsx
render(
  <Form.Handler
    defaultData={{
      firstName: 'John',
      lastName: 'Smith',
      ssn: '20058512345',
      email: 'john@smith.email',
      phone: '+47 98765432',
    }}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Form.MainHeading>Profile</Form.MainHeading>

    <Form.Card>
      <Field.String path="/firstName" label="Fornavn" />
      <Field.String path="/lastName" label="Etternavn" />
      <Field.NationalIdentityNumber path="/ssn" />
      <Field.Email path="/email" />
      <Field.PhoneNumber path="/phone" />

      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>,
)
```

## Using Wizard

With a [Wizard](/uilib/extensions/forms/Wizard/Container) component, you can create a wizard-like flow of steps.

```tsx
function MyForm() {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard')
  const { summaryTitle } = Form.useLocale().Step
  return (
    <Form.Handler
      defaultData={{
        firstName: undefined,
        lastName: 'Smith',
        advanced: false,
        ssn: '123',
        email: '@smith.email',
        phone: '+47 98765432',
      }}
      onChange={(data) => console.log('onChange', data)}
      onPathChange={(path, value) =>
        console.log('onPathChange', path, value)
      }
      onSubmit={(data) => console.log('onSubmit', data)}
    >
      <Wizard.Container id="my-wizard" mode="loose">
        <Wizard.Step title="Name">
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Form.SubHeading>Name</Form.SubHeading>

            <Field.String path="/firstName" label="Fornavn" required />
            <Field.String path="/lastName" label="Etternavn" required />
          </Form.Card>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="More information">
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Form.SubHeading>More information</Form.SubHeading>

            <Field.NationalIdentityNumber path="/ssn" />
            <Field.Email path="/email" />
            <Field.PhoneNumber path="/phone" />
          </Form.Card>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Value.SummaryList layout="grid">
              <Value.String path="/firstName" label="Fornavn" />
              <Value.String path="/lastName" label="Etternavn" />

              <Value.NationalIdentityNumber path="/ssn" />
              <Value.Email path="/email" />
              <Value.PhoneNumber path="/phone" />
            </Value.SummaryList>
          </Form.Card>

          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```

## Using a Form.Section

With a [Form.Section](/uilib/extensions/forms/Form/Section) component, you can create a section of fields and values that can be reused in different contexts. It also lets you define a container for the section, so you can easily switch between an edit and a view container.

```tsx
const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer variant="basic">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: undefined, // initiate error
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>,
)
```

## Iterate over repeated data

You can use the [Iterate](/uilib/extensions/forms/Iterate/) component to iterate over repeated data. It also lets you define animated containers, so you can easily switch between an edit and a view container.

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
function MyForm() {
  return (
    <Form.Handler
      data={{
        accounts: [
          {
            firstName: 'Tony',
            lastName: undefined, // initiate error
          },
        ],
      }}
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
      <Flex.Vertical>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Form.Card gap={false}>
          <Iterate.Array path="/accounts">
            <MyViewItem />
            <MyEditItem />
          </Iterate.Array>

          <CreateNewEntry />
        </Form.Card>

        <Form.SubmitButton variant="send" />
      </Flex.Vertical>
    </Form.Handler>
  )
}
render(<MyForm />)
```
