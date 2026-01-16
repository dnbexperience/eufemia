---
title: 'Container'
description: 'The `Wizard.Container` is a container component for multi-page forms including a step indicator.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/Container/metadata.json
---

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Container />)
```

## Description

The `Wizard.Container` is a container component for multi-step forms, including a [StepIndicator](/uilib/components/step-indicator/).

Use the [Wizard.Step](/uilib/extensions/forms/Wizard/Step/) component to define the wizard steps.

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 1">...</Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

You can also split or separate the `Wizard.Step` and its content:

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

// You can use the `Wizard.Step` in an external component like this:
const Step1 = () => (
  <Wizard.Step title="Step 1">
    <Form.MainHeading>Heading</Form.MainHeading>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>

    <Wizard.Buttons />
  </Wizard.Step>
)

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Step1 />
      </Wizard.Container>
    </Form.Handler>
  )
}
```

You can mix and match the usage of `Wizard.Step` and `Flex.Stack` depending on your needs:

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const Step2 = () => (
  <Flex.Stack>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>

    <Wizard.Buttons />
  </Flex.Stack>
)

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Step2 />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

## Controlling the wizard steps

To define a different initial index (other than 0), you can use the `initialActiveIndex` property.

**Note:** When using `initialActiveIndex`, there may be previous steps with unknown field validation statuses. To address this, you can use the `keepInDOM` property to ensure that some or all steps are not removed from the DOM, so validation runs on fields in previous steps.

For controlling the wizard steps interactively, you can use the [Wizard.useStep](/uilib/extensions/forms/Wizard/useStep/) hook:

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyStep = () => {
  const { setActiveIndex, activeIndex } = Wizard.useStep()
  return (
    <Form.Card>
      <Button onClick={() => setActiveIndex(1)}>Go to step 2</Button>
    </Form.Card>
  )
}

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container initialActiveIndex={3}>
        <Wizard.Step>
          <MyStep />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

