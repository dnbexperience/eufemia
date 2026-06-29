import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./demos-BK1YCg5f.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSnapshot
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Form.useSnapshot`}),` hook lets you store data snapshots of your form data, either inside or outside of the form context.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { createSnapshot, applySnapshot, revertSnapshot } =
    Form.useSnapshot()

  return <>MyComponent</>
}

render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`The hook returns an object with the following properties:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`createSnapshot`}),` will store the current data as a new snapshot with the given id.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`applySnapshot`}),` will revert the data to the snapshot with the given id (required).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`revertSnapshot`}),` will revert the data to the snapshot with the given id (required). A reverted snapshot gets deleted from the memory.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Partial data snapshots`}),`
`,(0,i.jsxs)(t.p,{children:[`In order to create and revert a snapshot for a specific part of the data context, you can use the `,(0,i.jsx)(t.code,{children:`Form.Snapshot`}),` component:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Snapshot name="my-snapshot-slice-name">
        <Field.String path="/foo" label="Will be reverted" />
        <Field.String path="/bar" label="Me too" />
      </Form.Snapshot>

      <Field.String path="/baz" label="Will stay as before" />
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[`When calling the `,(0,i.jsx)(t.code,{children:`createSnapshot`}),` or `,(0,i.jsx)(t.code,{children:`revertSnapshot`}),` functions, you can pass in your snapshot `,(0,i.jsx)(t.code,{children:`name`}),` (my-snapshot-slice-name) as the second parameter. This will make sure that the snapshot is only applied to the given part of the form data.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`createSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
revertSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
`})}),`
`,(0,i.jsx)(t.p,{children:`You can check out examples in the demo section.`}),`
`,(0,i.jsxs)(t.h2,{children:[`Usage of the `,(0,i.jsx)(t.code,{children:`Form.useSnapshot`}),` hook`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`Form.useSnapshot`}),` hook with or without an `,(0,i.jsx)(t.code,{children:`id`}),` (string, function, object or React Context as the reference) property, which is optional and can be used to link the data to a specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component.`]}),`
`,(0,i.jsxs)(t.h3,{children:[`Without an `,(0,i.jsx)(t.code,{children:`id`}),` property`]}),`
`,(0,i.jsxs)(t.p,{children:[`Here "Component" is rendered inside the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` component and does not need an `,(0,i.jsx)(t.code,{children:`id`}),` property to access the snapshot:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Component />
    </Form.Handler>
  )
}

function Component() {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot()
}
`})}),`
`,(0,i.jsxs)(t.h3,{children:[`With an `,(0,i.jsx)(t.code,{children:`id`}),` property`]}),`
`,(0,i.jsxs)(t.p,{children:[`While in this example, "Component" is outside the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` context, but linked together via the `,(0,i.jsx)(t.code,{children:`id`}),` (string, function, object or React Context as the reference) property:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
  const { createSnapshot, revertSnapshot } = Form.useSnapshot(myFormId)
}
`})}),`
`,(0,i.jsx)(t.p,{children:`This is beneficial when you need to utilize the form data in other places within your application.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};