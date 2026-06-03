import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Import`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { useValueProps } from '@dnb/eufemia/extensions/forms'
// Use useValueProps
`})}),`
`,(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`useValueProps`}),` hook standardize handling of the value flow for a single consumer component representing one data point.`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/hooks/useValueProps.tsx`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/useValueProps`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`It also provides a way to transform the value.`}),`
`,(0,r.jsxs)(t.p,{children:[`This hook works perfectly together with `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`How to use`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValueComponent = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValueComponent path="/dataSelector" />)
`})}),`
`,(0,r.jsx)(t.h3,{children:`Internal Properties`}),`
`,(0,r.jsx)(t.p,{children:`All properties are optional and can be used as needed. These properties can be provided as part of your component properties.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`value`}),` the input value (string).`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`emptyValue`}),` defines what value is considered to be empty. Defaults to `,(0,r.jsx)(t.code,{children:`undefined`}),`. But an empty string will also be validated when required is true.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`path`}),` the JSON pointer that defines the entry name/key in the data structure.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`itemPath`}),` similar to `,(0,r.jsx)(t.code,{children:`path`}),`, but is used when run inside the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` context.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Return Parameters`}),`
`,(0,r.jsx)(t.p,{children:`It returns all of the given component properties, in addition to these:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`value`}),` the output value.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Value transformers`}),`
`,(0,r.jsx)(t.p,{children:`The transformers are hooks to transform the value on different stages.`}),`
`,(0,r.jsxs)(t.p,{children:[`They should return a transformed value: `,(0,r.jsx)(t.code,{children:`(value) => value`})]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`toInput`}),` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`fromExternal`}),` transforms the provided `,(0,r.jsx)(t.code,{children:`value`}),` property before any other operations are performed.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`In addition there are `,(0,r.jsx)(t.strong,{children:`value transformers`}),` which should be used outside of the value component (by the value consumer):`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`transformIn`}),` transforms the `,(0,r.jsx)(t.code,{children:`value`}),` before it's displayed in the value component.`]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};