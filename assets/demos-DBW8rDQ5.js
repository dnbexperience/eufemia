import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({BasicUsage:()=>o,MultiThumb:()=>l,PathValues:()=>u,SyncWithInput:()=>c,WithHelp:()=>d,WithStepper:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    myValue: 50,
  }}
>
  <Field.Slider label="Slider" path="/myValue" />
</Form.Handler>
`}),s=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    myValue: 50,
  }}
>
  <Flex.Stack>
    <Field.Currency
      label="Stepper"
      path="/myValue"
      width="medium"
      decimalLimit={0}
      showStepControls
    />
    <Field.Slider label="Slider" path="/myValue" width="large" />
  </Flex.Stack>
</Form.Handler>
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    firstValue: 10,
    secondValue: 60,
  }}
>
  <Flex.Stack>
    <Field.Composition width="large">
      <Field.Currency
        label="First value"
        path="/firstValue"
        decimalLimit={0}
      />
      <Field.Currency
        label="Second value"
        path="/secondValue"
        decimalLimit={0}
      />
    </Field.Composition>

    <Field.Composition width="large">
      <Field.Slider label="First slider" path="/firstValue" />
      <Field.Slider label="Second slider" path="/secondValue" />
    </Field.Composition>
  </Flex.Stack>
</Form.Handler>
`}),l=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    firstValue: 10,
    secondValue: 60,
  }}
>
  <Flex.Stack>
    <Field.Composition width="large">
      <Field.Currency
        label="First value"
        path="/firstValue"
        decimalLimit={0}
      />
      <Field.Currency
        label="Second value"
        path="/secondValue"
        decimalLimit={0}
      />
    </Field.Composition>

    <Field.Slider
      label="My slider"
      paths={['/firstValue', '/secondValue']}
      multiThumbBehavior="push"
      width="large"
    />
  </Flex.Stack>
</Form.Handler>
`}),u=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    currentValue: 1000,
    min: 0,
    max: 10000,
    step: 10,
  }}
>
  <Flex.Stack>
    <Flex.Horizontal align="center">
      <P>
        Max value (
        <Value.Currency path="/max" decimals={0} inline />)
      </P>

      <HelpButton>Help text</HelpButton>

      <Field.Currency
        path="/currentValue"
        width="stretch"
        decimalLimit={0}
      />
    </Flex.Horizontal>

    <Field.Slider
      path="/currentValue"
      min="/min"
      max="/max"
      step="/step"
    />
  </Flex.Stack>
</Form.Handler>
`}),d=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    myValue: 50,
  }}
>
  <Field.Slider
    label="Slider"
    help={{
      title: 'Help is available',
      content:
        'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
    }}
    path="/myValue"
  />
</Form.Handler>
`});function f(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||m(`Examples`,!1),o||m(`Examples.BasicUsage`,!0),l||m(`Examples.MultiThumb`,!0),u||m(`Examples.PathValues`,!0),c||m(`Examples.SyncWithInput`,!0),d||m(`Examples.WithHelp`,!0),s||m(`Examples.WithStepper`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Multi thumb`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Sync with input`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`With stepper`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Path usage for min, max and step`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};