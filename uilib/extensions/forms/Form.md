---
title: 'Form'
description: '`Form` provides the main forms-helpers including data provider and event handling.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.967Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
```

## Description

`Form` provides the main forms-helpers including data provider and event handling.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const existingData = {
  email: 'name@email.no',
}

function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={async (data) => {
        await makeRequest(data)
      }}
    >
      <Form.MainHeading>Heading</Form.MainHeading>
      <Form.Card>
        <Field.Email path="/email" />
      </Form.Card>

      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Handler>
  )
}
```

`defaultData` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `emptyValue` (often `undefined`).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form)

## Demos

### With a help button

```tsx
render(
  <Form.Handler
    defaultData={{
      myField: 12345,
    }}
  >
    <Form.Card>
      <Field.Number
        path="/myField"
        label="Label text"
        help={{
          title: 'Help title',
          content: 'Help content.',
        }}
      />
      <Value.Number
        path="/myField"
        inheritLabel
        help={{
          title: 'Help title',
          content: 'Help content.',
        }}
      />
    </Form.Card>
  </Form.Handler>
)
```

### In combination with a SubmitButton

```tsx
render(
  <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
    <Form.Card>
      <Field.Email path="/email" />
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
```

### New location after async submit

```tsx
render(
  <Form.Handler
    data={{
      myField: 'Some value',
    }}
    onSubmit={async (data) => {
      console.log('onSubmit', data)

      // Wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // e.g. go to new location

      // Optionally, you can return e.g. the "pending" status with an additional info
      return {
        info: 'Redirecting to a new location',
        // Force the form to stay in pending state
        status: 'pending',
      }
    }}
    asyncSubmitTimeout={10000}
  >
    <Flex.Stack>
      <Form.MainHeading>Heading</Form.MainHeading>
      <Form.Card>
        <Value.String label="Summary" path="/myField" />
      </Form.Card>
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Flex.Stack>
  </Form.Handler>
)
```

### Filter your data

```tsx
const id = 'my-form'
const filterDataHandler = ({ props }) => !props.disabled
const MyForm = () => {
  const { data } = Form.useData(id, {
    disabled: false,
    myField: 'Value',
  })
  return (
    <Form.Handler
      id={id}
      onSubmit={(data, { filterData }) => {
        console.log('onSubmit', filterData(filterDataHandler))
      }}
    >
      <Flex.Stack>
        <Field.Boolean label="Disabled" path="/disabled" />
        <Field.String
          label="My Field"
          path="/myField"
          disabled={data.disabled}
        />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData(id)
  const { hasErrors } = Form.useValidation(id)
  return (
    <>
      <Tools.Log top data={hasErrors()} label="hasErrors:" />
      <Tools.Log top data={filterData(filterDataHandler)} />
    </>
  )
}
render(
  <>
    <MyForm />
    <Output />
  </>
)
```

## Components

<ListFormComponents size="small" />
