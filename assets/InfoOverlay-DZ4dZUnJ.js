import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-D_whQLSJ2.js";var r=e();function i(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.InfoOverlay />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.InfoOverlay`}),` is used to display an informational message that fully covers the available space. It can show a custom message or content, a `,(0,r.jsx)(n.code,{children:`success`}),` message as a receipt, or an `,(0,r.jsx)(n.code,{children:`error`}),` message to indicate an issue.`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.p,{children:[`By default the given children will be shown.
This can also be achieved by setting `,(0,r.jsx)(n.code,{children:`content={undefined}`}),` or by `,(0,r.jsx)(n.code,{children:`Form.InfoOverlay.setContent(myId, undefined)`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.InfoOverlay>visible content</Form.InfoOverlay>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Display a message`}),`
`,(0,r.jsx)(n.p,{children:`There are two ways to display a message:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Using the `,(0,r.jsx)(n.code,{children:`Form.InfoOverlay.setContent`}),` method.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Using the `,(0,r.jsx)(n.code,{children:`content`}),` property.`]}),`
`]}),`
`,(0,r.jsxs)(n.h3,{children:[`Using the `,(0,r.jsx)(n.code,{children:`Form.InfoOverlay.setContent`}),` method`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can show the success or error message by using the `,(0,r.jsx)(n.code,{children:`Form.InfoOverlay.setContent`}),` method:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`Form.InfoOverlay.setContent(myId, <>info content</>)
// or
Form.InfoOverlay.setContent(myId, 'success')
// or
Form.InfoOverlay.setContent(myId, 'error')
// or to display the fallback content
Form.InfoOverlay.setContent(myId, undefined)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`And render the component with an `,(0,r.jsx)(n.code,{children:`id`}),` property:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.InfoOverlay id={myId}>content</Form.InfoOverlay>
`})}),`
`,(0,r.jsx)(n.p,{children:`You can call it whenever you need to show the success message. Here is an example of how to use it.`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note:`}),` the `,(0,r.jsx)(n.code,{children:`id`}),` property is inherited from the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` component in this example.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

// myFormId can be anything, as long as it's a unique instance
const myFormId = () => null

render(
  <Form.Handler
    id={myFormId}
    onSubmit={async () => {
      // 1. Send the request

      // 2. Show the success message
      Form.InfoOverlay.setContent(myFormId, 'success')
    }}
  >
    <Form.InfoOverlay>fallback content</Form.InfoOverlay>
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.h3,{children:[`Using the `,(0,r.jsx)(n.code,{children:`content`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can show the success or error message by using the `,(0,r.jsx)(n.code,{children:`content`}),` property:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.InfoOverlay content={<>info content</>}>fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="success">fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="error">fallback content</Form.InfoOverlay>
`})}),`
`,(0,r.jsxs)(n.h2,{children:[`Customization of the `,(0,r.jsx)(n.code,{children:`success`}),` and `,(0,r.jsx)(n.code,{children:`error`}),` messages`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can customize the `,(0,r.jsx)(n.code,{children:`success`}),` and `,(0,r.jsx)(n.code,{children:`error`}),` messages by using the `,(0,r.jsx)(n.code,{children:`success`}),` and `,(0,r.jsx)(n.code,{children:`error`}),` properties.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.InfoOverlay
  success={{
    title: 'Custom title',
    description: 'Custom description',
    buttonText: 'Custom button text',
    buttonHref: 'http://custom',
    buttonClickHandler: () => {},
  }}
  error={{
    title: 'Custom title',
    description: 'Custom description',
    cancelButton: 'Custom cancel',
    retryButton: 'Custom retry',
    retryingText: 'Custom retrying text',
  }}
>
  fallback content
</Form.InfoOverlay>
`})}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsx)(n.p,{children:`The component will manage focus handling, which is important for screen readers and users using keyboard navigation.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};