import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{i as n}from"./view_medium-Rb0zFYFk.js";import{t as r}from"./ComponentBox-DPdYTeDv.js";import{Lr as i}from"./index--zEB_f_m.js";var a=e({Default:()=>s,WithLayout:()=>c}),o=t(),s=()=>(0,o.jsx)(r,{children:`<Form.ButtonRow>
  <Wizard.Buttons />
  <Button variant="secondary">Other button</Button>
</Form.ButtonRow>
`}),c=()=>(0,o.jsx)(r,{scope:{sendIcon:n},children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email />
    <Form.ButtonRow>
      <Form.SubmitButton icon={sendIcon} />
      <Button variant="secondary">Cancel</Button>
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.Default`,!0),c||d(`Examples.WithLayout`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Without any surrounding layout`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`In combination with a Layout`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};