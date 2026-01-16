---
title: 'Isolation'
description: '`Form.Isolation` lets you isolate parts of your form so data and validations are not shared between the `Form.Handler` until you want to.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/Isolation/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Isolation />)
```

## Description

`Form.Isolation` lets you isolate parts of your form so data and validations are not shared between the `Form.Handler` until you want to.

It's a provider that lets you provide a `schema` or `data` very similar to what the [Form.Handler](/uilib/extensions/forms/Form/Handler/) component does.

### Good to know

- It needs to be used inside of a `Form.Handler` component.
- All fields inside need to validate successfully before the isolated data can be committed, just like the `Form.Handler` does before submitting.
- Input fields are prevented from submitting the form when pressing enter. Pressing enter on input fields will commit the isolated data to the `Form.Handler` context instead.
- You can provide a `schema`, `data` or `defaultData` like you would do with the `Form.Handler`.
- You can also provide `data` or `defaultData` to the `Form.Handler` component. If not given on the `Form.Isolation` component, this will define the data that will be used for the isolated data.
- Using `Form.Isolation` inside of a `Form.Section` is supported.
- If the user enters data without committing it to the outer context, that data will be lost when navigating to another step in the Wizard. To prevent this, you can use the `preventUncommittedChanges` property on Form.Isolation. When enabled, it will display an error message if the user tries to proceed without committing their changes.
- `onChange` on the `Form.Handler` will be called when the isolated data gets committed.
- `onChange` on the `Form.Isolation` will be called on every change of the isolated data. Use `onCommit` to get the data that gets committed.

## Usage

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

export function MyForm(props) {
  return (
    <Form.Handler
      defaultData={{ isolated: 'Isolated', regular: 'Regular' }}
    >
      <Form.Isolation resetDataAfterCommit>
        <Field.String label="Isolated" path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>

      <Field.String label="Regular" path="/regular" />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
```

## TypeScript support

You can define the TypeScript type structure for your data like so:

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

type IsolationData = {
  persons: Array<{ name: string }>
  newPerson: Array<{ name: string }>
}

function MyForm() {
  return (
    <Form.Isolation<IsolationData>
      onCommit={(data) => {
        data // <-- is of type IsolationData
      }}
      transformOnCommit={(isolatedData, handlerData) => {
        return {
          ...handlerData,
          persons: [...handlerData.persons, isolatedData.newPerson],
        }
      }}
    >
      ...
    </Form.Isolation>
  )
}
```

## Commit the data to the form

You can either use the `Form.Isolation.CommitButton` or provide a custom ref handler you can use (call) when you want to commit the data to the `Form.Handler` context:

```tsx
import { Form, Field, JSONSchema } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  const commitHandleRef = React.useRef<() => void>()

  return (
    <Form.Handler>
      <Form.Isolation commitHandleRef={commitHandleRef}>
        <Field.PhoneNumber path="/phoneNumber" />
        <Button text="Submit" onClick={commitHandleRef.current} />
      </Form.Isolation>
    </Form.Handler>
  )
}

render(<MyForm />)
```

## Prevent the form from being submitted

To prevent the [Form.Handler](/uilib/extensions/forms/Form/Handler/) from being submitted when there are fields with errors inside the Isolation, you can use the `bubbleValidation` property.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.Isolation bubbleValidation>
      <Field.String label="Required field" path="/isolated" required />
      <Form.Isolation.CommitButton />
    </Form.Isolation>
  </Form.Handler>,
)
```

## Schema support

You can also use a `schema` to define the properties of the nested fields.

**Using Zod schemas**

```tsx
import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Section>
  )
}

const schema = z.object({
  phoneNumber: z.string().regex(/^[0-9]{10}$/),
})

render(
  <Form.Handler>
    <Form.Isolation schema={schema}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Isolation>
  </Form.Handler>,
)
```

**Using JSON Schema (Ajv)**

```tsx
import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const isolatedSchema: JSONSchema = {
  type: 'object',
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^[0-9]{10}$',
    },
  },
  required: ['phoneNumber'],
}

render(
  <Form.Handler ajvInstance={ajv}>
    <Form.Isolation schema={isolatedSchema}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Isolation>
  </Form.Handler>,
)
```

