import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-BPHElNFg2.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.setData
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`With the `,(0,r.jsx)(n.code,{children:`Form.setData`}),` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:`]}),`
`,(0,r.jsx)(n.p,{children:`Related helpers:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/getData/`,children:`Form.getData`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Replace the whole data set`}),`
`,(0,r.jsxs)(n.p,{children:[`When a value is given to the `,(0,r.jsx)(n.code,{children:`setData`}),` function, the whole data set will be replaced.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

Form.setData('unique', { foo: 'bar' })

function MyForm() {
  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Update a single value`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`update`}),` function to update the data.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference
const { update } = Form.setData(myFormId)

function MyForm() {
  return (
    <Form.Handler id={myFormId}>
      <Field.Number path="/foo" defaultValue={0} />
    </Form.Handler>
  )
}

// Call "update" with the path and the new value.
update('/foo', 1)

// Or with a function that gives you the current value, if any.
update('/foo', (value) => {
  if (typeof value === 'number') {
    return value + 1
  }
  return 1
})
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};