---
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.517Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

## Deprecated Visual Tests – can be removed in v11

### StepIndicator in loose mode

Every step can be clicked.

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-loose" />` somewhere in your layout.

```tsx
const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <StepIndicator.Sidebar sidebar_id="unique-id-loose" />

      <Space stretch>
        <StepIndicator
          sidebar_id="unique-id-loose"
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

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-strict" />` somewhere in your layout.

```tsx
<StepIndicator.Sidebar sidebar_id="unique-id-strict" />
<StepIndicator
  sidebar_id="unique-id-strict"
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
/>
```

### StepIndicator in static mode

None of the steps are clickable.

You want to place `<StepIndicator.Sidebar sidebar_id="unique-id-static" />` somewhere in your layout.

```tsx
render(
  <StepIndicator
    sidebar_id="unique-id-static"
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
  />
)
```

### StepIndicator with sidebar

```tsx
<StepIndicator
  style={{
    display: 'none',
  }}
  sidebar_id="unique-id-sidebar"
  mode="loose"
  data={[
    {
      title: 'Om din nye bolig',
    },
    {
      title: 'Ditt lån og egenkapital',
    },
    {
      title: 'Oppsummering',
      is_current: true,
    },
  ]}
/>
<StepIndicator.Sidebar sidebar_id="unique-id-sidebar" top="large" />
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
        sidebar_id="step-indicator-router"
        mode="loose"
        current_step={currentStep - 1}
        on_change={({ current_step }) => {
          const step = current_step + 1
          setCurrentStep(step)
          history.push(`?${step}`)
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
        space
      />
      <StepIndicator.Sidebar sidebar_id="step-indicator-router" space />
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
        sidebar_id="unique-id-customized"
        mode="loose"
        data={data}
        current_step={step}
        on_change={({ current_step }) => setStep(current_step)}
        {...props}
      />
      <Section style_type="lavender" spacing>
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
  </CustomStepIndicator>
)
```

### StepIndicator with text only

```tsx
render(
  <StepIndicator
    sidebar_id="unique-id-text"
    mode="static"
    current_step={1}
    data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
  />
)
```

### StepIndicator with a custom renderer.

```tsx
render(
  <StepIndicator
    sidebar_id="unique-id-renderer"
    mode="strict"
    current_step={1}
    on_change={({ current_step }) => {
      console.log('on_change', current_step)
    }}
    on_item_render={({ StepItem }) => {
      return <StepItem onClick={(e) => console.log(e)} />
    }}
    data={[
      {
        title: 'Om din nye bolig',
      },
      {
        title: 'Ditt lån og egenkapital',
        on_click: ({ current_step }) => console.log(current_step),
        on_render: ({ StepItem }) => (
          <StepItem onClick={(e) => console.log(e)} />
        ),
      },
      {
        title: 'Oppsummering',
        /**
         * We can also overwrite the states
         * inactive: true
         * is_current: true
         */
      },
    ]}
  />
)
```

```tsx
<StepIndicator.Sidebar sidebar_id="unique-id-statuses" />
<StepIndicator
  sidebar_id="unique-id-statuses"
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
/>
```

## Properties