## Clear data from isolated fields

You can clear the isolation by calling `clearData`:

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation
        onCommit={(data, { clearData }) => {
          clearData()
        }}
      >
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
```

## Reset data after commit (`resetDataAfterCommit`)

You can reset the isolation the user committed by using `resetDataAfterCommit`:

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation resetDataAfterCommit>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
```

### Define your own data reference (`dataReference`)

Technically, when you use `preventUncommittedChanges` or `resetDataAfterCommit`, the `Form.Isolation` will use its "initial" internal data set to create a reference. This reference is used to either compare if there is a change or to reset the data context after a commit.

But in some situations, you may need a different data set than the initial data set given at the initial render.

In order to do that you can create a `dataReference` and pass it to the `Form.Isolation` component and call `refresh` on it whenever you need to update it.

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const dataReference = Form.Isolation.createDataReference()

function MyForm() {
  useEffect(() => {
    // When ever you want to refresh the "reset data"
    dataReference.refresh()
  }, [])

  return (
    <Form.Handler>
      <Form.Isolation resetDataAfterCommit dataReference={dataReference}>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
```

## Require the user to commit before submitting (`preventUncommittedChanges`)

In scenarios where you want to ensure users commit their changes before submitting or navigating to the next Wizard step, you can use the `preventUncommittedChanges` property. This will prevent form submission (or a step change) and prompt the user to commit any uncommitted changes first.

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
        <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
      </Form.Isolation>
    </Form.Handler>
  )
}
```

The `showWhen="uncommittedChangeDetected"` property ensures that the reset button is displayed only when the "prevent uncommitted changes" error is visible. This helps prevent users from resetting the form unnecessarily.

## Demos

### Transform data on commit

```tsx
const MyForm = () => {
  return (
    <Form.Handler
      onChange={console.log}
      defaultData={{
        contactPersons: [
          {
            title: 'Hanne',
            value: 'hanne',
          },
        ],
        mySelection: 'hanne',
      }}
    >
      <Form.Card>
        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>

        <HeightAnimation>
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/contactPersons"
          >
            <Field.Option title="Annen person" value="other" />
          </Field.Selection>
        </HeightAnimation>

        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'other',
          }}
          animate
        >
          <Flex.Stack>
            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

            <Form.Isolation
              transformOnCommit={(isolatedData, handlerData) => {
                // Because of missing TypeScript support
                const contactPersons = handlerData['contactPersons']
                const newPerson = isolatedData['newPerson']
                return {
                  ...handlerData,
                  contactPersons: [
                    ...contactPersons,
                    {
                      ...newPerson,
                      value: newPerson.title.toLowerCase(),
                    },
                  ],
                }
              }}
              onCommit={(data, { clearData }) => {
                clearData()
              }}
              resetDataAfterCommit
            >
              <Flex.Stack>
                <Form.Section path="/newPerson">
                  <Field.Name.First required path="/title" />
                </Form.Section>

                <Form.Isolation.CommitButton />
              </Flex.Stack>
            </Form.Isolation>
          </Flex.Stack>
        </Form.Visibility>
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Using the CommitButton

```tsx
render(
  <Form.Handler
    onSubmit={(data) => console.log('onSubmit', data)}
    onChange={(data) => console.log('Regular onChange:', data)}
  >
    <Flex.Stack>
      <Form.Isolation
        resetDataAfterCommit
        onChange={(data) => console.log('Isolated onChange:', data)}
      >
        <Flex.Stack>
          <Field.String required label="Isolated" path="/isolated" />
          <Form.Isolation.CommitButton text="Commit" />
        </Flex.Stack>
      </Form.Isolation>

      <Field.String
        required
        label="Committed from isolation"
        path="/isolated"
      />
      <Field.String
        required
        label="Outside of isolation"
        path="/regular"
      />

      <Form.SubmitButton />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Using commitHandleRef

```tsx
const MyForm = () => {
  const commitHandleRef = React.useRef(null)
  return (
    <>
      <Form.Handler
        bottom="large"
        data={{
          contactPersons: [
            {
              title: 'Hanne',
              value: 'hanne',
            },
          ],
        }}
      >
        <Form.Card>
          <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

          <HeightAnimation>
            <Field.Selection variant="radio" dataPath="/contactPersons" />
          </HeightAnimation>

          <Form.Isolation
            commitHandleRef={commitHandleRef}
            transformOnCommit={(isolatedData, handlerData) => {
              // Because of missing TypeScript support
              const contactPersons = handlerData['contactPersons']
              const newPerson = isolatedData['newPerson']
              const value = newPerson.title.toLowerCase()
              const transformedData = {
                ...handlerData,
                contactPersons: [
                  ...contactPersons,
                  {
                    ...newPerson,
                    value,
                  },
                ],
              }
              return transformedData
            }}
          >
            <Flex.Stack>
              <Form.Section path="/newPerson">
                <Field.Name.First required path="/title" />
              </Form.Section>
            </Flex.Stack>
          </Form.Isolation>
          <Tools.Log />
        </Form.Card>
      </Form.Handler>

      <button
        onClick={() => {
          commitHandleRef.current()
        }}
      >
        Commit from outside of handler
      </button>
    </>
  )
}
render(<MyForm />)
```

### Inside a section

This example has a `defaultValue` both on the Form.Handler and the Form.Isolation.

When no `defaultValue` is set on the Form.Isolation (inner context), the default value from Form.Handler (outer context) is used for the initial value.

When pressing the "Legg til / Add"-button, the default value from Form.Isolation is inserted again, because `resetDataAfterCommit` is set to `true`.

```tsx
render(
  <Form.Handler
    defaultData={{
      mySection: {
        isolated: 'Isolated value defined outside',
        regular: 'Outer regular value',
      },
    }}
    onChange={(data) => {
      console.log('Outer onChange:', data)
    }}
  >
    <Form.Section path="/mySection">
      <Flex.Stack>
        <Form.Isolation
          defaultData={{
            isolated: 'The real initial "isolated" value',
          }}
          onPathChange={(path, value) => {
            console.log('Isolated onChange:', path, value)
          }}
          onCommit={(data) => console.log('onCommit:', data)}
          resetDataAfterCommit
        >
          <Flex.Stack>
            <Field.String label="Isolated" path="/isolated" required />
            <Form.Isolation.CommitButton />
          </Flex.Stack>
        </Form.Isolation>

        <Field.String label="Synced" path="/isolated" />
        <Field.String label="Regular" path="/regular" required />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Section>
  </Form.Handler>,
)
```

### Prevent uncommitted changes

This example uses the `preventUncommittedChanges` property to display an error message if the user has made changes and attempts to submit the form.

Try entering something in the input field, then submit the form. An error message will appear to indicate that changes must be committed first.

```tsx
render(
  <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
    <Flex.Stack>
      <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
        <Flex.Stack>
          <Field.String required label="Isolated" path="/isolated" />

          <Flex.Horizontal>
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
          </Flex.Horizontal>
        </Flex.Stack>
      </Form.Isolation>

      <Form.SubmitButton />

      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Update the data reference

This example shows how to update the data reference at a later point in time.

```tsx
const dataReference = Form.Isolation.createDataReference()
const SetDelayedData = () => {
  const { update } = Form.useData()
  React.useEffect(() => {
    setTimeout(() => {
      update('/isolated', 'With a delayed default value')
      dataReference.refresh() // <-- refresh the data reference
    }, 1000)
  }, [update])
  return null
}
render(
  <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
    <Flex.Stack>
      <Form.Isolation
        preventUncommittedChanges
        resetDataAfterCommit
        dataReference={dataReference}
      >
        <SetDelayedData />
        <Flex.Stack>
          <Field.String required label="Isolated" path="/isolated" />

          <Flex.Horizontal>
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton showConfirmDialog={false} />
          </Flex.Horizontal>
        </Flex.Stack>
      </Form.Isolation>

      <Form.SubmitButton />

      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>,
)
```
