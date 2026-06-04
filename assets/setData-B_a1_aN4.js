import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-tycn6Gyn.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.setData
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`With the `,(0,i.jsx)(t.code,{children:`Form.setData`}),` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:`]}),`
`,(0,i.jsx)(t.p,{children:`Related helpers:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/getData/`,children:`Form.getData`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Replace the whole data set`}),`
`,(0,i.jsxs)(t.p,{children:[`When a value is given to the `,(0,i.jsx)(t.code,{children:`setData`}),` function, the whole data set will be replaced.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`Update a single value`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`update`}),` function to update the data.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};