---
title: 'Form.Handler'
description: 'The `Form.Handler` is the root component of your form. It provides an HTML form element and handles the form data.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.817Z
checksum: 04607cbd4f87ff024a967f02f28239430391cbd1147cac10882113bd3e3cdc6d
---

# Form.Handler

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Handler />)
```

## Description

The `Form.Handler` is the root component of your form. It provides an HTML form element and handles the form data.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const existingData = { firstName: 'Nora' }

function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={...}
    >
      Your Form
    </Form.Handler>
  )
}
```

`defaultData` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `emptyValue` (often `undefined`).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Handler)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Handler)

### TypeScript support

You can define the TypeScript type structure for your form data. This will help you to get better code completion and type checking.

**NB:** Use `type` instead of `interface` for the type definition.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

type MyData = {
  firstName?: string
}

// Method #1 – without initial data
function MyForm() {
  return (
    <Form.Handler<MyData>
      onSubmit={(data) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}

// Method #2 – with data (initial values)
const existingData: MyData = {
  firstName: 'Nora',
}
function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={(data) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}

// Method #3 – type definition for the submit handler
import type { OnSubmit } from '@dnb/eufemia/extensions/forms'
const submitHandler: OnSubmit<MyData> = (data) => {
  console.log(data.firstName satisfies string)
}
function MyForm() {
  return <Form.Handler onSubmit={submitHandler}>...</Form.Handler>
}

// Method #4 – type definition on the event parameter
function MyForm() {
  return (
    <Form.Handler
      onSubmit={(data: MyData) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}
```

To disable types you can:

```tsx
<Form.Handler<any>>...</Form.Handler>
```

## Decoupling the form element

For more flexibility, you can decouple the form element from the form context by using the `decoupleForm` property. It is recommended to use `Form.Element` to wrap the rest of your form:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyApp() {
  return (
    <Form.Handler decoupleForm>
      <AppRelatedThings>
        <Form.Element>
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <Field.Email />
          </Form.Card>
          <Form.SubmitButton />
        </Form.Element>
      </AppRelatedThings>
    </Form.Handler>
  )
}
```

## Data handling

You can access, mutate, and filter data inside the form context by using the `Form.useData` hook:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const {
    getValue,
    update,
    remove,
    set,
    data,
    filterData,
    reduceToVisibleFields,
  } = Form.useData()

  return <>...</>
}

function MyApp() {
  return (
    <>
      <Form.Handler>...</Form.Handler>
      <MyComponent />
    </>
  )
}
```

- `getValue` will return the value of the given path.
- `update` will update the value of the given path.
- `remove` will remove the given path from the data context (fields will reapply their values afterwards).
- `set` will set the whole dataset.
- `data` will return the whole dataset (unvalidated).
- `filterData` will filter the data based on your own logic.
- `reduceToVisibleFields` will reduce the given data set to only contain the visible fields (mounted fields).

### Using a form ID

The form data can be handled outside the form. This is useful if you want to use the form data in other components:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object, or React Context reference

function MyComponent() {
  const { data } = Form.useData(myFormId)

  return <>...</>
}

function MyApp() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <MyComponent />
    </>
  )
}
```

More examples can be found in the [Form.useData](/uilib/extensions/forms/Form/useData/) hook docs.

## Async `onChange` and `onSubmit` event handlers

**NB:** When using an async `onChange` event handler, the `data` parameter will only include validated data. This lets you utilize the `data` parameter directly in your request, without having to further process or transform it.

If you need to use the original data (sync), you can access it via the [Form.useData](/uilib/extensions/forms/Form/useData/) hook.

Depending on your needs, you may want to use e.g. `debounceAsync` ([debounce](/uilib/helpers/functions/#debounce)) to prevent multiple requests from being sent.

You can return parameters from inside the async `onChange` or `onSubmit` event handler. This way you can display more related information, such as an error or an object with these keys:

```ts
// Async event handler
const onChange = debounceAsync(async function (data) {
  try {
    await makeRequest(data)
  } catch (error) {
    return error
  }

  // Optionally, you can return an object with these keys, depending your needs
  return {
    info: 'Info message',
    warning: 'Warning message',

    // and either an error
    error: new Error('Error message'),

    // or success (when used for autosave)
    success: 'saved',
  } as const
})
```

In all async operations, you can simply return an error object to display it in the form or influence the form behavior.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

// Async function
const onSubmit = async (data) => {
  try {
    const response = await fetch('https://api.example.com', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const data = await response.json()

    Form.setData(myFormId, data) // Whatever you want to do with the data
  } catch (error) {
    return error // Will display the error message in the form
  }

  // Optionally, you can return an object with these keys, depending your needs
  return {
    info: 'Info message',
    warning: 'Warning message',

    // Force the form to stay in pending state
    status: 'pending',

    // and either an error
    error: new Error('Error message'),
  } as const
}

function Component() {
  return (
    <Form.Handler id={myFormId} onSubmit={onSubmit}>
      ...
    </Form.Handler>
  )
}
```

The `info`, `warning`, and `error` messages will be displayed at the bottom of a form or field ([FormStatus](/uilib/components/form-status)), depending on where it is used. The `success` message will be displayed on the label of the field that initiated the `onChange` event.

## Browser autofill

You can set `autoComplete` on the `Form.Handler` – each [Field.String](/uilib/extensions/forms/base-fields/String/)-field will then get `autoComplete="on"`:

```tsx
<Form.Handler autoComplete={true}>
  <Field.String path="/firstName" />
  <Field.String path="/firstName" />
</Form.Handler>
```

The `path` property will be used to set the `name` attribute, which lets the browser know which autocomplete value should be proposed to the user.

## Temporary storage

The `sessionStorageId` feature uses the browser's session storage (temporary storage mechanism) to store data entered by the user.

This allows the user to navigate away and come back to the form without losing already-entered data.

Ensure you only use this feature for non-sensitive data.

It will flush the storage once the form gets submitted.

## Visible data

You can use the `reduceToVisibleFields` function to get only the data of visible (mounted) fields.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    onSubmit={(data, { reduceToVisibleFields }) => {
      const myData = reduceToVisibleFields(data, {
        keepPaths: ['/foo'],
        removePaths: ['/bar'],
      })
    }}
  >
    <Form.SubmitButton />
  </Form.Handler>
)
```

## Filter data

You can use the `filterData` function to filter your `onSubmit` data. It might be useful—for example, to **exclude disabled fields** or filter out empty fields. The callback function receives the following arguments:

The callback function receives the following properties in an object:

- `path` The path of the field.
- `value` The value of the field.
- `displayValue` The displayed value of the field.
- `label` The label of the field.
- `props` The given field properties.
- `error` The error of the field. Is `undefined` if there is no error.

The callback function should return a `boolean` or `undefined`. Return `false` to exclude an entry.

It returns the filtered form data.

The [Form.useData](/uilib/extensions/forms/Form/useData/#filter-data) hook and the [Form.getData](/uilib/extensions/forms/Form/getData/#filter-data) method also returns a `filterData` function you can use to filter data the same way.

In the demo section is an example of how to use the `filterData` method.

### Filter arrays

You can filter arrays by using the `filterData` method. You can find more information about this in the [Iterate.Array](/uilib/extensions/forms/Iterate/Array/#filter-data) docs.

### onSubmit parameters

The `onSubmit` event returns additional functions you can call:

- `filterData` Filters the given/internal data set.
- `reduceToVisibleFields` Reduces the given data set to only contain the visible fields (mounted fields).
- `transformData` Will call your given function for each `Field.*` that contains a path (not `Iterate.Array`). It's up to you to define the shape of the value.
- `resetForm` Deletes `sessionStorage` and browser stored autocomplete data.
- `clearData` Empties the given/internal data set.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFilter = {
  '/myPath': (value) => {
    return value.length > 0
  },
}

const MyForm = () => {
  return (
    <Form.Handler
      onSubmit={(
        data,
        {
          filterData,
          reduceToVisibleFields,
          transformData,
          resetForm,
          clearData,
        }
      ) => {
        resetForm()
        clearData()

        const filteredData = filterData(myFilter)
        const myData = reduceToVisibleFields(filteredData)
        const transformed = transformData(
          myData,
          ({ path, value, displayValue, label, props, error }) => {
            return 'new value'
          }
        )
      }}
      sessionStorageId="session-key"
    >
      <Form.SubmitButton />
    </Form.Handler>
  )
}
```

#### `transformData`

The `transformData` handler will call your given function for each `Field.*` that contains a path (not `Iterate.Array`). The returned value will be used instead of the given `value` and returned as a new data object. It's up to you to define the shape of the returned value.

The callback function receives the following properties in an object:

- `path` The path of the field.
- `value` The value of the field.
- `displayValue` The displayed value of the field.
- `label` The label of the field.
- `props` The given field properties.
- `error` The error of the field. Is `undefined` if there is no error.

**displayValue** can be `undefined` if a field does not support it, or it's value is not set (`emptyValue`).

Most of the fields will return the `displayValue` as a string. But there are some exceptions:

- [Field.ArraySelection](/uilib/extensions/forms/base-fields/ArraySelection/) will return the displayed/active options content as an array that contains a string (or React.ReactNode).

##### `displayValue` from fields inside Iterate.Array

When using the `Iterate.Array` component, you may check if the current entry is an array. This way you ensure you never transform the array itself, but only the values from the fields inside the array.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler
      onSubmit={(data, { transformData }) => {
        const transformedData = transformData(
          data,
          ({ value, displayValue, label }) => {
            return { value, displayValue, label }
          }
        )
      }}
    >
      <Form.Card>
        <Iterate.Array path="/myArray">
          <Field.String itemPath="/" label="My label" />
        </Iterate.Array>
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
```

## Demos

### Required and Optional Fields

To make all fields required, set the `required` property on the `Form.Handler` component.

For fields that should remain optional, use `required={false}` property on the specific field. When doing so, it will append "(optional)" to the optional field's label(`labelSuffix`).

```tsx
render(
  <Form.Handler required>
    <Form.Card>
      <Field.Email path="/email" required={false} />
      <Field.String
        path="/custom"
        label="Label"
        labelDescription="Label description"
        required={false}
      />
      <Field.Currency path="/amount" label="Amount" />
      <Form.SubmitButton />
    </Form.Card>
  </Form.Handler>
)
```

### In combination with a SubmitButton

This example uses an async `onSubmit` event handler. It will disable all fields and show an indicator on the [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) while the form is pending.

With an async function, you can also handle the response from the server and update the form with the new data.

```ts
// Async function
const onSubmit = async (data) => {
  try {
    const response = await fetch('https://api.example.com', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const data = await response.json()
    Form.setData('unique', data) // Whatever you want to do with the data
  } catch (error) {
    return error // Will display the error message in the form
  }
}
```

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

This example is only for demo purpose and will NOT redirect to a new location. It will also time out after 10 seconds.

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

### Reduce your data to visible fields

You can use the `reduceToVisibleFields` function to get only the data of visible (mounted) fields.

```tsx
render(
  <Form.Handler
    defaultData={{
      isVisible: true,
    }}
    onSubmit={(data, { reduceToVisibleFields }) => {
      const myData = reduceToVisibleFields(data, {
        removePaths: ['/isVisible'],
      })
      console.log('Result of reduceToVisibleFields: ', myData)
    }}
  >
    <Flex.Stack>
      <Field.Boolean
        label="Show radio buttons"
        variant="button"
        path="/isVisible"
      />
      <Form.Visibility pathTrue="/isVisible" animate>
        <Field.Selection
          label="Radio buttons"
          variant="radio"
          path="/myValue"
          defaultValue="foo"
        >
          <Field.Option value="foo" title="Foo" />
          <Field.Option value="bar" title="Bar" />
        </Field.Selection>
      </Form.Visibility>
    </Flex.Stack>
  </Form.Handler>
)
```

### With session storage

Changes you make to the fields are temporarily saved and loaded
when the browser reloads. The data is stored until the session storage is invalidated.

```tsx
render(
  <Form.Handler
    onSubmit={(data, { resetForm, clearData }) => {
      console.log('onSubmit', data)

      // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters
      resetForm()
      clearData()
    }}
    sessionStorageId="session-key"
  >
    <Form.Card>
      <Field.String label="Name" path="/name" />
      <Field.Email path="/email" />
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Card>
  </Form.Handler>
)
```

### Locale and translations

```tsx
const myTranslations = {
  'nb-NO': {
    PhoneNumber: {
      label: 'Egendefinert 🚀',
    },
  },
  'en-GB': {
    PhoneNumber: {
      label: 'Custom 🚀',
    },
  },
}
const MyForm = () => {
  const { data } = Form.useData('my-form', {
    locale: 'en-GB',
  })
  return (
    <Form.Handler
      id="my-form"
      locale={data?.locale}
      translations={myTranslations}
    >
      <Form.Card>
        <Field.PhoneNumber />

        <Field.Selection
          path="/locale"
          variant="button"
          optionsLayout="horizontal"
        >
          <Field.Option value="nb-NO">Norsk</Field.Option>
          <Field.Option value="sv-SE">Svenska</Field.Option>
          <Field.Option value="da-DK">Dansk</Field.Option>
          <Field.Option value="en-GB">English</Field.Option>
        </Field.Selection>
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Autocomplete (autofill) user data

```tsx
render(
  <Form.Handler
    onSubmit={(data) => console.log('onSubmit', data)}
    autoComplete
  >
    <Flex.Stack>
      <Form.MainHeading>Delivery address</Form.MainHeading>

      <Form.Card>
        <Form.SubHeading>Your name</Form.SubHeading>

        <Field.Name.First path="/firstName" required />
        <Field.Name.Last path="/lastName" required />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Your address</Form.SubHeading>

        <Field.Composition width="large">
          <Field.String
            label="Street"
            width="stretch"
            path="/streetName"
            required
          />
          <Field.Number
            label="Nr."
            width="small"
            path="/streetNr"
            required
          />
        </Field.Composition>

        <Field.PostalCodeAndCity
          postalCode={{
            required: true,
            path: '/postalCode',
          }}
          city={{
            required: true,
            path: '/city',
          }}
        />
      </Form.Card>

      <Form.Card>
        <P>More information about this form.</P>
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

### Complex async (autosave) example

This example demonstrates how to use async validation with an async `onSubmit` and async `onChange` event for both the `Form.Handler` and a field itself.

- While you write, an async validation request is simulated to check if the input is valid. If it's not, an error message will be shown.

- During validation, only the relevant value will be evaluated. This means, when the delayed validation is done, and the value has changed, the validation result will be omitted.

- You can press enter to submit the form while you write. But only a string of `valid` will be accepted to emit the form `onSubmit` and `onChange`.

- You can start writing, wait a second or two and remove the whole text again and blur the field. The async validation return will be omitted and the "required" error message will be shown.

- It also shows some status messages after the validation and submit requests are done.

- This example does not include an async `onBlurValidator` – but it's possible to add one into the mix as well.

- To access the `date` "in sync" – you can use the [Form.useData](/uilib/extensions/forms/Form/useData/) hook.

```tsx
const validator = debounceAsync(async function secondValidator(
  value: string
) {
  try {
    const request = createRequest()
    const wasCanceled = this.addCancelEvent(request.cancel)
    await request(2000) // Simulate a request

    if (wasCanceled()) {
      throw new Error('Validation request canceled')
    }
  } catch (error) {
    return error
  }
  if (value !== 'valid') {
    return new Error(`Custom error with invalid value: ${value}`) // Show this message
  }
})
const cancelRequest = () => {
  validator.cancel()
}
const onSubmit = async (data) => {
  console.log('onSubmit', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    info: 'Message from onSubmit return',
  }
}
const onChangeForm = async (data) => {
  console.log('onChangeForm', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    warning: 'Warning message',
  }
}
const onChangeField = async (data) => {
  console.log('onChangeField', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    info: 'Info message',
  }
}
const MyForm = () => {
  const { data } = Form.useData('unique-id')
  console.log('data', data)
  return (
    <Form.Handler
      id="unique-id"
      onSubmit={onSubmit}
      onChange={onChangeForm}
    >
      <Flex.Stack>
        <Field.String
          label='Type "valid" to validate the field'
          path="/myField"
          required
          onChangeValidator={validator}
          onChange={onChangeField}
          autoComplete="off"
        />
        <Form.ButtonRow>
          <Form.SubmitButton text="Save" />
          <Button
            text="Stop async operations"
            variant="tertiary"
            icon={stopIcon}
            icon_position="left"
            disabled={false}
            onClick={cancelRequest}
          />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Filter your data

By using the `filterData` method from the `onSubmit` event callback you can filter out data that you do not want to send to your server.

More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) section.

In this example we filter out all fields that are disabled.

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

### Transform data

You can use the `transformData` method from the `onSubmit` event callback to transform the data before sending it to your server.

It's possible to use the `transformOut` on the Form.Handler method to achieve the same result. However, performance-wise, it's better to use the `transformData` method. This is because `transformOut` on the Form.Handler method executes for every change, while the `transformData` method from the `onSubmit` event callback only executes when submitting the form.

```tsx
const MyForm = () => {
  const [submitData, setSubmitData] = React.useState({})
  const onSubmit = (data, { transformData }) => {
    const transformedData = transformData(
      data,
      ({ value, displayValue, label }) => {
        return {
          value,
          displayValue,
          label,
        }
      }
    )
    setSubmitData(transformedData)
    console.log('onSubmit', transformedData)
  }
  return (
    <Form.Handler onSubmit={onSubmit}>
      <Flex.Stack>
        <Field.String
          label="Foo label"
          path="/myString"
          defaultValue="foo"
        />

        <Field.Selection
          label="Bar label"
          path="/mySelection"
          defaultValue="bar"
          variant="dropdown"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.Selection>

        <Field.ArraySelection
          label="Bar label"
          path="/myArraySelection"
          defaultValue={['bar']}
          variant="checkbox"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.ArraySelection>

        <Form.SubmitButton />

        <Tools.Log
          label="Submit Data (press submit to update)"
          data={submitData}
        />
        <Tools.Log label="Data Context" />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
```

## Properties

```json
{
  "defaultData": {
    "doc": "Default source data is used only when no other source is provided and does not trigger updates after mount. Initializing fields with an empty value is optional. If you do, use the field's `emptyValue`, which is often `undefined`.",
    "type": "object",
    "status": "optional"
  },
  "data": {
    "doc": "Dynamic source data used as both initial data, and updates internal data if changed after mount.",
    "type": "object",
    "status": "optional"
  },
  "id": {
    "doc": "Unique id for connecting Form.Handler and helper tools such as Form.useData.",
    "type": ["string", "Function", "Object", "React.Context"],
    "status": "optional"
  },
  "schema": {
    "doc": "JSON Schema for validation of the data set. IMPORTANT: When using JSON Schema validation, you MUST provide an `ajvInstance` prop.",
    "type": "object",
    "status": "optional"
  },
  "errorMessages": {
    "doc": "Object containing error messages by either type of JSON Pointer path and type. The messages can be a React.ReactNode or a string.",
    "type": "object",
    "status": "optional"
  },
  "minimumAsyncBehaviorTime": {
    "doc": "Minimum time to display the submit indicator. Default is 1s.",
    "type": "number",
    "status": "optional"
  },
  "asyncSubmitTimeout": {
    "doc": "The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.",
    "type": "number",
    "status": "optional"
  },
  "scrollTopOnSubmit": {
    "doc": "True for the UI to scroll to the top of the page when data is submitted.",
    "type": "boolean",
    "status": "optional"
  },
  "sessionStorageId": {
    "doc": "Key for saving active data to session storage and loading it on mount.",
    "type": "string",
    "status": "optional"
  },
  "ajvInstance": {
    "doc": "REQUIRED when using JSON Schema validation. Provide your own custom Ajv instance: import Ajv from \"@dnb/eufemia/extensions/forms\" and pass ajvInstance={makeAjvInstance()}. This ensures your bundle only includes AJV when you actually need it. More info in the [Schema validation](/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords) section.",
    "type": "ajv",
    "status": "optional"
  },
  "transformIn": {
    "doc": "Mutate the data context (internally as well) based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",
    "type": "function",
    "status": "optional"
  },
  "transformOut": {
    "doc": "Mutate the data before it enters onSubmit or onChange based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).",
    "type": "function",
    "status": "optional"
  },
  "globalStatusId": {
    "doc": "If needed, you can define a custom [GlobalStatus](/uilib/components/global-status) id. Defaults to `main`.",
    "type": "string",
    "status": "optional"
  },
  "required": {
    "doc": "Will make all nested form fields required.",
    "type": "boolean",
    "status": "optional"
  },
  "disabled": {
    "doc": "Will disable all nested form fields.",
    "type": "boolean",
    "status": "optional"
  },
  "locale": {
    "doc": "Locale (language) to use for all nested Eufemia components.",
    "type": "string",
    "status": "optional"
  },
  "countryCode": {
    "doc": "Will change the country code for fields supporting `countryCode`. You can also set a path as the value, e.g. `/myCountryCodePath`.",
    "type": ["ISO 3166-1 alpha-2", "Path/JSON Pointer"],
    "status": "optional"
  },
  "children": {
    "doc": "Contents.",
    "type": "React.Node",
    "status": "required"
  },
  "autoComplete": {
    "doc": "Will set `autoComplete=\"on\"` on all nested [Field.String](/uilib/extensions/forms/base-fields/String/)-fields.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  },
  "[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/properties)": {
    "doc": "Provider properties such as `data`.",
    "type": "Various",
    "status": "optional"
  },
  "[Form Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attributes)": {
    "doc": "All supported form element attributes.",
    "type": "string",
    "status": "optional"
  }
}
```

## Events

```json
{
  "onChange": {
    "doc": "Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument. When an async function is provided, it will show an indicator on the current label during a field change. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` in addition to { success: 'saved' } indicate the field was saved. Will emit unvalidated by default and validated when an async function is provided (like `onSubmit`). The second parameter is an object containing the `filterData`, `resetForm` and `clearData` functions.",
    "type": "function",
    "status": "optional"
  },
  "onPathChange": {
    "doc": "Will be called when a value of a field was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments. Can be an async function. Will emit unvalidated by default and validated when `onChange` is an async function.",
    "type": "function",
    "status": "optional"
  },
  "onSubmit": {
    "doc": "Will be called (on validation success) when the user submit the form (i.e by clicking a [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton) component inside), with the data set as argument. When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related props: `minimumAsyncBehaviorTime` and `asyncSubmitTimeout`. You can return an error or an object with these keys `{ status: 'pending', info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` to be shown in a [FormStatus](/uilib/components/form-status). Will only emit when every validation has passed. The second parameter is an object containing the `filterData`, `reduceToVisibleFields`, `transformData`, `resetForm` and `clearData` functions.",
    "type": "function",
    "status": "optional"
  },
  "onSubmitRequest": {
    "doc": "Will be called when the user tries to submit, but errors stop the data from being submitted. The first parameter is an object containing the `getErrors` method, returning an array with field errors. Each error object contains the `path`, `error` and `props` of the field. You can use this to log the errors before the form is submitted.",
    "type": "function",
    "status": "optional"
  },
  "onSubmitComplete": {
    "doc": "Will be called after onSubmit has finished and had no errors. It supports the same return values as `onSubmit` and will be merged together.",
    "type": "function",
    "status": "optional"
  },
  "onClear": {
    "doc": "Will be called when the form is cleared via `Form.clearData` or via the `onSubmit` event (or `onCommit`) argument `{ clearData }`.",
    "type": "function",
    "status": "optional"
  },
  "[DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/events)": {
    "doc": "Events such as `onSubmit`.",
    "type": "function",
    "status": "optional"
  }
}
```
