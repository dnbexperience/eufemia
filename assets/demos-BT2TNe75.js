import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{La as r,Rr as i,xr as a}from"./index-CMgyXmp3.js";var o=e({Default:()=>c,ReachRouter:()=>l}),s=t(),c=()=>(0,s.jsx)(n,{noInline:!0,children:`const Component = () => {
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
`}),l=()=>(0,s.jsx)(n,{scope:{useLocation:r,navigate:a},noInline:!0,children:`const Component = () => {
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
`});function u(e){let t={h2:`h2`,...i(),...e.components};return o||f(`Examples`,!1),c||f(`Examples.Default`,!0),l||f(`Examples.ReachRouter`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h2,{children:`Reach router`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};