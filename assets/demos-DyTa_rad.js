import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";e();var i=t(),a=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-static`,children:`<StepIndicator
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
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-strict`,children:`<StepIndicator
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
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-loose`,noInline:!0,children:`const InteractiveDemo = () => {
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
`}),c=()=>(0,i.jsx)(n,{noInline:!0,children:`function CustomStepIndicator({ children, data, ...props }) {
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
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-expanded`,children:`<StepIndicator
  expandedInitially
  mode="static"
  currentStep={1}
  data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
/>
`}),u=()=>(0,i.jsx)(n,{noInline:!0,children:`const StepIndicatorWithRouter = () => {
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
`}),d=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-statuses`,children:`<StepIndicator
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
`}),f=()=>(0,i.jsx)(n,{"data-visual-test":`step-indicator-skeleton`,children:`<StepIndicator
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
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||h(`VisibleWhenVisualTest`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator in loose mode`}),`
`,(0,i.jsx)(t.p,{children:`Every step can be clicked.`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator in strict mode`}),`
`,(0,i.jsx)(t.p,{children:`Every visited step can be clicked, including the current step.`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator in static mode`}),`
`,(0,i.jsx)(t.p,{children:`None of the steps are clickable.`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator with a router`}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator customized`}),`
`,(0,i.jsx)(t.p,{children:`Completely customized step indicator.`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`StepIndicator with text only`}),`
`,(0,i.jsxs)(t.p,{children:[`This example also demonstrates the `,(0,i.jsx)(t.code,{children:`expandedInitially`}),` property.`]}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h3,{children:`With skeleton`}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsx)(n,{children:(0,i.jsx)(d,{})})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};