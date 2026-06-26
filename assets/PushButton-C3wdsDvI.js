import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-CuNiYbm7.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.PushButton />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Iterate.PushButton`}),` connects to the array of a surrounding `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` or an array from the source pointed at through `,(0,i.jsx)(t.code,{children:`path`}),` and adds a new item to the array when clicked.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/PushButton`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/PushButton`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.p,{children:[`In order to create new items you can also use the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Show the next item number in the button`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`{nextItemNo}`}),` variable in the `,(0,i.jsx)(t.code,{children:`text`}),` or `,(0,i.jsx)(t.code,{children:`children`}),` property to display the next item number.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};