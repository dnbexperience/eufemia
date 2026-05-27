import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./send-DgiP0ml9.js";import{t as i}from"./Card-2G-TKpj3.js";import{t as a}from"./Form-PES0Uozy.js";import{t as o}from"./Field-DrUGn0oz.js";import{n as s}from"./Wizard-DlovE-XE.js";import{Rr as c,wr as l}from"./index-BIrFyEEc.js";import{t as u}from"./ComponentBox-DFVIRw0w.js";var d=t({Default:()=>p,WithLayout:()=>m}),f=e(n()),p=()=>(0,f.jsx)(u,{stableName:`Default`,sourceImports:[`import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`,`import { send as sendIcon } from '@dnb/eufemia/icons'`],__buildScope:{Form:a,Wizard:s,Button:l},children:`<Form.ButtonRow>
  <Wizard.Buttons />
  <Button variant="secondary">Other button</Button>
</Form.ButtonRow>
`}),m=()=>(0,f.jsx)(u,{scope:{sendIcon:r},stableName:`WithLayout`,sourceImports:[`import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`,`import { send as sendIcon } from '@dnb/eufemia/icons'`],__buildScope:{Form:a,Card:i,Field:o,Button:l},children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email />
    <Form.ButtonRow>
      <Form.SubmitButton icon={sendIcon} />
      <Button variant="secondary">Cancel</Button>
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`});function h(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return d||_(`Examples`,!1),p||_(`Examples.Default`,!0),m||_(`Examples.WithLayout`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Without any surrounding layout`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`In combination with a Layout`}),`
`,(0,f.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};