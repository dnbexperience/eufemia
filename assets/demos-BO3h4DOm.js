import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Default:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{noInline:!0,children:`const Step = ({ title }) => {
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
`});function s(e){let t={h2:`h2`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.Default`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};