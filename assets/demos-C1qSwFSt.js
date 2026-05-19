import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{i as r}from"./view_medium-BGCKigyJ.js";import{t as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({Default:()=>c,WithLayout:()=>l}),s=e(n()),c=()=>(0,s.jsx)(i,{stableName:`Default`,children:`<Form.ButtonRow>
  <Wizard.Buttons />
  <Button variant="secondary">Other button</Button>
</Form.ButtonRow>
`}),l=()=>(0,s.jsx)(i,{scope:{sendIcon:r},stableName:`WithLayout`,children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email />
    <Form.ButtonRow>
      <Form.SubmitButton icon={sendIcon} />
      <Button variant="secondary">Cancel</Button>
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`});function u(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return o||f(`Examples`,!1),c||f(`Examples.Default`,!0),l||f(`Examples.WithLayout`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Without any surrounding layout`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`In combination with a Layout`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};