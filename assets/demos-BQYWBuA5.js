import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./chunk-QUQL4437-CBr5Whxv.js";import{m as i,w as a}from"./forms-D54jfDKN.js";import{n as o}from"./portal-query-Yc_7AipW.js";import{t as s}from"./P-CVKBz4XO.js";import{t as c}from"./Card-BvVSLAbs.js";import{U as l}from"./index-BsJ3GLEw.js";import{t as u}from"./ComponentBox-sLMgHvLi.js";var d=e({Default:()=>p,ReachRouter:()=>m}),f=t(n()),p=()=>(0,f.jsx)(u,{stableName:`Default`,sourceImports:[`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:i,Form:a,Card:c,P:s},noInline:!0,children:`const Component = () => {
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
`}),m=()=>(0,f.jsx)(u,{scope:{useLocation:r,navigate:o},stableName:`ReachRouter`,sourceImports:[`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:i,Form:a,Card:c,P:s},noInline:!0,children:`const Component = () => {
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