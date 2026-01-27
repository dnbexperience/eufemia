---
title: 'DataContext.Provider'
description: '`DataContext.Provider` is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.233Z
checksum: 4f168e715a780fffd9f14c309b7b971f20b6d4176a0fa13609d9428a91b2e98d
---

# DataContext.Provider

## Description

`DataContext.Provider` is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually.

For a more complete feature set tailored to building forms, please use [Form.Handler](/uilib/extensions/forms/Form/Handler). It uses DataContext internally.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/DataContext/Provider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/DataContext/Provider)

```tsx
import { DataContext } from '@dnb/eufemia/extensions/forms'
render(
  <DataContext.Provider data={existingData}>...</DataContext.Provider>
)
```

## Demos

### Data and callback events (and session store)

```tsx
render(
  <DataContext.Provider
    defaultData={testData}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
    onSubmitRequest={() => console.log('onSubmitRequest')}
    onSubmit={(data, { resetForm, clearData }) => {
      console.log('onSubmit', data)

      // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters
      resetForm()
      clearData()
    }}
    sessionStorageId="provider-example-1"
  >
    <Flex.Stack>
      <Form.Card>
        <Flex.Vertical divider="line" gap="small">
          <Field.String
            path="/requiredString"
            label="Required string"
            required
          />
          <Field.String path="/hmm" label="Invalid path" />
          <Field.String path="/string" label="String value" />
          <Field.String path="/string" label="String value (copy)" />
          <Field.Number path="/number" label="Number value" />
          <Field.String path="/number" label="Number with Field.String" />
          <Field.Boolean
            path="/boolean"
            label="Boolean - Checkbox"
            variant="checkbox"
          />
          <Field.Boolean
            path="/boolean"
            label="Boolean - Toggle"
            variant="button"
          />
          <div>
            <Field.String path="/nested/nestedText" label="Nested text" />
            <Field.Number
              path="/nested/nestedNumber"
              label="Nested number (minimum 50)"
              minimum={50}
            />
          </div>
          <div className="hmm">
            <Flex.Horizontal>
              <Field.String path="/list/0/itemText" label="Item text" />
              <Field.Number
                path="/list/0/itemNumber"
                label="Item number"
              />
            </Flex.Horizontal>
            <Flex.Horizontal>
              <Field.String path="/list/1/itemText" label="Item text" />
              <Field.Number
                path="/list/1/itemNumber"
                label="Item number"
              />
            </Flex.Horizontal>
          </div>
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Vertical>
      </Form.Card>
    </Flex.Stack>
  </DataContext.Provider>
)
```

### Validation with Json Schema

```tsx
render(
  <DataContext.Provider
    data={testData}
    schema={TestDataSchema}
    ajvInstance={ajv}
    onChange={(data) => console.log('onChange', data)}
    onPathChange={(path, value) =>
      console.log('onPathChange', path, value)
    }
    onSubmit={(data) => console.log('onSubmit', data)}
    onSubmitRequest={() => console.log('onSubmitRequest')}
  >
    <Flex.Stack>
      <Form.Card>
        <Flex.Vertical divider="line" gap="small">
          <Field.String path="/requiredString" label="Required string" />
          <Field.String path="/hmm" label="Invalid path" />
          <Field.String path="/string" label="String value" />
          <Field.String path="/string" label="String value (copy)" />
          <Field.Number path="/number" label="Number value" />
          <Field.String path="/number" label="Number with Field.String" />
          <Field.Boolean
            path="/boolean"
            label="Boolean - Checkbox"
            variant="checkbox"
          />
          <Field.Boolean
            path="/boolean"
            label="Boolean - Toggle"
            variant="button"
          />
          <div>
            <Field.String path="/nested/nestedText" label="Nested text" />
            <Field.Number
              path="/nested/nestedNumber"
              label="Nested number"
            />
          </div>
          <div className="hmm">
            <Flex.Horizontal>
              <Field.String path="/list/0/itemText" label="Item text" />
              <Field.Number
                path="/list/0/itemNumber"
                label="Item number"
              />
            </Flex.Horizontal>
            <Flex.Horizontal>
              <Field.String path="/list/1/itemText" label="Item text" />
              <Field.Number
                path="/list/1/itemNumber"
                label="Item number"
              />
            </Flex.Horizontal>
          </div>
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Vertical>
      </Form.Card>
    </Flex.Stack>
  </DataContext.Provider>
)
```

## Properties

```json
{
  "props": {
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
      "doc": "Make all fields required.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "Disable all fields.",
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
    }
  }
}
```

## Events

```json
{
  "props": {
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
    }
  }
}
```
