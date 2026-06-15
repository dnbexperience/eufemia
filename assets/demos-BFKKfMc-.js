import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./send-DNpElw5G.js";import{t as i}from"./Button-DwQUlfj-.js";import{t as a}from"./Card-ChPhpBPz.js";import{t as o}from"./Form-JTiJXf2d.js";import{t as s}from"./Field-DqRpWyNm.js";import{n as c}from"./Wizard-CUdMs3bu.js";import{K as l}from"./index-ppRu2ktv.js";import{t as u}from"./ComponentBox-R2c6Bo76.js";var d=e({Default:()=>p,WithLayout:()=>m}),f=t(n()),p=()=>(0,f.jsx)(u,{stableName:`Default`,sourceImports:[`import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`,`import { send as sendIcon } from '@dnb/eufemia/icons'`],__buildScope:{Form:o,Wizard:c,Button:i},children:`<Form.ButtonRow>
  <Wizard.Buttons />
  <Button variant="secondary">Other button</Button>
</Form.ButtonRow>
`}),m=()=>(0,f.jsx)(u,{scope:{sendIcon:r},stableName:`WithLayout`,sourceImports:[`import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`,`import { send as sendIcon } from '@dnb/eufemia/icons'`],__buildScope:{Form:o,Card:a,Field:s,Button:i},children:`<Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email />
    <Form.ButtonRow>
      <Form.SubmitButton icon={sendIcon} />
      <Button variant="secondary">Cancel</Button>
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`});function h(e){let t={h2:`h2`,h3:`h3`,...l(),...e.components};return d||_(`Examples`,!1),p||_(`Examples.Default`,!0),m||_(`Examples.WithLayout`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Without any surrounding layout`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`In combination with a Layout`}),`
`,(0,f.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};