import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-Bq--eY3H.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.PushButton />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Iterate.PushButton`}),` connects to the array of a surrounding `,(0,r.jsx)(n.code,{children:`Iterate.Array`}),` or an array from the source pointed at through `,(0,r.jsx)(n.code,{children:`path`}),` and adds a new item to the array when clicked.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/PushButton`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/PushButton`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>

    <Iterate.PushButton
      path="/myList"
      text="Add another item"
      pushValue={{}}
    />
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`In order to create new items you can also use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Show the next item number in the button`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`{nextItemNo}`}),` variable in the `,(0,r.jsx)(n.code,{children:`text`}),` or `,(0,r.jsx)(n.code,{children:`children`}),` property to display the next item number.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Iterate.Array path="/myList">
      <Field.String itemPath="/" />
    </Iterate.Array>

    <Iterate.PushButton
      path="/myList"
      pushValue="push value"
      text="Add no. {nextItemNo}"
    />
  </Form.Handler>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};