```json
{
  "mode": {
    "doc": "Defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.",
    "type": ["'static'", "'strict'", "'loose'"],
    "status": "required"
  },
  "data": {
    "doc": "Defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See below for properties of `STEP_DATA`.",
    "type": ["[Step Item](#step-item-properties)[]", "string[]"],
    "status": "required"
  },
  "current_step": {
    "doc": "Defines the initial step starting from 0. Also defines the furthest step visited when `mode=\"strict\"`. Will update to the new step if changed (but will not trigger the `on_change` event). Defaults to `0`.",
    "type": "number",
    "status": "optional"
  },
  "overview_title": {
    "doc": "The title shown inside the `<StepIndicatorModal />` supplemental screen reader text for the `<StepIndicatorTriggerButton />`. Defaults to `Steps Overview`.",
    "type": "string",
    "status": "optional"
  },
  "step_title": {
    "doc": "Label for `<StepIndicatorTriggerButton />` and screen reader text for `<StepIndicatorItem />`. Must contain `%step` and `%count` to interpolate `current_step` and `stepCount` into the text. Defaults to `Step %step of %count`.",
    "type": "string",
    "status": "optional"
  },
  "hide_numbers": {
    "doc": "Define whether to show automatically counted numbers or not. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "no_animation": {
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
  "status_state": {
    "doc": "The type of status shown when the `status` prop is set. Defaults to `warn`.",
    "type": "['warn', 'info', 'error']",
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
  },
  "sidebar_id": {
    "doc": "A unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.",
    "type": "string",
    "status": "deprecated"
  },
  "step_title_extended": {
    "doc": "Descriptive label for `<StepIndicatorModal />`. Must contain `%step` and `%count` to interpolate `current_step` and `stepCount` into the text. Defaults to `You are on step %step of %count`.",
    "type": "string",
    "status": "deprecated"
  },
  "on_item_render": {
    "doc": "Deprecated, just use step item `title`. Callback function whose return is rendered inside each step instead of the default render. Has to return a React Node. Receives parameter `{ StepItem, element, attributes, props, context }`, where `props` also includes all props from the step object (like `title` or `status`) and the `<StepItem>` is a component that can be used to wrap your returned content.",
    "type": "function",
    "status": "deprecated"
  }
}
```

## Step Item Properties

```json
{
  "title": {
    "doc": "The title of the step.",
    "type": ["string", "React.ReactNode"],
    "status": "required"
  },
  "is_current": {
    "doc": "If set to `true`, this item step will be set as the current selected step. This can be used instead of `current_step` on the main component.",
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
  "status_state": {
    "doc": "In case the status state should be `info` or `error`. Defaults to `warn`.",
    "type": ["'warn'", "'info'", "'error'"],
    "status": "optional"
  },
  "on_render": {
    "doc": "Deprecated, just use `title`. Callback function whose return is rendered inside the step instead of the default render (or `on_item_render`). Has to return a React Node. <br/> Receives parameter `{ StepItem, element, attributes, props, context }`, where `props` also includes all props in the step object (like `title` or `status`) and the `<StepItem>` is a component that can be used to wrap your returned content.",
    "type": "function",
    "status": "deprecated"
  }
}
```

## Step Items example

```js
const steps = [
  { title: 'Active' },
  { title: 'Active and marked as current', is_current: true },
  { title: 'Not active', inactive: true },
  { title: 'Disabled', disabled: true },
  {
    title: 'Active item with status text',
    status: 'Status text',
    status_state: 'warn', // defaults to warning
  },
]
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "StepIndicator.overview_title": {
      "nb-NO": "Stegoversikt",
      "en-GB": "Steps Overview",
      "sv-SE": "Stegöversikt",
      "da-DK": "Trinoverblik"
    },
    "StepIndicator.step_title": {
      "nb-NO": "Steg %step av %count:",
      "en-GB": "Step %step of %count:",
      "sv-SE": "Steg %step av %count",
      "da-DK": "Trin %step af %count:"
    }
  }
}
```

## Events

```json
{
  "on_click": {
    "doc": "Will be called when the user clicks on any clickable step in the list. Is called right before `on_change`. Receives parameter `{ event, item, current_step, currentStep }`.",
    "type": "function",
    "status": "optional"
  },
  "on_change": {
    "doc": "Will be called when the user changes step by clicking in the steps list (changing the `current_step` prop does not trigger the event). Receives parameter `{ event, item, current_step, currentStep }`.",
    "type": "function",
    "status": "optional"
  }
}
```

## Step Item Events

```json
{
  "on_click": {
    "doc": "Called when user clicks the step. Is called right before the main component's `on_click`. Receives parameter `{ event, item, current_step, currentStep }`",
    "type": "function",
    "status": "optional"
  }
}
```
