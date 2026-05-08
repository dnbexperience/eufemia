import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Import`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { useValueProps } from '@dnb/eufemia/extensions/forms'
// Use useValueProps
`})}),`
`,(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`useValueProps`}),` hook standardize handling of the value flow for a single consumer component representing one data point.`]}),`
`,(0,n.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/hooks/useValueProps.tsx`,children:`Source code`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/useValueProps`,children:`Docs code`})}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`It also provides a way to transform the value.`}),`
`,(0,n.jsxs)(r.p,{children:[`This hook works perfectly together with `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`How to use`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValueComponent = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValueComponent path="/dataSelector" />)
`})}),`
`,(0,n.jsx)(r.h3,{children:`Internal Properties`}),`
`,(0,n.jsx)(r.p,{children:`All properties are optional and can be used as needed. These properties can be provided as part of your component properties.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`value`}),` the input value (string).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`emptyValue`}),` defines what value is considered to be empty. Defaults to `,(0,n.jsx)(r.code,{children:`undefined`}),`. But an empty string will also be validated when required is true.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`path`}),` the JSON pointer that defines the entry name/key in the data structure.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`itemPath`}),` similar to `,(0,n.jsx)(r.code,{children:`path`}),`, but is used when run inside the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` context.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Return Parameters`}),`
`,(0,n.jsx)(r.p,{children:`It returns all of the given component properties, in addition to these:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`value`}),` the output value.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Value transformers`}),`
`,(0,n.jsx)(r.p,{children:`The transformers are hooks to transform the value on different stages.`}),`
`,(0,n.jsxs)(r.p,{children:[`They should return a transformed value: `,(0,n.jsx)(r.code,{children:`(value) => value`})]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`toInput`}),` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`fromExternal`}),` transforms the provided `,(0,n.jsx)(r.code,{children:`value`}),` property before any other operations are performed.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`In addition there are `,(0,n.jsx)(r.strong,{children:`value transformers`}),` which should be used outside of the value component (by the value consumer):`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`transformIn`}),` transforms the `,(0,n.jsx)(r.code,{children:`value`}),` before it's displayed in the value component.`]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};