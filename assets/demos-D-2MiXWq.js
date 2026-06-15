import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./formatCurrency-Bgb2f9K8.js";import{t as i}from"./useValueProps-C6XOTK8Z.js";import{t as a}from"./Form-JTiJXf2d.js";import{t as o}from"./ValueBlock-xJ-M2W9v.js";import{K as s}from"./index-ppRu2ktv.js";import{t as c}from"./ComponentBox-R2c6Bo76.js";var l=e({CustomComponentExample:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{scope:{useValueProps:i,ValueBlock:o,formatCurrency:r},stableName:`CustomComponentExample`,sourceImports:[`import { ValueBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`,`import { formatCurrency } from '@dnb/eufemia/components/number-format/NumberUtils'`],__buildScope:{ValueBlock:o,Form:a},noInline:!0,children:`const MyValueComponent = (props) => {
  const preparedProps = {
    label: 'Default Label',
    ...props,
    toInput: (value) => value + 10,
  }
  const { value, ...rest } = useValueProps(preparedProps)
  return <ValueBlock {...rest}>{formatCurrency(value)} kroner</ValueBlock>
}
render(
  <Form.Handler
    data={{
      myValue: 10,
    }}
  >
    <MyValueComponent
      label="Amount"
      path="/myValue"
      transformIn={(value) => value * 2}
    />
  </Form.Handler>
)
`});function f(e){let t={h2:`h2`,...s(),...e.components};return l||m(`Examples`,!1),d||m(`Examples.CustomComponentExample`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};