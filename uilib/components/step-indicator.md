---
title: 'StepIndicator'
description: "The StepIndicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions."
metadata: https://eufemia.dnb.no/uilib/components/step-indicator/metadata.json
---

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

The current active step is set with the `current_step` property or within the data with the `is_current` object property.

**NB:** Whenever possible, ensure you bind the `current_step` to the browser's path location. See the [example below](/uilib/components/step-indicator/#stepindicator-with-a-router) or [the example on CodeSandbox](https://codesandbox.io/s/eufemia-step-indicator-with-reach-router-mhu0bh?file=/src/App.tsx).

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

More details about modifying steps in the [properties panel](/uilib/components/step-indicator/properties#steps-parameters).

## Redesign in version 10.72.0

The StepIndicator has been majorly redesigned. In general, it should still work with the same code. However, any customization to the style or selection of elements could cause issues.

- The sidebar has been removed. The component still exists to avoid breaking changes, but it will now only add an invisible div.
- Removing the sidebar means the list of steps is not visible initially. Since this was always the case on small screens, this should not cause many issues.
- The new property `expandedInitially` allows you to start with the list of steps visible.
- Custom rendering of steps using the `on_item_render` and `on_render` properties will no longer do anything of value; it will be the same as using the item's `title` property.
- The `sidebar_id` property no longer adds anything as we no longer have a sidebar. However, if you need an ID for other purposes, use the `id` property.

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
          current_step={step}
          on_change={({ current_step }) => {
            setStep(current_step)
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
          on_click={() => {
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
    current_step={1}
    on_change={({ current_step }) => {
      console.log('on_change', current_step)
    }}
    data={[
      {
        title: 'Velg mottaker',
      },
      {
        title: 'Bestill eller erstatt',
        on_click: ({ current_step }) =>
          console.log('current_step:', current_step),
        status:
          'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
      },
      {
        title: 'Oppsummering',
      },
    ]}
  />,
)
```

### StepIndicator in static mode

None of the steps are clickable.

```tsx
render(
  <StepIndicator
    mode="static"
    current_step={1}
    on_change={({ current_step }) => {
      console.log('on_change', current_step)
    }}
    data={[
      {
        title: 'Om din nye bolig',
      },
      {
        title: 'Ditt lån og egenkapital',
        on_click: ({ current_step }) => console.log(current_step),
      },
      {
        title: 'Oppsummering',
      },
    ]}
  />,
)
```

### StepIndicator with a router

```tsx
const StepIndicatorWithRouter = () => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [history, setInstance] = React.useState(null)
  React.useEffect(() => {
    const history = createBrowserHistory()
    const step =
      parseFloat(history.location.search?.replace(/[?]/, '')) || 1
    setCurrentStep(step)
    setInstance(history)
  }, [])
  return (
    <>
      <StepIndicator
        mode="loose"
        current_step={currentStep - 1}
        on_change={({ current_step }) => {
          const step = current_step + 1
          setCurrentStep(step)
          history.push('?' + step)
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
        current_step={step}
        on_change={({ current_step }) => setStep(current_step)}
        bottom
        {...props}
      />
      <Section variant="lavender" innerSpace>
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
        is_current: true,
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
  </CustomStepIndicator>,
)
```

### StepIndicator with text only

This example also demonstrates the `expandedInitially` property.

```tsx
render(
  <StepIndicator
    expandedInitially
    mode="static"
    current_step={1}
    data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
  />,
)
```

### With skeleton

```tsx
render(
  <StepIndicator
    mode="static"
    skeleton
    current_step={1}
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
  />,
)
```

```tsx
render(
  <StepIndicator
    mode="loose"
    current_step={0}
    data={[
      {
        title: 'Current',
      },
      {
        title: 'Warning',
        status: 'Status message',
        status_state: 'warn',
      },
      {
        title: 'Error',
        status: 'Status message',
        status_state: 'error',
      },
      {
        title: 'Info',
        status: 'Status message',
        status_state: 'info',
      },
    ]}
  />,
)
```
