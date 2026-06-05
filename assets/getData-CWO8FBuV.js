import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-B4pRI4Zh.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.getData
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`With the `,(0,i.jsx)(t.code,{children:`Form.getData`}),` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  return <Form.Handler id={myFormId}>...</Form.Handler>
}

// Later, when there is data available
const { getValue, data, filterData, reduceToVisibleFields } =
  Form.getData(myFormId)
`})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`getValue`}),` will return the value of the given path.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`data`}),` will return the whole dataset (unvalidated).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`filterData`}),` will filter the data based on your own logic.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`reduceToVisibleFields`}),` will reduce the given data set to only contain the visible fields (mounted fields).`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`You link them together via the `,(0,i.jsx)(t.code,{children:`id`}),` (string, function, object or React Context as the reference) property.`]}),`
`,(0,i.jsx)(t.p,{children:`TypeScript support:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`type Data = { foo: string }
const { data } = Form.getData<Data>('unique')
`})}),`
`,(0,i.jsx)(t.p,{children:`Related helpers:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/setData/`,children:`Form.setData`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Visible data`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  return (
    <Form.Handler id={myFormId}>
      <Form.Visibility pathTrue="/isVisible">
        <Field.String path="/foo" />
      </Form.Visibility>
    </Form.Handler>
  )
}

// Later, when there is data available
const { data, reduceToVisibleFields } = Form.getData(myFormId)
const visibleData = reduceToVisibleFields(data)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Filter data`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`filterData`}),` function to filter your data.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You simply give it the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/demos/#filter-your-data`,children:`same kind of filter`}),` as you would within the `,(0,i.jsx)(t.code,{children:`onSubmit`}),` event callback.`]}),`
`,(0,i.jsx)(t.p,{children:`The callback function receives the following properties in an object:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`path`}),` The path of the field.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`value`}),` The value of the field.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`label`}),` The label of the field.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`props`}),` The given field properties.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`error`}),` The error of the field. Is `,(0,i.jsx)(t.code,{children:`undefined`}),` if there is no error.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`The callback function should return a `,(0,i.jsx)(t.code,{children:`boolean`}),` or `,(0,i.jsx)(t.code,{children:`undefined`}),`. Return `,(0,i.jsx)(t.code,{children:`false`}),` to exclude an entry.`]}),`
`,(0,i.jsx)(t.p,{children:`It returns the filtered form data.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" disabled />
    </Form.Handler>
  )
}

const filterDataHandler = ({ path, value, data, props, error }) => {
  if (props.disabled === true) {
    return false
  }
}

// Later, when there is data available
const { filterData } = Form.getData(myFormId)
const filteredData = filterData(filterDataHandler)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};