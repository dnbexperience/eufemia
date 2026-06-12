import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BPNVp_ak.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitConfirmation />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.SubmitConfirmation`}),` can be used to prevent the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` from submitting, and makes it possible to show a confirmation dialog in different scenarios.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Dialog } from '@dnb/eufemia'
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Handler
    onSubmit={async () => {
      // Your submit request
    }}
  >
    Content...
    <Form.SubmitButton />
    <Form.SubmitConfirmation
      preventSubmitWhen={(submitState) => {
        // Your preventSubmitWhen logic
      }}
      onStateChange={(parameters) => {
        // Your onStateChange logic
      }}
      renderWithState={(parameters) => {
        return 'Your content'
      }}
    />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`renderWithState`}),` function is called whenever the submit confirmation state changes. It receives an object as the first parameter, which contains:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`connectWithDialog`}),` lets you connect the submit confirmation with a `,(0,i.jsx)(t.a,{href:`/uilib/components/dialog`,children:`Dialog`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`submitHandler`}),` is a function that can be called to submit the form.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`cancelHandler`}),` is a function that can be called to cancel the form.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`setConfirmationState`}),` is a function that can be called to update the submit state.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`confirmationState`}),` is a string that can be used to determine the current state of the submit confirmation:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`idle`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`readyToBeSubmitted`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`submitInProgress`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`submissionComplete`})}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`submitState`}),` is the state of the `,(0,i.jsx)(t.code,{children:`onSubmit`}),` form event:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`error`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`info`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`warning`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:`success`})}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`customStatus`}),` Your custom status.`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`data`}),` is the data that was submitted.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Connect with a Dialog`}),`
`,(0,i.jsxs)(t.p,{children:[`You can connect the submit confirmation with a `,(0,i.jsx)(t.a,{href:`/uilib/components/dialog`,children:`Dialog`}),` by using the `,(0,i.jsx)(t.code,{children:`connectWithDialog`}),` property. This property is an object that contains the `,(0,i.jsx)(t.code,{children:`open`}),`, `,(0,i.jsx)(t.code,{children:`onConfirm`}),`, `,(0,i.jsx)(t.code,{children:`onDecline`}),`, and `,(0,i.jsx)(t.code,{children:`onClose`}),` properties, which you can spread to the Dialog component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Dialog } from '@dnb/eufemia'
import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.SubmitConfirmation
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
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Using the submitHandler and cancelHandler`}),`
`,(0,i.jsxs)(t.p,{children:[`In addition to `,(0,i.jsx)(t.code,{children:`connectWithDialog`}),`, there are the `,(0,i.jsx)(t.code,{children:`submitHandler`}),` and `,(0,i.jsx)(t.code,{children:`cancelHandler`}),` functions, available to handle the submission and cancellation processes:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Form.SubmitConfirmation
  renderWithState={({ submitHandler, cancelHandler }) => {
    return (
      <>
        <Button onClick={submitHandler} text="Submit" />
        <Button onClick={cancelHandler} text="Cancel" />
      </>
    )
  }}
/>
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`When the `,(0,i.jsx)(t.code,{children:`cancelHandler`}),` is called or the `,(0,i.jsx)(t.code,{children:`onSubmit`}),` event is completed, the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` will regain focus.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};