When using the `useStep` hook outside of the `Wizard.Container` context, you need to provide a unique `id` (string, function, object or React Context as the reference):

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const myContainerId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  const { setActiveIndex, activeIndex } = Wizard.useStep(myContainerId)

  return (
    <Form.Handler>
      <Wizard.Container id={myContainerId}>
        <Wizard.Step>
          <Button onClick={() => setActiveIndex(0)}>Step 1</Button>
        </Wizard.Step>
        <Wizard.Step>
          <Button onClick={() => setActiveIndex(1)}>Step 2</Button>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

You can also prevent the user from navigating to the next or previous step, by using the `preventNavigation` callback function found as the third parameter, in the `onStepChange` event.

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container
        onStepChange={(step, type, { preventNavigation }) => {
          if (step === 2 && type === 'next') {
            preventNavigation()
          }
        }}
      >
        <Wizard.Step title="Step 1">
          <P>Step 1</P>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <P>Step 2</P>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 3">
          <P>Step 3</P>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

## Modes

- The `strict` mode is the default. The user can only navigate forward using the [Wizard.NextButton](/uilib/extensions/forms/Wizard/NextButton/), not via the menu. However, the previous step remains active, allowing the user to go back at any time—even if there are errors in the current step.
- Use `loose` mode if the user should be able to navigate freely between all steps, including those that have not been visited before. When there is an error in the current step, the user can navigate to other steps via the menu but not via the [Wizard.NextButton](/uilib/extensions/forms/Wizard/NextButton/).

## Accessibility

The `Wizard.Step` component uses an `aria-label` attribute that matches the title property value. The step content is enclosed within a section element, which further enhances accessibility.

Whenever a new step becomes active, it automatically receives focus, ensuring that screen readers convey the relevant information to users.

Additionally, during a step change, the Wizard will scroll to the top of the form to ensure the user is aware of the new content.

## Demos

### Basic usage

```tsx
const initialData = {
  firstName: 'John',
  lastName: 'Doe',
  streetName: 'Osloveien',
  streetNr: 12,
  postalCode: '1234',
  city: 'Oslo',
}
const Step1 = () => (
  <Wizard.Step title="Step 1">
    <Form.MainHeading>Heading</Form.MainHeading>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>

    <Wizard.Buttons />
  </Wizard.Step>
)
const Step2 = () => (
  <Wizard.Step title="Step 2">
    <Form.MainHeading>Heading</Form.MainHeading>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>

    <Wizard.Buttons />
  </Wizard.Step>
)
const Summary = () => {
  const { summaryTitle } = Form.useLocale().Step
  return (
    <Wizard.Step title={summaryTitle}>
      <Form.MainHeading>Summary</Form.MainHeading>
      <Form.Card>
        <Form.SubHeading>Deliver address</Form.SubHeading>

        <Value.SummaryList layout="grid">
          <Value.Name.First path="/firstName" />
          <Value.Name.Last path="/lastName" />

          <Value.Composition label="Street">
            <Value.String path="/streetName" />
            <Value.Number path="/streetNr" />
          </Value.Composition>

          <Value.Composition label="City">
            <Value.String path="/postalCode" />
            <Value.String path="/city" />
          </Value.Composition>
        </Value.SummaryList>

        <Wizard.EditButton toStep={1} />
      </Form.Card>

      <Form.ButtonRow>
        <Wizard.Buttons />
        <Form.SubmitButton variant="send" />
      </Form.ButtonRow>
    </Wizard.Step>
  )
}

// Can be an async function, in case you need to make some async stuff
// Can be an async function, in case you need to make some async stuff
const onStepChange = async (step, mode) => {
  if (mode === 'next') {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  console.log('onStepChange', step, mode)
}

// Can be an async function, in case you need to make some async stuff
// Can be an async function, in case you need to make some async stuff
const onSubmit = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('onSubmit', data)
}
const MyForm = () => {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard')
  return (
    <Form.Handler data={initialData} onSubmit={onSubmit}>
      <Wizard.Container id="my-wizard" onStepChange={onStepChange}>
        <Step1 />
        <Step2 />
        <Summary />
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Async wizard

```tsx
const MyForm = () => {
  const onStepChange = React.useCallback(async (index, mode) => {
    console.log('onStepChange', index)
    if (mode === 'next') {
      try {
        const request = createRequest()
        await request(1000) // Simulate a request
      } catch (error) {
        return error
      }
    }

    // Optional, you can show a FormStatus at the bottom of the form
    return {
      info: `Info message: ${index}`,
    }
  }, [])
  const onSubmit = React.useCallback(async (data) => {
    console.log('onSubmit', data)
    try {
      const request = createRequest()
      await request(1000) // Simulate a request
    } catch (error) {
      return error
    }

    // Optional, you can show a FormStatus at the bottom of the form
    return {
      warning: 'Warning message',
    }
  }, [])
  const validator = React.useCallback(async (value) => {
    try {
      const request = createRequest()
      await request(1000) // Simulate a request
    } catch (error) {
      return error
    }
    if (value === 'invalid') {
      return Error('Error message')
    }
  }, [])
  const validator1 = debounceAsync(validator)
  const validator2 = debounceAsync(validator)
  const Step1 = () => {
    return (
      <Wizard.Step title="Step 1">
        <Form.Card>
          <Field.String
            label="Required field with async validator"
            onChangeValidator={validator1}
            path="/field1"
            required
          />
          <Field.String
            label="Field with async validator"
            onChangeValidator={validator2}
            path="/field2"
          />
        </Form.Card>

        <Wizard.Buttons />
      </Wizard.Step>
    )
  }
  const Step2 = () => {
    return (
      <Wizard.Step title="Step 2">
        <Form.MainHeading>Heading</Form.MainHeading>

        <Form.Card>
          <P>Contents of step 2</P>
        </Form.Card>

        <Form.ButtonRow>
          <Wizard.Buttons />
          <Form.SubmitButton variant="send" />
        </Form.ButtonRow>
      </Wizard.Step>
    )
  }
  return (
    <Form.Handler onSubmit={onSubmit}>
      <Wizard.Container onStepChange={onStepChange}>
        <Step1 />
        <Step2 />
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### With StatusMessage in Menu

This example uses the `loose` mode to demonstrate status messages. Press the `Send` button to see the status message. You may also navigate to the previous steps and press the `Send` button again.

```tsx
render(
  <Form.Handler
    onSubmit={(data) => {
      console.log('onSubmit', data)
    }}
  >
    <Wizard.Container
      onStepChange={async (index, mode) => {
        console.log('onStepChange', index, mode)
      }}
      mode="loose"
      initialActiveIndex={2}
    >
      <Wizard.Step title="Step 1">
        <Field.String label="Step 1" path="/step1" required />
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <Field.String label="Step 2" path="/step2" required />
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 3">
        <Field.String label="Step 3" path="/step3" />
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>

    <Form.SubmitButton />
  </Form.Handler>,
)
```

### With StatusMessage

```tsx
render(
  <Form.Handler>
    <Wizard.Container
      onStepChange={async (index, mode, { preventNavigation }) => {
        preventNavigation()
        return {
          info: 'Info message.',
          warning: 'Warning message.',
        }
      }}
    >
      <Wizard.Step title="Step 1">
        <Form.MainHeading>Step 1</Form.MainHeading>
        <P>Content</P>
        <Wizard.NextButton text="Press me to see the status message" />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>,
)
```

### Get errors before submit or step change

You can use the `onSubmitRequest` property on the [Form.Handler](/uilib/extensions/forms/Form/Handler/) to get visible errors before the form is submitted.

Each item in the error array contains the following properties in an object:

- `path` The path of the field.
- `value` The value of the field.
- `displayValue` The displayed value of the field.
- `label` The label of the field.
- `props` The given field properties.
- `error` The error of the field.

```tsx
const onSubmitRequest: OnSubmitRequest = ({ getErrors }) => {
  getErrors().forEach(
    ({ path, value, displayValue, label, props, error }) => {
      // Do something with the error
      console.log(label, error.message)
    },
  )
}
```

```tsx
render(
  <Form.Handler
    onSubmitRequest={({ getErrors }) => {
      getErrors().forEach(({ label, error }) => {
        console.log(label, error.message)
      })
    }}
  >
    <Wizard.Container mode="loose" variant="drawer">
      <Wizard.Step title="Step 1">
        <Form.Card>
          <Field.String
            path="/foo"
            label="Foo"
            defaultValue="With default value"
            required
          />
          <Field.String path="/bar" label="Bar" required />
        </Form.Card>

        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <Form.Card>
          <Field.String path="/baz" label="Baz" required />
        </Form.Card>

        <Wizard.Buttons />

        <Form.SubmitButton />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>,
)
```

### Outset and layout (Card.Provider)

The wizard navigation area ([StepIndicator](/uilib/components/step-indicator/)) will "outset" (break out) from the layout using negative margins.

This outset is turned off if the `Wizard.Container` is placed inside a `<Card>`, but if placed in a different wrapper that messes with the layout, you can manually turn it off in two ways:

- Wrap the Wizard.Container in `<Form.Card.Provider disableCardBreakout>` to make all nested cards act like they’re inside a `<Card>`.
- Or set `outset={false}` on each card.

See the [Form.Card "Outset" example](/uilib/extensions/forms/Form/Card/#outset) for more details.

```tsx
render(
  <CustomContainerWithPadding>
    <Card.Provider disableCardBreakout>
      <Form.Handler>
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1">
            <Form.Card>
              <Field.String label="Step 1" path="/step1" required />
              <Wizard.Buttons />
            </Form.Card>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Form.Card>
              <Field.String label="Step 2" path="/step2" required />
              <Wizard.Buttons />
            </Form.Card>
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <Form.Card>
              <Field.String label="Step 3" path="/step3" />
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Form.Card>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    </Card.Provider>
  </CustomContainerWithPadding>,
)
```
