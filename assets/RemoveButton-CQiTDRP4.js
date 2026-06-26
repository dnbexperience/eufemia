import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-BO8X8VLW.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.RemoveButton />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Iterate.RemoveButton`}),` connects to the array of a surrounding `,(0,i.jsx)(t.code,{children:`Iterate.Array`}),` and removes the item when clicked.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/RemoveButton`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/RemoveButton`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler defaultData={{ myList: ['foo'] }}>
    <Iterate.Array path="/myList">
      <Iterate.RemoveButton text="Remove item" />
    </Iterate.Array>
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Confirm removal`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`showConfirmDialog`}),` property to open a confirmation dialog before removing the item.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Iterate.RemoveButton showConfirmDialog />
`})}),`
`,(0,i.jsx)(t.h2,{children:`The item number in the title`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`{itemNo}`}),` variable in the `,(0,i.jsx)(t.code,{children:`text`}),` or the `,(0,i.jsx)(t.code,{children:`children`}),` property to display the current item number.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler defaultData={{ myList: ['foo'] }}>
    <Iterate.Array path="/myList">
      <Iterate.RemoveButton text="Remove item {itemNo}" />
    </Iterate.Array>
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};