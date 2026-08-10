import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{m as r,w as i}from"./forms-QYD2kahG.js";import{t as a}from"./P-CfFm60MO.js";import{t as o}from"./Card-DXi3If40.js";import{U as s}from"./index-D1L5wabr.js";import{t as c}from"./ComponentBox-B6YSImfw.js";var l=e({Default:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:r,Form:i,Card:o,P:a},noInline:!0,children:`const Step = ({ title }) => {
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