---
title: 'StepIndicator'
description: "The StepIndicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions."
version: 11.0.1
generatedAt: 2026-04-24T10:40:50.880Z
checksum: 7094e7f08cf3afc69f190c375d8431006f20b457a07ad2e731e6ad137f4dbe05
---

# StepIndicator

## Import

```tsx
import { StepIndicator } from '@dnb/eufemia'
```

## Description

The step indicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions. Their purpose is to both guide the user through the process and to help them create a mental model of the amount of time and effort that is required to fulfill the process.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=15878-71)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/step-indicator)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/step-indicator)

If the user should be able to navigate back and forth, use the `mode="loose"` property. More about the modes further down.

The current active step is set with the `currentStep` property or within the data with the `isCurrent` object property.

**NB:** Whenever possible, ensure you bind the `currentStep` to the browsers path location. See the [example below](/uilib/components/step-indicator/#stepindicator-with-a-router) or [the example on CodeSandbox](https://codesandbox.io/s/eufemia-step-indicator-with-reach-router-mhu0bh?file=/src/App.tsx).

## Modes

The mode property is mandatory. It tells the component how it should behave.

- [strict](/uilib/components/step-indicator#strict-mode)
- [loose](/uilib/components/step-indicator#loose-mode)
- [static](/uilib/components/step-indicator#static-mode)

### Strict mode

Use `strict` for a chronological step order.

The user can navigate between the visited steps and the current step. The component keeps track of these reached steps.

### Loose mode

Use `loose` if the user should be able to navigate freely between all steps. Also, those which are not visited before.

### Static mode

Use `static` for non-interactive steps.

## Modify a step

You can easily modify a step – e.g. should one step not be interactive, you can use the `inactive` property on that step:

```js
const steps = [
  { title: 'Active' },
  { title: 'Not active', inactive: true },
]
```

More details about modifying steps in the [properties panel](/uilib/components/step-indicator/properties#step-item-properties).

## Demos

### StepIndicator in loose mode

Every step can be clicked.

```tsx
const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Space stretch>
        <StepIndicator
          mode="loose"
          currentStep={step}
          onChange={({ currentStep }) => {
            setStep(currentStep)
          }}
          data={[
            'Cum odio si bolig bla et ta',
            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',
            'Bibendum sociis',
          ]}
          bottom
        />

        <Button
          variant="secondary"
          onClick={() => {
            setStep((step) => {
              if (step >= 2) {
                step = -1
              }
              return step + 1
            })
          }}
        >
          Next step
        </Button>
      </Space>
    </div>
  )
}
render(<InteractiveDemo />)
```

### StepIndicator in strict mode

Every visited step can be clicked, including the current step.

```tsx
render(
  <StepIndicator
    mode="strict"
    currentStep={1}
    onChange={({ currentStep }) => {
      console.log('onChange', currentStep)
    }}
    data={[
      {
        title: 'Velg mottaker',
      },
      {
        title: 'Bestill eller erstatt',
        onClick: ({ currentStep }) =>
          console.log('currentStep:', currentStep),
        status:
          'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
      },
      {
        title: 'Oppsummering',
      },
    ]}
  />
)
```

### StepIndicator in static mode

None of the steps are clickable.

```tsx
render(
  <StepIndicator
    mode="static"
    currentStep={1}
    onChange={({ currentStep }) => {
      console.log('onChange', currentStep)
    }}
    data={[
      {
        title: 'Om din nye bolig',
      },
      {
        title: 'Ditt lån og egenkapital',
        onClick: ({ currentStep }) => console.log(currentStep),
      },
      {
        title: 'Oppsummering',
      },
    ]}
  />
)
```

### StepIndicator with a router

```tsx
const StepIndicatorWithRouter = () => {
  const [currentStep, setCurrentStep] = React.useState(1)
  React.useEffect(() => {
    const step =
      parseFloat(window.location.search?.replace(/[?]/, '')) || 1
    setCurrentStep(step)
  }, [])
  return (
    <>
      <StepIndicator
        mode="loose"
        currentStep={currentStep - 1}
        onChange={({ currentStep }) => {
          const step = currentStep + 1
          setCurrentStep(step)
          window.history.pushState({}, '', '?' + step)
        }}
        data={[
          {
            title: 'Om din nye bolig',
          },
          {
            title: 'Ditt lån og egenkapital',
          },
          {
            title: 'Oppsummering',
          },
        ]}
      />
    </>
  )
}
render(<StepIndicatorWithRouter />)
```

### StepIndicator customized

Completely customized step indicator.

```tsx
function CustomStepIndicator({ children, data, ...props }) {
  const [step, setStep] = React.useState(0)
  return (
    <>
      <StepIndicator
        mode="loose"
        data={data}
        currentStep={step}
        onChange={({ currentStep }) => setStep(currentStep)}
        bottom
        {...props}
      />
      <Section backgroundColor="lavender" innerSpace>
        {children(step)}
      </Section>
    </>
  )
}
render(
  <CustomStepIndicator
    data={[
      {
        title: 'First',
        isCurrent: true,
      },
      {
        title: 'Second',
      },
      {
        title: 'Last',
      },
    ]}
  >
    {(step) => {
      switch (step) {
        case 0:
          return <>Step One</>
        case 1:
          return <>Step Two</>
        default:
          return <>Fallback</>
      }
    }}
  </CustomStepIndicator>
)
```

### StepIndicator with text only

This example also demonstrates the `expandedInitially` property.

```tsx
render(
  <StepIndicator
    expandedInitially
    mode="static"
    currentStep={1}
    data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
  />
)
```

### With skeleton

```tsx
render(
  <StepIndicator
    mode="static"
    skeleton
    currentStep={1}
    expandedInitially
    data={[
      {
        title: 'Om din nye bolig',
      },
      {
        title: 'Ditt lån og egenkapital',
      },
      {
        title: 'Oppsummering',
      },
    ]}
  />
)
```

```tsx
render(
  <StepIndicator
    mode="loose"
    currentStep={0}
    data={[
      {
        title: 'Current',
      },
      {
        title: 'Warning',
        status: 'Status message',
        statusState: 'warning',
      },
      {
        title: 'Error',
        status: 'Status message',
        statusState: 'error',
      },
      {
        title: 'Information',
        status: 'Status message',
        statusState: 'information',
      },
    ]}
  />
)
```

## Properties

```json
{
  "props": {
    "mode": {
      "doc": "Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.",
      "type": ["\"static\"", "\"strict\"", "\"loose\""],
      "status": "required"
    },
    "data": {
      "doc": "Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See below for properties of `STEP_DATA`.",
      "type": [
        "Array<[Step Item](#step-item-properties)>",
        "Array<string>"
      ],
      "status": "required"
    },
    "currentStep": {
      "doc": "Defines the initial step starting from 0. Also defines the furthest step visited when `mode=\"strict\"`. Will update to the new step if changed (but will not trigger the `onChange` event). Defaults to `0`.",
      "type": "number",
      "status": "optional"
    },
    "overviewTitle": {
      "doc": "The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`. Defaults to `Steps Overview`.",
      "type": "string",
      "status": "optional"
    },
    "stepTitle": {
      "doc": "Label for `<StepIndicatorTriggerButton />` and screen reader text for `<StepIndicatorItem />`. Must contain `%step` and `%count` to interpolate `currentStep` and `stepCount` into the text. Defaults to `Step %step of %count`.",
      "type": "string",
      "status": "optional"
    },
    "hideNumbers": {
      "doc": "Define whether to show automatically counted numbers or not. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "If set to `true`, the height animation on step change and list expansion will be omitted. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "expandedInitially": {
      "doc": "Set to `true` to have the list be expanded initially. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "outset": {
      "doc": "Whether or not to break out (using negative margins) on larger screens. Defaults to `false`. Same as `outset` in [Card](/uilib/components/card/properties).",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Text for status shown below the step indicator when it is not expanded. Defaults to `undefined`.",
      "type": "string",
      "status": "optional"
    },
    "statusState": {
      "doc": "The type of status shown when the `status` property is set. Defaults to `warning`.",
      "type": ["\"warning\"", "\"information\"", "\"error\""],
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Step Item Properties

```json
{
  "props": {
    "title": {
      "doc": "The title of the step.",
      "type": ["string", "React.ReactNode"],
      "status": "required"
    },
    "isCurrent": {
      "doc": "If set to `true`, this item step will be set as the current selected step. This can be used instead of `currentStep` on the main component.",
      "type": "boolean",
      "status": "optional"
    },
    "inactive": {
      "doc": "If set to `true`, this item step will be handled as an inactive step and will not be clickable. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "If set to `true`, this step will be handled the same as `inactive` as well as getting a disabled mouseover and `aria-disabled=\"true`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Is used to set the status text.",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    },
    "statusState": {
      "doc": "In case the status state should be `information` or `error`. Defaults to `warning`.",
      "type": ["\"warning\"", "\"information\"", "\"error\""],
      "status": "optional"
    }
  }
}
```

## Step Items example

```js
const steps = [
  { title: 'Active' },
  { title: 'Active and marked as current', isCurrent: true },
  { title: 'Not active', inactive: true },
  { title: 'Disabled', disabled: true },
  {
    title: 'Active item with status text',
    status: 'Status text',
    statusState: 'warning', // defaults to warning
  },
]
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "StepIndicator.overviewTitle": {
      "nb-NO": "Stegoversikt",
      "en-GB": "Steps Overview",
      "sv-SE": "Stegöversikt",
      "da-DK": "Trinoverblik"
    },
    "StepIndicator.stepTitle": {
      "nb-NO": "Steg %step av %count:",
      "en-GB": "Step %step of %count:",
      "sv-SE": "Steg %step av %count:",
      "da-DK": "Trin %step af %count:"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onClick": {
      "doc": "Will be called when the user clicks on any clickable step in the list. Is called right before `onChange`. Receives parameter `{ event, item, currentStep }`.",
      "type": "function",
      "status": "optional"
    },
    "onChange": {
      "doc": "Will be called when the user changes step by clicking in the steps list (changing the `currentStep` property does not trigger the event). Receives parameter `{ event, item, currentStep }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

## Step Item Events

```json
{
  "props": {
    "onClick": {
      "doc": "Called when user clicks the step. Is called right before the main component's `onClick`. Receives parameter `{ event, item, currentStep }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
