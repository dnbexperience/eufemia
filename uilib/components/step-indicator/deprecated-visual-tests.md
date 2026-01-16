---
metadata: https://eufemia.dnb.no/uilib/components/step-indicator/deprecated-visual-tests/metadata.json
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
  />,
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
  </CustomStepIndicator>,
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
  />,
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
  />,
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
