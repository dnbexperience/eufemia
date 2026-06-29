import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Import`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useDataValue
`})}),`
`,(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`Form.useDataValue(path)`}),` returns the current value at a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#what-is-a-json-pointer`,children:`JSON Pointer`}),` path and subscribes only to that path while used inside `,(0,r.jsx)(t.code,{children:`Form.Handler`}),`.`]}),`
`,(0,r.jsx)(t.p,{children:`Use it when rendered output depends on one form data value. It rerenders when that path, a parent path or a child path changes, but not when unrelated form data or other form context state changes.`}),`
`,(0,r.jsxs)(t.p,{children:[`For custom field or value components, prefer `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` or `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useValueProps/`,children:`useValueProps`}),` for the component's own path.`]}),`
`,(0,r.jsx)(t.p,{children:`Related helpers:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/#without-subscription`,children:`Form.useDataWithoutSubscription`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/getData/`,children:`Form.getData`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/DataContext/useDataValue.ts`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/useDataValue`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Usage`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const name = Form.useDataValue<string>('/customer/name')

  return <output>{name}</output>
}

render(
  <Form.Handler data={{ customer: { name: 'Ada' } }}>
    <MyComponent />
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(t.h2,{children:`TypeScript support`}),`
`,(0,r.jsx)(t.p,{children:`You can define the value type returned from the path.`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`type MyData = { firstName: string }

const MyComponent = () => {
  const firstName = Form.useDataValue<MyData['firstName']>('/firstName')

  return firstName
}
`})}),`
`,(0,r.jsx)(t.h2,{children:`When to use it`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`Form.useDataValue`}),` for rendered values inside `,(0,r.jsx)(t.code,{children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` when rendered output depends on the whole form data object.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/#without-subscription`,children:`Form.useDataWithoutSubscription`}),` for non-subscribing imperative reads or writes in callbacks, effects or internal handlers.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsx)(a,{})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};