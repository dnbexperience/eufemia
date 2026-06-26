import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{m as r,w as i}from"./forms-CFi5-4x5.js";import{t as a}from"./P-CtWu9WHu.js";import{t as o}from"./Card-Db-Q1D3Y.js";import{U as s}from"./index-kfZVC31v.js";import{t as c}from"./ComponentBox-qLaLt9T0.js";var l=e({Default:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:r,Form:i,Card:o,P:a},noInline:!0,children:`const Step = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(
  <Form.Handler>
    <Wizard.Container mode="loose">
      <Step title="Step 1" />
      <Step title="Step 2" />
      <Step title="Step 3" />
    </Wizard.Container>
  </Form.Handler>
)
`});function f(e){let t={h2:`h2`,...s(),...e.components};return l||m(`Examples`,!1),d||m(`Examples.Default`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};