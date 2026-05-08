import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CVbv0zRq.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useData
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`With the `,(0,r.jsx)(n.code,{children:`Form.useData`}),` hook, you can manage your form data from nested components and outside the form context (`,(0,r.jsx)(n.code,{children:`Form.Handler`}),`).`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/useData.ts`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/useData`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`The hook returns an object with the following properties:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const {
    getValue,
    update,
    remove,
    set,
    data,
    filterData,
    reduceToVisibleFields,
  } = Form.useData()

  return <>MyComponent</>
}

render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`getValue`}),` will return the value of the given path.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`update`}),` will update the value of the given path.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`remove`}),` will remove the given path from the data context (fields will reapply their values afterwards).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`set`}),` will set the whole dataset.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`data`}),` will return the whole dataset (unvalidated).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`filterData`}),` will filter the data based on your own logic.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`reduceToVisibleFields`}),` will reduce the given data set to only contain the visible fields (mounted fields).`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`Form.useData`}),` hook with or without an `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference) property, which is optional and can be used to link the data to a specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component.`]}),`
`,(0,r.jsx)(n.h3,{children:`TypeScript support`}),`
`,(0,r.jsx)(n.p,{children:`You can define the TypeScript type structure for your form data. This will help you to get better code completion and type checking.`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` Use `,(0,r.jsx)(n.code,{children:`type`}),` instead of `,(0,r.jsx)(n.code,{children:`interface`}),` for the type definition.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`type MyData = { firstName: string }

const MyComponent = () => {
  const { data } = Form.useData<MyData>()
  return data.firstName
}
`})}),`
`,(0,r.jsxs)(n.h3,{children:[`Without an `,(0,r.jsx)(n.code,{children:`id`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`Here "Component" is rendered inside the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` component and does not need an `,(0,r.jsx)(n.code,{children:`id`}),` property to access the form data:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Component />
    </Form.Handler>
  )
}

function Component() {
  const { data } = Form.useData()
}
`})}),`
`,(0,r.jsxs)(n.h3,{children:[`With an `,(0,r.jsx)(n.code,{children:`id`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`While in this example, "Component" is outside the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` context, but linked together via the `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference) property:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <Component />
    </>
  )
}

function Component() {
  const { data } = Form.useData(myFormId)
}
`})}),`
`,(0,r.jsx)(n.p,{children:`This is beneficial when you need to utilize the form data in other places within your application.`}),`
`,(0,r.jsx)(n.h3,{children:`Select a single value`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { getValue } = Form.useData()

  const value = getValue('/foo')
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Update data`}),`
`,(0,r.jsxs)(n.p,{children:[`If you need to update the data, you can use the `,(0,r.jsx)(n.code,{children:`update`}),` method.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It takes a path (`,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/getting-started/#what-is-a-json-pointer`,children:`JSON Pointer`}),`) and a callback function. The callback function receives the existing value as the first argument, and the second argument is the path itself. The callback function must return the new value.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function Component() {
  const { update } = Form.useData()

  useEffect(() => {
    update('/foo', 'new value')

    // - or with a callback function to get the existing value
    update('/foo', (existingValue) => existingValue + 'new value')
  }, [])
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Extend the whole data set`}),`
`,(0,r.jsxs)(n.p,{children:[`With the `,(0,r.jsx)(n.code,{children:`set`}),` method, you can extend the data set. Existing data paths will be overwritten.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { data, set } = Form.useData(myFormId)

  useEffect(() => {
    set({ foo: 'bar' })
  }, [])

  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Visible data`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields. Check out the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/demos/#reduce-your-data-to-visible-fields`,children:`example`}),` in the demo section.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { data, reduceToVisibleFields } = Form.useData()

  // Use useEffect to ensure we get the latest data
  React.useEffect(() => {
    console.log(reduceToVisibleFields(data))
  }, [data])

  return <>MyComponent</>
}

render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`In addition, you can include or exclude paths by using the `,(0,r.jsx)(n.code,{children:`keepPaths`}),` and `,(0,r.jsx)(n.code,{children:`removePaths`}),` options.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`reduceToVisibleFields(data, {
  keepPaths: ['/foo'],
  removePaths: ['/bar'],
})
`})}),`
`,(0,r.jsx)(n.h2,{children:`Filter data`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`filterData`}),` function to filter your data. Check out `,(0,r.jsx)(n.a,{href:`#filter-your-data`,children:`the example below`}),`.`]}),`
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
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Tip:`}),` Depending on your use case – and instead of `,(0,r.jsx)(n.code,{children:`disabled`}),` – you may rather use a `,(0,r.jsx)(n.code,{children:`data-*`}),` attribute on your field (e.g. `,(0,r.jsx)(n.code,{children:`data-exclude-field`}),`) to filter the field out of the data set.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const filterDataHandler = ({ path, value, data, props, error }) => {
  if (props['data-exclude-field']) {
    return false
  }
}

const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  const { filterData } = Form.useData(myFormId)
  const filteredData = filterData(filterDataHandler)

  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" data-exclude-field />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const filterDataHandler = ({ path, value, data, props, error }) => {
  return !(error instanceof Error)
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Initial data`}),`
`,(0,r.jsxs)(n.p,{children:[`You decide where and when you want to provide the initial `,(0,r.jsx)(n.code,{children:`data`}),` to the form. It can be done via the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` component, or via the `,(0,r.jsx)(n.code,{children:`Form.useData`}),` Hook or `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/setData/`,children:`Form.setData`}),` method – or even in each Field, with the value property.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference
const initialData = { foo: 'bar' }

function MyForm() {
  return (
    <Form.Handler id={myFormId} data={initialData}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}

function ComponentA() {
  Form.useData(myFormId, { foo: 'bar' })
}

function ComponentB() {
  const { set } = Form.useData(myFormId)

  useEffect(() => {
    set({ foo: 'bar' })
  }, [])
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Validation`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`tl;dr:`}),` the `,(0,r.jsx)(n.code,{children:`useData`}),` hook returns unvalidated data.`]}),`
`,(0,r.jsxs)(n.p,{children:[`When you use an async `,(0,r.jsx)(n.code,{children:`onChange`}),`, `,(0,r.jsx)(n.code,{children:`onChangeValidator`}),` or `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` event handler on a field, it will delay the "submitted" value, because of its async nature.`]}),`
`,(0,r.jsxs)(n.p,{children:[`That means, if you want to access the value of a field immediately, you can use the `,(0,r.jsx)(n.code,{children:`useData`}),` hook for that, as it always returns unvalidated data, in sync.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};