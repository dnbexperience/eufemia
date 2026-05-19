import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{d as i,za as a,zr as o}from"./index-DqqByKA2.js";var s=t({Default:()=>l,ReachRouter:()=>u}),c=e(n()),l=()=>(0,c.jsx)(r,{stableName:`Default`,noInline:!0,children:`const Component = () => {
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
`}),u=()=>(0,c.jsx)(r,{scope:{useLocation:a,navigate:i},stableName:`ReachRouter`,noInline:!0,children:`const Component = () => {
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
`});function d(e){let t={h2:`h2`,...o(),...e.components};return s||p(`Examples`,!1),l||p(`Examples.Default`,!0),u||p(`Examples.ReachRouter`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h2,{children:`Reach router`}),`
`,(0,c.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};