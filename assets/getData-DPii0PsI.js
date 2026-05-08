import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-Dl6Klruk.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.getData
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`With the `,(0,r.jsx)(n.code,{children:`Form.getData`}),` method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  return <Form.Handler id={myFormId}>...</Form.Handler>
}

// Later, when there is data available
const { getValue, data, filterData, reduceToVisibleFields } =
  Form.getData(myFormId)
`})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`getValue`}),` will return the value of the given path.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`data`}),` will return the whole dataset (unvalidated).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`filterData`}),` will filter the data based on your own logic.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`reduceToVisibleFields`}),` will reduce the given data set to only contain the visible fields (mounted fields).`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`You link them together via the `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference) property.`]}),`
`,(0,r.jsx)(n.p,{children:`TypeScript support:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`type Data = { foo: string }
const { data } = Form.getData<Data>('unique')
`})}),`
`,(0,r.jsx)(n.p,{children:`Related helpers:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/setData/`,children:`Form.setData`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Visible data`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h2,{children:`Filter data`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`filterData`}),` function to filter your data.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You simply give it the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/demos/#filter-your-data`,children:`same kind of filter`}),` as you would within the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` event callback.`]}),`
`,(0,r.jsx)(n.p,{children:`The callback function receives the following properties in an object:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`path`}),` The path of the field.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`value`}),` The value of the field.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`label`}),` The label of the field.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`props`}),` The given field properties.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`error`}),` The error of the field. Is `,(0,r.jsx)(n.code,{children:`undefined`}),` if there is no error.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The callback function should return a `,(0,r.jsx)(n.code,{children:`boolean`}),` or `,(0,r.jsx)(n.code,{children:`undefined`}),`. Return `,(0,r.jsx)(n.code,{children:`false`}),` to exclude an entry.`]}),`
`,(0,r.jsx)(n.p,{children:`It returns the filtered form data.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const myFormId = 'unique-id' // or a function, object or React Context reference

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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};