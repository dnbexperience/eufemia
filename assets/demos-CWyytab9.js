import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-PES0Uozy.js";import{t as i}from"./Field-DrUGn0oz.js";import{Bn as a,Rr as o,un as s,xn as c}from"./index-BIrFyEEc.js";import{t as l}from"./ComponentBox-DFVIRw0w.js";var u=t({WithCustomReturnStatus:()=>m,WithDialog:()=>f,WithStateContent:()=>p}),d=e(n()),f=()=>(0,d.jsx)(l,{stableName:`WithDialog`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Flex:s,Field:i,Dialog:c},children:`<Form.Handler
  locale="en-GB"
  onSubmit={async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }}
>
  <Flex.Stack>
    <Field.String label="Label" path="/foo" defaultValue="foo" />
    <Form.SubmitButton />
  </Flex.Stack>

  <Form.SubmitConfirmation
    preventSubmitWhen={() => true}
    renderWithState={({ connectWithDialog }) => {
      return (
        <Dialog
          variant="confirmation"
          title="Dialog confirmation title"
          description="Some content describing the situation."
          {...connectWithDialog}
        />
      )
    }}
  />
</Form.Handler>
`}),p=()=>(0,d.jsx)(l,{stableName:`WithStateContent`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Flex:s,Field:i,Dialog:c},children:`<Form.Handler
  locale="en-GB"
  onSubmit={async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }}
>
  <Form.SubmitConfirmation
    preventSubmitWhen={() => true}
    onStateChange={({ confirmationState }) => {
      console.log('onStateChange', confirmationState)
    }}
    renderWithState={({ confirmationState, connectWithDialog }) => {
      let content = null
      switch (confirmationState) {
        case 'readyToBeSubmitted':
          content = <>Is waiting ...</>
          break
        case 'submitInProgress':
          content = <>Submitting...</>
          break
        case 'submissionComplete':
          content = <>Complete!</>
          break
        default:
          content = (
            <Flex.Stack>
              <Field.String label="Label" path="/foo" defaultValue="foo" />
              <Form.SubmitButton />
            </Flex.Stack>
          )
          break
      }
      return (
        <>
          {content}
          <Dialog
            variant="confirmation"
            title="Dialog confirmation title"
            description="Some content describing the situation."
            {...connectWithDialog}
          />
        </>
      )
    }}
  />
</Form.Handler>
`}),m=()=>(0,d.jsx)(l,{stableName:`WithCustomReturnStatus`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Flex:s,Field:i,Dialog:c,Section:a},children:`<Form.Handler
  locale="en-GB"
  onSubmit={async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return {
      customStatus: 'My custom status',
    }
  }}
>
  <Flex.Stack>
    <Field.String label="Label" path="/foo" defaultValue="foo" />
    <Form.SubmitButton />
  </Flex.Stack>

  <Form.SubmitConfirmation
    onSubmitResult={({ submitState, setConfirmationState }) => {
      if (submitState && submitState.customStatus) {
        setConfirmationState('readyToBeSubmitted')
      }
    }}
    renderWithState={({ connectWithDialog, submitState }) => {
      return (
        <Dialog
          variant="confirmation"
          title="Dialog confirmation title"
          description="Some content describing the situation."
          confirmText="Send"
          {...connectWithDialog}
        >
          <Section
            variant="information"
            innerSpace={{
              top: true,
              bottom: true,
            }}
            top
          >
            <Flex.Stack>
              <Field.String label="Inside the dialog" path="/foo" />
              <Form.Isolation
                onChange={console.log}
                data={{
                  bar: submitState ? submitState.customStatus : 'bar',
                }}
              >
                <Field.String label="Isolated" path="/bar" />
              </Form.Isolation>
            </Flex.Stack>
          </Section>
        </Dialog>
      )
    }}
  />
</Form.Handler>
`});function h(e){let t={h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return u||_(`Examples`,!1),m||_(`Examples.WithCustomReturnStatus`,!0),f||_(`Examples.WithDialog`,!0),p||_(`Examples.WithStateContent`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`With confirmation dialog`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Enable and disable the confirmation mechanism`}),`
`,(0,d.jsx)(t.p,{children:`This example makes first an ordinary submit request. But when the custom status is returned, the dialog component will be shown.`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Render different content based on the submit state`}),`
`,(0,d.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};