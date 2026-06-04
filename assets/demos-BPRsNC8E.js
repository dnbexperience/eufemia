import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Space-DaXjLjpB2.js";import{t as r}from"./Button-CMFzxkr4.js";import{t as i}from"./Section-BidpVCcL.js";import{t as a}from"./StepIndicator-JX-_AzTa.js";import{W as o}from"./index-D7e1avVt.js";import{t as s}from"./ComponentBox-CE7bpcJy.js";var c=e(t()),l=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-static`,stableName:`StepIndicatorStatic`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},children:`<StepIndicator
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
`}),u=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-strict`,stableName:`StepIndicatorStrict`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},children:`<StepIndicator
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
`}),d=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-loose`,stableName:`StepIndicatorLoose`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{Space:n,StepIndicator:a,Button:r},noInline:!0,children:`const InteractiveDemo = () => {
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
`}),f=()=>(0,c.jsx)(s,{stableName:`StepIndicatorCustomized`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a,Section:i},noInline:!0,children:`function CustomStepIndicator({ children, data, ...props }) {
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
`}),p=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-expanded`,stableName:`StepIndicatorTextOnly`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},children:`<StepIndicator
  expandedInitially
  mode="static"
  currentStep={1}
  data={['Om din nye bolig', 'Ditt lån og egenkapital', 'Oppsummering']}
/>
`}),m=()=>(0,c.jsx)(s,{stableName:`StepIndicatorRouter`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},noInline:!0,children:`const StepIndicatorWithRouter = () => {
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
`}),h=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-statuses`,stableName:`StepIndicatorStatuses`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},children:`<StepIndicator
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
`}),g=()=>(0,c.jsx)(s,{"data-visual-test":`step-indicator-skeleton`,stableName:`StepIndicatorSkeleton`,sourceImports:[`import { useEffect, useState } from 'react'`,`import { StepIndicator, Space, Button, Section } from '@dnb/eufemia'`],__buildScope:{StepIndicator:a},children:`<StepIndicator
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
`});function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return n||y(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator in loose mode`}),`
`,(0,c.jsx)(t.p,{children:`Every step can be clicked.`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator in strict mode`}),`
`,(0,c.jsx)(t.p,{children:`Every visited step can be clicked, including the current step.`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator in static mode`}),`
`,(0,c.jsx)(t.p,{children:`None of the steps are clickable.`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator with a router`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator customized`}),`
`,(0,c.jsx)(t.p,{children:`Completely customized step indicator.`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`StepIndicator with text only`}),`
`,(0,c.jsxs)(t.p,{children:[`This example also demonstrates the `,(0,c.jsx)(t.code,{children:`expandedInitially`}),` property.`]}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`With skeleton`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(n,{children:(0,c.jsx)(h,{})})]})}function v(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};