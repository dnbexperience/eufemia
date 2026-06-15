import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./chunk-QUQL4437-CBr5Whxv.js";import{n as i}from"./portal-query-BYW5RIMA.js";import{t as a}from"./P-C9wBv35m.js";import{t as o}from"./Card-ChPhpBPz.js";import{t as s}from"./Form-JTiJXf2d.js";import{n as c}from"./Wizard-CUdMs3bu.js";import{K as l}from"./index-ppRu2ktv.js";import{t as u}from"./ComponentBox-R2c6Bo76.js";var d=e({Default:()=>p,ReachRouter:()=>m}),f=t(n()),p=()=>(0,f.jsx)(u,{stableName:`Default`,sourceImports:[`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:c,Form:s,Card:o,P:a},noInline:!0,children:`const Component = () => {
  Wizard.useQueryLocator('unique-id')
  return (
    <Form.Handler>
      <Wizard.Container id="unique-id">
        <MyStep title="Step 1" />
        <MyStep title="Step 2" />
        <MyStep title="Step 3" />
      </Wizard.Container>
    </Form.Handler>
  )
}
const MyStep = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(<Component />)
`}),m=()=>(0,f.jsx)(u,{scope:{useLocation:r,navigate:i},stableName:`ReachRouter`,sourceImports:[`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:c,Form:s,Card:o,P:a},noInline:!0,children:`const Component = () => {
  Wizard.useReachRouter('wizard-with-router', {
    useLocation,
    navigate,
  })
  return (
    <Form.Handler>
      <Wizard.Container id="wizard-with-router">
        <MyStep title="Step 1" />
        <MyStep title="Step 2" />
        <MyStep title="Step 3" />
      </Wizard.Container>
    </Form.Handler>
  )
}
const MyStep = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(<Component />)
`});function h(e){let t={h2:`h2`,...l(),...e.components};return d||_(`Examples`,!1),p||_(`Examples.Default`,!0),m||_(`Examples.ReachRouter`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h2,{children:`Reach router`}),`
`,(0,f.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};