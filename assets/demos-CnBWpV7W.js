import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BasicUsage:()=>s,MultiThumb:()=>u,PathValues:()=>d,SyncWithInput:()=>l,WithHelp:()=>f,WithStepper:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`BasicUsage`,children:`<Form.Handler
  defaultData={{
    myValue: 50,
  }}
>
  <Field.Slider label="Slider" path="/myValue" />
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{stableName:`WithStepper`,children:`<Form.Handler
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
`}),l=()=>(0,o.jsx)(r,{stableName:`SyncWithInput`,children:`<Form.Handler
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
`}),u=()=>(0,o.jsx)(r,{stableName:`MultiThumb`,children:`<Form.Handler
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
`}),d=()=>(0,o.jsx)(r,{stableName:`PathValues`,children:`<Form.Handler
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
`}),f=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Form.Handler
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
`});function p(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||h(`Examples`,!1),s||h(`Examples.BasicUsage`,!0),u||h(`Examples.MultiThumb`,!0),d||h(`Examples.PathValues`,!0),l||h(`Examples.SyncWithInput`,!0),f||h(`Examples.WithHelp`,!0),c||h(`Examples.WithStepper`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Multi thumb`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Sync with input`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With stepper`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Path usage for min, max and step`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};