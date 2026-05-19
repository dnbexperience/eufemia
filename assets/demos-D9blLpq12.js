import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";import{s as a}from"./Examples-CXhguzzY.js";var o=t({ErrorMessage:()=>l,SuccessMessage:()=>u,WithAWizard:()=>d}),s=e(n()),c=a(),l=()=>(0,s.jsx)(r,{scope:{request:c},stableName:`ErrorMessage`,noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`}),u=()=>(0,s.jsx)(r,{scope:{request:c},stableName:`SuccessMessage`,noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`}),d=()=>(0,s.jsx)(r,{scope:{request:a()},stableName:`WithAWizard`,noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`});function f(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||m(`Examples`,!1),l||m(`Examples.ErrorMessage`,!0),u||m(`Examples.SuccessMessage`,!0),d||m(`Examples.WithAWizard`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Error message`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Success message`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`With a Wizard`}),`
`,(0,s.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};