import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-CFiDSmwe.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSnapshot
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.useSnapshot`}),` hook lets you store data snapshots of your form data, either inside or outside of the form context.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.p,{children:`The hook returns an object with the following properties:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`createSnapshot`}),` will store the current data as a new snapshot with the given id.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`applySnapshot`}),` will revert the data to the snapshot with the given id (required).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`revertSnapshot`}),` will revert the data to the snapshot with the given id (required). A reverted snapshot gets deleted from the memory.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Partial data snapshots`}),`
`,(0,r.jsxs)(n.p,{children:[`In order to create and revert a snapshot for a specific part of the data context, you can use the `,(0,r.jsx)(n.code,{children:`Form.Snapshot`}),` component:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsxs)(n.p,{children:[`When calling the `,(0,r.jsx)(n.code,{children:`createSnapshot`}),` or `,(0,r.jsx)(n.code,{children:`revertSnapshot`}),` functions, you can pass in your snapshot `,(0,r.jsx)(n.code,{children:`name`}),` (my-snapshot-slice-name) as the second parameter. This will make sure that the snapshot is only applied to the given part of the form data.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`createSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
revertSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
`})}),`
`,(0,r.jsx)(n.p,{children:`You can check out examples in the demo section.`}),`
`,(0,r.jsxs)(n.h2,{children:[`Usage of the `,(0,r.jsx)(n.code,{children:`Form.useSnapshot`}),` hook`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`Form.useSnapshot`}),` hook with or without an `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference) property, which is optional and can be used to link the data to a specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component.`]}),`
`,(0,r.jsxs)(n.h3,{children:[`Without an `,(0,r.jsx)(n.code,{children:`id`}),` property`]}),`
`,(0,r.jsxs)(n.p,{children:[`Here "Component" is rendered inside the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` component and does not need an `,(0,r.jsx)(n.code,{children:`id`}),` property to access the snapshot:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
  const { createSnapshot, revertSnapshot } = Form.useSnapshot(myFormId)
}
`})}),`
`,(0,r.jsx)(n.p,{children:`This is beneficial when you need to utilize the form data in other places within your application.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};