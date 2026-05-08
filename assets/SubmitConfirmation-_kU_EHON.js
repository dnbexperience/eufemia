import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CD1kAkON.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.SubmitConfirmation />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.SubmitConfirmation`}),` can be used to prevent the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` from submitting, and makes it possible to show a confirmation dialog in different scenarios.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Dialog } from '@dnb/eufemia'
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
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`renderWithState`}),` function is called whenever the submit confirmation state changes. It receives an object as the first parameter, which contains:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`connectWithDialog`}),` lets you connect the submit confirmation with a `,(0,r.jsx)(n.a,{href:`/uilib/components/dialog`,children:`Dialog`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`submitHandler`}),` is a function that can be called to submit the form.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`cancelHandler`}),` is a function that can be called to cancel the form.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`setConfirmationState`}),` is a function that can be called to update the submit state.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`confirmationState`}),` is a string that can be used to determine the current state of the submit confirmation:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`idle`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`readyToBeSubmitted`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`submitInProgress`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`submissionComplete`})}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`submitState`}),` is the state of the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` form event:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`error`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`info`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`warning`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:`success`})}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`customStatus`}),` Your custom status.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`data`}),` is the data that was submitted.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Connect with a Dialog`}),`
`,(0,r.jsxs)(n.p,{children:[`You can connect the submit confirmation with a `,(0,r.jsx)(n.a,{href:`/uilib/components/dialog`,children:`Dialog`}),` by using the `,(0,r.jsx)(n.code,{children:`connectWithDialog`}),` property. This property is an object that contains the `,(0,r.jsx)(n.code,{children:`open`}),`, `,(0,r.jsx)(n.code,{children:`onConfirm`}),`, `,(0,r.jsx)(n.code,{children:`onDecline`}),`, and `,(0,r.jsx)(n.code,{children:`onClose`}),` properties, which you can spread to the Dialog component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Dialog } from '@dnb/eufemia'
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
`,(0,r.jsx)(n.h2,{children:`Using the submitHandler and cancelHandler`}),`
`,(0,r.jsxs)(n.p,{children:[`In addition to `,(0,r.jsx)(n.code,{children:`connectWithDialog`}),`, there are the `,(0,r.jsx)(n.code,{children:`submitHandler`}),` and `,(0,r.jsx)(n.code,{children:`cancelHandler`}),` functions, available to handle the submission and cancellation processes:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Form.SubmitConfirmation
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
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`When the `,(0,r.jsx)(n.code,{children:`cancelHandler`}),` is called or the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` event is completed, the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` will regain focus.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};