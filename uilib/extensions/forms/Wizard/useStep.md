---
title: 'Wizard.useStep'
description: '`Wizard.useStep` returns `Wizard.Context` parameters such as totalSteps, activeIndex or a setActiveIndex handler.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.254Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Wizard.useStep

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
// Use Wizard.useStep
```

## Description

`Wizard.useStep` is a React Hook that returns `Wizard.Context` parameters such as `totalSteps`, `activeIndex` or the `setActiveIndex` handler.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

function Step1() {
  const { totalSteps, activeIndex, setActiveIndex } = Wizard.useStep()

  return <Wizard.Step>...</Wizard.Step>
}

function MyForm() {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Step1 />
      </Wizard.Container>
    </Form.Handler>
  )
}
```

You can also connect the hook with the `Wizard.Container` via an `id` (string, function, object or React Context as the reference). This lets you render the hook outside of the context:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myContainerId = 'unique-id' // or a function, object or React Context reference

function Sidecar() {
  const { activeIndex, setActiveIndex } = Wizard.useStep(myContainerId)
}

function MyForm() {
  return (
    <Form.Handler>
      <Sidecar />
      <Wizard.Container id={myContainerId}>...</Wizard.Container>
    </Form.Handler>
  )
}
```

## EditButton

In order to navigate to a new step when using `setActiveIndex` you can use the [Wizard.EditButton](/uilib/extensions/forms/Wizard/EditButton/) component.

## Listen to step change

You can also use the `onStepChange` event to listen to a step change.

```jsx
function MyStep() {
  // Ensure to use "useCallback" or keep the function outside of the component to avoid memory leaks
  const onStepChange = React.useCallback(
    (index, mode, { preventNavigation }) => {
      // Do something with the step change
    },
    []
  )

  Wizard.useStep(undefined, { onStepChange })

  return <Wizard.Step>...</Wizard.Step>
}
```

## Demos

```tsx
const Step1 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
const Step2 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
const Step3 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex - 1)
      }}
    >
      Previous
    </Button>
  )
}
render(
  <Wizard.Container mode="loose">
    <Wizard.Step title="Step 1">
      <Step1 />
    </Wizard.Step>

    <Wizard.Step title="Step 2">
      <Step2 />
    </Wizard.Step>

    <Wizard.Step title="Step 3">
      <Step3 />
    </Wizard.Step>
  </Wizard.Container>
)
```

### Outside of context

```tsx
const RenderBefore = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep('unique-id')
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex - 1)
      }}
    >
      Previous
    </Button>
  )
}
const RenderAfter = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep('unique-id')
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
render(
  <Flex.Stack>
    <RenderBefore />
    <Wizard.Container id="unique-id" mode="loose">
      <Wizard.Step title="Step 1">
        <output>Step 1</output>
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <output>Step 2</output>
      </Wizard.Step>

      <Wizard.Step title="Step 1">
        <output>Step 3</output>
      </Wizard.Step>
    </Wizard.Container>
    <RenderAfter />
  </Flex.Stack>
)
```

### Using `onStepChange` event

```tsx
const onStepChange1 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step1:',
    index,
    mode,
    typeof preventNavigation
  )
}
const onStepChange2 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step2:',
    index,
    mode,
    typeof preventNavigation
  )
}
const onStepChange3 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step3:',
    index,
    mode,
    typeof preventNavigation
  )
}
const Step1 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange1,
  })
  return (
    <Wizard.Step title="Step 1">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step2 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange2,
  })
  return (
    <Wizard.Step title="Step 2">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step3 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange3,
  })
  return (
    <Wizard.Step title="Step 3">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(
  <Wizard.Container mode="loose">
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard.Container>
)
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Step.stepHasError": {
      "nb-NO": "Skjemaet inneholder feil.",
      "en-GB": "The form contains errors.",
      "sv-SE": "Formuläret innehåller fel.",
      "da-DK": "Skemaet indeholder fejl."
    },
    "Step.summaryTitle": {
      "nb-NO": "Oppsummering",
      "en-GB": "Summary",
      "sv-SE": "Sammanfattning",
      "da-DK": "Oversigt"
    },
    "WizardEditButton.text": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    },
    "WizardNextButton.text": {
      "nb-NO": "Neste",
      "en-GB": "Next",
      "sv-SE": "Nästa",
      "da-DK": "Næste"
    },
    "WizardPreviousButton.text": {
      "nb-NO": "Tilbake",
      "en-GB": "Back",
      "sv-SE": "Tillbaka",
      "da-DK": "Tilbage"
    }
  }
}
```
