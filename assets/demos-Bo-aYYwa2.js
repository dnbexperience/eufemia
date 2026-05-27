import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-CuOH-QN0.js";import{t as i}from"./Form-KS-x6we6.js";import{t as a}from"./Field-bFo7XjQz.js";import{n as o}from"./Wizard-BBQHnToo.js";import{Rr as s,wr as c}from"./index-Da-r8F54.js";import{t as l}from"./ComponentBox-DXeEXSK2.js";import{s as u}from"./Examples-D_wAbFQk.js";var d=t({ErrorMessage:()=>m,SuccessMessage:()=>h,WithAWizard:()=>g}),f=e(n()),p=u(),m=()=>(0,f.jsx)(l,{scope:{request:p},stableName:`ErrorMessage`,sourceImports:[`import { createRequest } from '../SubmitIndicator/Examples'`,`import { Field, Form, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`],__buildScope:{Form:i,Card:r,Field:a,Button:c},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000) // Simulate a request

      Form.InfoOverlay.setContent(myFormId, 'error')
    }}
  >
    <Form.InfoOverlay>
      <Form.Card>
        <Field.Email />
        <Form.ButtonRow>
          <Form.SubmitButton variant="send" />
          <Button
            variant="secondary"
            onClick={() => {
              Form.InfoOverlay.setContent(myFormId, 'error')
            }}
          >
            Show error
          </Button>
        </Form.ButtonRow>
      </Form.Card>
    </Form.InfoOverlay>
  </Form.Handler>
)
`}),h=()=>(0,f.jsx)(l,{scope:{request:p},stableName:`SuccessMessage`,sourceImports:[`import { createRequest } from '../SubmitIndicator/Examples'`,`import { Field, Form, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`],__buildScope:{Form:i,Card:r,Field:a},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000) // Simulate a request

      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>
      <Form.Card>
        <Field.Email />
        <Form.SubmitButton variant="send" />
      </Form.Card>
    </Form.InfoOverlay>
  </Form.Handler>
)
`}),g=()=>(0,f.jsx)(l,{scope:{request:u()},stableName:`WithAWizard`,sourceImports:[`import { createRequest } from '../SubmitIndicator/Examples'`,`import { Field, Form, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { Button } from '@dnb/eufemia'`],__buildScope:{Form:i,Wizard:o,Card:r,Field:a},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null
render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      await request(1000)
      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>
      <Wizard.Container
        onStepChange={async () => {
          await request(1000)
        }}
      >
        <Wizard.Step title="Step 1">
          <Form.Card>
            <Field.String path="/someInfo" label="Some information" />
          </Form.Card>
          <Wizard.NextButton />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Form.Card>
            <Field.String path="/more" label="More information" />
          </Form.Card>
          <Form.SubmitButton variant="send" />
        </Wizard.Step>
      </Wizard.Container>
    </Form.InfoOverlay>
  </Form.Handler>
)
`});function _(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return d||y(`Examples`,!1),m||y(`Examples.ErrorMessage`,!0),h||y(`Examples.SuccessMessage`,!0),g||y(`Examples.WithAWizard`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Error message`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Success message`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`With a Wizard`}),`
`,(0,f.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};