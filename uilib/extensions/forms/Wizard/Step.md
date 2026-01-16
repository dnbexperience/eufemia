---
title: 'Step'
description: 'Each step should be wrapped with a `Wizard.Step` component directly inside Wizard.Container.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/Step/metadata.json
---

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Step />)
```

## Description

`Wizard.Step` shows child components when the surrounding [Wizard.Container](/uilib/extensions/forms/Wizard/Container/) has been navigated to this step. `Wizard.Container` keeps track of the active step, and navigating between wizard steps is done through callbacks on the `Wizard.Context`, e.g., using [navigation buttons](/uilib/extensions/forms/Wizard/Buttons/).

```tsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const Step1 = () => {
  return (
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
}

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

It uses [Flex.Stack](/uilib/layout/flex/stack/), so you do not need to wrap your content additionally.

## EditButton

In order to navigate back to another step, you can use the [Wizard.EditButton](/uilib/extensions/forms/Wizard/EditButton/) component.

## Events

If you need an event to be triggered when the user changes the active step, you can use the `onStepChange` in the [Wizard.Container](/uilib/extensions/forms/Wizard/Container/).

## Dynamic steps support

You can use the `Wizard.Step` component to create dynamic steps. The `include` and `includeWhen` properties allow you to show or hide a step based on specific conditions.

If a step is replaced by another step, the `onStepChange` event will trigger with `stepListModified` as the second argument. The current step index might remain the same. However, if the total number of steps becomes less than the current step, the index will adjust to the last step.

To keep track of the current step, you can provide each step with an `id` property. This `id` can then be used to identify the current step and will be returned as part of an object in the `onStepChange` event.

```tsx
<Wizard.Container
  onStepChange={(index, mode, args) => {
    const {
      id,
      preventNavigation,
      previousStep: { index },
    } = args
  }}
>
  <Wizard.Step
    title="Step 1"
    id="step-1"
    includeWhen={{ path: '/myPath', hasValue: '...' }}
  >
    content
  </Wizard.Step>
</Wizard.Container>
```

In the demo section, you will find an example demonstrating how to use the `Wizard.Step` component with `includeWhen`.

## Demos

See [Wizard.Container demo section](/uilib/extensions/forms/Wizard/Container/demos) for more examples.

### Dynamic steps

```tsx
render(
  <Form.Handler
    defaultData={{
      includedSteps: 'group-1',
    }}
  >
    <Wizard.Container
      onStepChange={(index, mode, args) => {
        console.log('onStepChange', index, mode, args.id)
      }}
    >
      <Wizard.Step
        title="Step A"
        id="step-a"
        includeWhen={{
          path: '/includedSteps',
          hasValue: 'group-1',
        }}
      >
        <Form.MainHeading>Step A</Form.MainHeading>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step
        title="Step B"
        id="step-b"
        includeWhen={{
          path: '/includedSteps',
          hasValue: 'group-1',
        }}
      >
        <Form.MainHeading>Step B</Form.MainHeading>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step
        title="Step C"
        id="step-c"
        includeWhen={{
          path: '/includedSteps',
          hasValue: (value: string) =>
            ['group-1', 'group-2'].includes(value),
        }}
      >
        <Form.MainHeading>Step C</Form.MainHeading>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step
        title="Step D"
        id="step-d"
        includeWhen={{
          path: '/includedSteps',
          hasValue: 'group-2',
        }}
      >
        <Form.MainHeading>Step D</Form.MainHeading>
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>

    <Field.Selection
      path="/includedSteps"
      variant="button"
      optionsLayout="horizontal"
      top
    >
      <Field.Option value="group-1" title="Group 1" />
      <Field.Option value="group-2" title="Group 2" />
    </Field.Selection>
  </Form.Handler>,
)
```

### Inactive control

If you need more control over what steps the user can freely navigate to, the `inactive` property allows you to treat a step as non-navigable even if it would be normally.

In this example, the first step is never clickable, and you can never skip ahead, even if the next steps have been visited.

```tsx
const Component = () => {
  const { activeIndex } = Wizard.useStep('unique-id-inactive')
  return (
    <Wizard.Container
      mode="strict"
      id="unique-id-inactive"
      initialActiveIndex={2}
      expandedInitially
    >
      <Wizard.Step title="Step 1" inactive>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 2" inactive={activeIndex < 1}>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 3" inactive={activeIndex < 2}>
        <Wizard.Buttons />
      </Wizard.Step>
      <Wizard.Step title="Step 4" inactive={activeIndex < 3}>
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  )
}
render(<Component />)
```
