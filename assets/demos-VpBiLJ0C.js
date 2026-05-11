import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{O as n,b as r,ot as i,t as a}from"./ComponentBox-xW2kV1s2.js";import{Lr as o}from"./index-DVm0MbGb.js";var s=e({CustomComponentExample:()=>l}),c=t(),l=()=>(0,c.jsx)(a,{scope:{useValueProps:n,ValueBlock:r,formatCurrency:i},noInline:!0,children:`const MyValueComponent = (props) => {
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
`});function u(e){let t={h2:`h2`,...o(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.CustomComponentExample`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};