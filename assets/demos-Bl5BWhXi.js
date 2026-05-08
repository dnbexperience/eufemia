import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({WithCustomReturnStatus:()=>c,WithDialog:()=>o,WithStateContent:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),s=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`});function l(e){let t={h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||d(`Examples`,!1),c||d(`Examples.WithCustomReturnStatus`,!0),o||d(`Examples.WithDialog`,!0),s||d(`Examples.WithStateContent`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`With confirmation dialog`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Enable and disable the confirmation mechanism`}),`
`,(0,a.jsx)(t.p,{children:`This example makes first an ordinary submit request. But when the custom status is returned, the dialog component will be shown.`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Render different content based on the submit state`}),`
`,(0,a.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};