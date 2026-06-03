import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-DtVKLSL-.js";import{t as i}from"./Card-C6UABezd.js";import{t as a}from"./Form-C16rVaXm.js";import{n as o}from"./Wizard-DMAIqrxA.js";import{W as s}from"./index-BCXtuv-b.js";import{t as c}from"./ComponentBox-B2X8809Z.js";var l=e({Default:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:o,Form:a,Card:i,P:r},noInline:!0,children:`const Step = ({ title }) => {
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