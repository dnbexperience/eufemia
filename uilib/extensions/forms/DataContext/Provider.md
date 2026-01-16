---
title: 'Provider'
description: '`DataContext.Provider` is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/metadata.json
---

## Description

`DataContext.Provider` is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually.

For a more complete feature set tailored to building forms, please use [Form.Handler](/uilib/extensions/forms/Form/Handler). It uses DataContext internally.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/DataContext/Provider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/DataContext/Provider)

```tsx
import { DataContext } from '@dnb/eufemia/extensions/forms'
render(
  <DataContext.Provider data={existingData}>...</DataContext.Provider>,
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
  </DataContext.Provider>,
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
  </DataContext.Provider>,
)
```
