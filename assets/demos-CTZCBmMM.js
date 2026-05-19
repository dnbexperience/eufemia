import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({WithCustomReturnStatus:()=>l,WithDialog:()=>s,WithStateContent:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`WithDialog`,children:`<Form.Handler
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
`}),c=()=>(0,o.jsx)(r,{stableName:`WithStateContent`,children:`<Form.Handler
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
`}),l=()=>(0,o.jsx)(r,{stableName:`WithCustomReturnStatus`,children:`<Form.Handler
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
`});function u(e){let t={h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||f(`Examples`,!1),l||f(`Examples.WithCustomReturnStatus`,!0),s||f(`Examples.WithDialog`,!0),c||f(`Examples.WithStateContent`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`With confirmation dialog`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Enable and disable the confirmation mechanism`}),`
`,(0,o.jsx)(t.p,{children:`This example makes first an ordinary submit request. But when the custom status is returned, the dialog component will be shown.`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Render different content based on the submit state`}),`
`,(0,o.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};