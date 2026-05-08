import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";import{s as i}from"./Examples-CDYmlz65.js";var a=e({ErrorMessage:()=>c,SuccessMessage:()=>l,WithAWizard:()=>u}),o=t(),s=i(),c=()=>(0,o.jsx)(n,{scope:{request:s},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`}),l=()=>(0,o.jsx)(n,{scope:{request:s},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`}),u=()=>(0,o.jsx)(n,{scope:{request:i()},noInline:!0,children:`// myFormId can be anything, as long as it's a unique instance
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return a||p(`Examples`,!1),c||p(`Examples.ErrorMessage`,!0),l||p(`Examples.SuccessMessage`,!0),u||p(`Examples.WithAWizard`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Error message`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Success message`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With a Wizard`}),`
`,(0,o.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};