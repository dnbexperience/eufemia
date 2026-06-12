import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-D0SeNBSG.js";import{t as i}from"./HelpButton-B8IG5rB3.js";import{c as a}from"./ToggleButton-T4E3Coih.js";import{t as o}from"./Slider-DcXU9hC-.js";import{t as s}from"./Form-B9l6EvGx.js";import{t as c}from"./Field-DHicZJEj.js";import{t as l}from"./Value-whMgauSk.js";import{K as u}from"./index-CsG353ar.js";import{t as d}from"./ComponentBox-Cb1rLw_D.js";var f=e({BasicUsage:()=>m,MultiThumb:()=>_,PathValues:()=>v,SyncWithInput:()=>g,WithHelp:()=>y,WithStepper:()=>h}),p=t(n()),m=()=>(0,p.jsx)(d,{stableName:`BasicUsage`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:c,Slider:o},children:`<Form.Handler
  defaultData={{
    myValue: 50,
  }}
>
  <Field.Slider label="Slider" path="/myValue" />
</Form.Handler>
`}),h=()=>(0,p.jsx)(d,{stableName:`WithStepper`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c,Slider:o},children:`<Form.Handler
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
`}),g=()=>(0,p.jsx)(d,{stableName:`SyncWithInput`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c,Slider:o},children:`<Form.Handler
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
`}),_=()=>(0,p.jsx)(d,{stableName:`MultiThumb`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c,Slider:o},children:`<Form.Handler
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
`}),v=()=>(0,p.jsx)(d,{stableName:`PathValues`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,P:r,Value:l,HelpButton:i,Field:c,Slider:o},children:`<Form.Handler
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
`}),y=()=>(0,p.jsx)(d,{stableName:`WithHelp`,sourceImports:[`import { Flex, HelpButton, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:c,Slider:o},children:`<Form.Handler
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
`});function b(e){let t={h2:`h2`,h3:`h3`,...u(),...e.components};return f||S(`Examples`,!1),m||S(`Examples.BasicUsage`,!0),_||S(`Examples.MultiThumb`,!0),v||S(`Examples.PathValues`,!0),g||S(`Examples.SyncWithInput`,!0),y||S(`Examples.WithHelp`,!0),h||S(`Examples.WithStepper`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`Multi thumb`}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsx)(t.h3,{children:`Sync with input`}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h3,{children:`With stepper`}),`
`,(0,p.jsx)(h,{}),`
`,(0,p.jsx)(t.h3,{children:`Path usage for min, max and step`}),`
`,(0,p.jsx)(v,{}),`
`,(0,p.jsx)(t.h3,{children:`With help`}),`
`,(0,p.jsx)(y,{})]})}function x(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};