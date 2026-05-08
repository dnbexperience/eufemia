import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n}from"./index-2AO2Cu5K.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-static`,children:`<StepIndicator
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
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-strict`,children:`<StepIndicator
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
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-loose`,noInline:!0,children:`const InteractiveDemo = () => {
  const [step, setStep] = useState(1)
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
`}),s=()=>(0,r.jsx)(t,{noInline:!0,children:`function CustomStepIndicator({ children, data, ...props }) {
  const [step, setStep] = useState(0)
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
      <Section variant="information" innerSpace>
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
`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-expanded`,children:`<StepIndicator
  expandedInitially
  mode="static"
  currentStep={1}
  data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
/>
`}),l=()=>(0,r.jsx)(t,{noInline:!0,children:`const StepIndicatorWithRouter = () => {
  const [currentStep, setCurrentStep] = useState(1)
  useEffect(() => {
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
`}),u=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-statuses`,children:`<StepIndicator
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
`}),d=()=>(0,r.jsx)(t,{"data-visual-test":`step-indicator-skeleton`,children:`<StepIndicator
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
`});function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components},{VisibleWhenVisualTest:f}=t;return f||m(`VisibleWhenVisualTest`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator in loose mode`}),`
`,(0,r.jsx)(t.p,{children:`Every step can be clicked.`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator in strict mode`}),`
`,(0,r.jsx)(t.p,{children:`Every visited step can be clicked, including the current step.`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator in static mode`}),`
`,(0,r.jsx)(t.p,{children:`None of the steps are clickable.`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator with a router`}),`
`,(0,r.jsx)(l,{}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator customized`}),`
`,(0,r.jsx)(t.p,{children:`Completely customized step indicator.`}),`
`,(0,r.jsx)(s,{}),`
`,(0,r.jsx)(t.h3,{children:`StepIndicator with text only`}),`
`,(0,r.jsxs)(t.p,{children:[`This example also demonstrates the `,(0,r.jsx)(t.code,{children:`expandedInitially`}),` property.`]}),`
`,(0,r.jsx)(c,{}),`
`,(0,r.jsx)(t.h3,{children:`With skeleton`}),`
`,(0,r.jsx)(d,{}),`
`,(0,r.jsx)(f,{children:(0,r.jsx)(u,{})})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};