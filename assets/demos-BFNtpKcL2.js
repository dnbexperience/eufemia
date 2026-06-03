import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{n as r}from"./HelpButton-sV5p6bwJ.js";import{t as i}from"./Section-UYj7uQy5.js";import{c as a}from"./ToggleButton-D3NEk3jO.js";import{t as o}from"./Form-C16rVaXm.js";import{t as s}from"./Field-B5trC2Cn.js";import{W as c}from"./index-BCXtuv-b.js";import{t as l}from"./ComponentBox-B2X8809Z.js";var u=e({WithCustomReturnStatus:()=>m,WithDialog:()=>f,WithStateContent:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`WithDialog`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:a,Field:s,Dialog:r},children:`<Form.Handler
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
`}),p=()=>(0,d.jsx)(l,{stableName:`WithStateContent`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:a,Field:s,Dialog:r},children:`<Form.Handler
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
`}),m=()=>(0,d.jsx)(l,{stableName:`WithCustomReturnStatus`,sourceImports:[`import { Dialog, Flex, Section } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:a,Field:s,Dialog:r,Section:i},children:`<Form.Handler
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
`});function h(e){let t={h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return u||_(`Examples`,!1),m||_(`Examples.WithCustomReturnStatus`,!0),f||_(`Examples.WithDialog`,!0),p||_(`Examples.WithStateContent`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`With confirmation dialog`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Enable and disable the confirmation mechanism`}),`
`,(0,d.jsx)(t.p,{children:`This example makes first an ordinary submit request. But when the custom status is returned, the dialog component will be shown.`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Render different content based on the submit state`}),`
`,(0,d.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};