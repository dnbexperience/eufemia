import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-M3YCnXL2.js";import{t as i}from"./Form-CCz-rEVh.js";import{n as a}from"./Wizard-dsPde2Nx.js";import{In as o,Rr as s}from"./index-mmuoVhax.js";import{t as c}from"./ComponentBox-XDAvsf_r.js";var l=t({Default:()=>d}),u=e(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:a,Form:i,Card:r,P:o},noInline:!0,children:`const Step = ({ title }) => {
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