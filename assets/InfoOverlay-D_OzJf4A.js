import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-4C58ZE6U.js";var i=e(t());function a(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.InfoOverlay />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.InfoOverlay`}),` is used to display an informational message that fully covers the available space. It can show a custom message or content, a `,(0,i.jsx)(t.code,{children:`success`}),` message as a receipt, or an `,(0,i.jsx)(t.code,{children:`error`}),` message to indicate an issue.`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsxs)(t.p,{children:[`By default the given children will be shown.
This can also be achieved by setting `,(0,i.jsx)(t.code,{children:`content={undefined}`}),` or by `,(0,i.jsx)(t.code,{children:`Form.InfoOverlay.setContent(myId, undefined)`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.InfoOverlay>visible content</Form.InfoOverlay>
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Display a message`}),`
`,(0,i.jsx)(t.p,{children:`There are two ways to display a message:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Using the `,(0,i.jsx)(t.code,{children:`Form.InfoOverlay.setContent`}),` method.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Using the `,(0,i.jsx)(t.code,{children:`content`}),` property.`]}),`
`]}),`
`,(0,i.jsxs)(t.h3,{children:[`Using the `,(0,i.jsx)(t.code,{children:`Form.InfoOverlay.setContent`}),` method`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can show the success or error message by using the `,(0,i.jsx)(t.code,{children:`Form.InfoOverlay.setContent`}),` method:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`Form.InfoOverlay.setContent(myId, <>info content</>)
// or
Form.InfoOverlay.setContent(myId, 'success')
// or
Form.InfoOverlay.setContent(myId, 'error')
// or to display the fallback content
Form.InfoOverlay.setContent(myId, undefined)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`And render the component with an `,(0,i.jsx)(t.code,{children:`id`}),` property:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.InfoOverlay id={myId}>content</Form.InfoOverlay>
`})}),`
`,(0,i.jsx)(t.p,{children:`You can call it whenever you need to show the success message. Here is an example of how to use it.`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note:`}),` the `,(0,i.jsx)(t.code,{children:`id`}),` property is inherited from the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` component in this example.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.h3,{children:[`Using the `,(0,i.jsx)(t.code,{children:`content`}),` property`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can show the success or error message by using the `,(0,i.jsx)(t.code,{children:`content`}),` property:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.InfoOverlay content={<>info content</>}>fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="success">fallback content</Form.InfoOverlay>
<Form.InfoOverlay content="error">fallback content</Form.InfoOverlay>
`})}),`
`,(0,i.jsxs)(t.h2,{children:[`Customization of the `,(0,i.jsx)(t.code,{children:`success`}),` and `,(0,i.jsx)(t.code,{children:`error`}),` messages`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can customize the `,(0,i.jsx)(t.code,{children:`success`}),` and `,(0,i.jsx)(t.code,{children:`error`}),` messages by using the `,(0,i.jsx)(t.code,{children:`success`}),` and `,(0,i.jsx)(t.code,{children:`error`}),` properties.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.InfoOverlay
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
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsx)(t.p,{children:`The component will manage focus handling, which is important for screen readers and users using keyboard navigation.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};