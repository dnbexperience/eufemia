import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{O as r,b as i,ot as a,t as o}from"./ComponentBox-a4aOn231.js";import{zr as s}from"./index-DqqByKA2.js";var c=t({CustomComponentExample:()=>u}),l=e(n()),u=()=>(0,l.jsx)(o,{scope:{useValueProps:r,ValueBlock:i,formatCurrency:a},stableName:`CustomComponentExample`,noInline:!0,children:`const MyValueComponent = (props) => {
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
`});function d(e){let t={h2:`h2`,...s(),...e.components};return c||p(`Examples`,!1),u||p(`Examples.CustomComponentExample`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};