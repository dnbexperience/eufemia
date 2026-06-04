import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./components-B8myVLGO.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`Iterate is a set of components and functionality designed for traversing values and parts of data sets, such as arrays.`}),`
`,(0,i.jsx)(t.p,{children:`It is particularly useful when dealing with data that contains a varying number of items, as the number of components on the screen depends on the number of items in the data.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Define a `,(0,i.jsx)(t.code,{children:`value`}),` property with an array of items you want to iterate over. This can be a list of strings, objects, or any other type of data.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Put `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/all-fields/`,children:`Field.*`}),` or `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/`,children:`Values.*`}),` with an `,(0,i.jsx)(t.code,{children:`itemPath`}),` inside.`]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']} onChange={console.log}>
    <Field.String itemPath="/" />
  </Iterate.Array>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can also iterate over objects and easily integrate it with the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` data handling, as shown in the example below:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    defaultData={{
      listOfHeroes: [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'The Hulk' },
      ],
    }}
    onChange={console.log}
  >
    <Iterate.Array path="/listOfHeroes">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};