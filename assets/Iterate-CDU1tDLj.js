import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./components-Dh-UY54-.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`Iterate is a set of components and functionality designed for traversing values and parts of data sets, such as arrays.`}),`
`,(0,r.jsx)(n.p,{children:`It is particularly useful when dealing with data that contains a varying number of items, as the number of components on the screen depends on the number of items in the data.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Define a `,(0,r.jsx)(n.code,{children:`value`}),` property with an array of items you want to iterate over. This can be a list of strings, objects, or any other type of data.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Put `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/all-fields/`,children:`Field.*`}),` or `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/`,children:`Values.*`}),` with an `,(0,r.jsx)(n.code,{children:`itemPath`}),` inside.`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']} onChange={console.log}>
    <Field.String itemPath="/" />
  </Iterate.Array>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also iterate over objects and easily integrate it with the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` data handling, as shown in the example below:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};