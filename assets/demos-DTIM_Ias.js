import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./TestElement-CGrmu8xx.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({BasicExample:()=>c}),s=e(n()),c=()=>(0,s.jsx)(r,{scope:{TestElement:i},stableName:`BasicExample`,children:`<Form.Handler
  defaultData={{
    myList: [
      {
        toggleValue: false,
      },
      {
        toggleValue: true,
      },
    ],
  }}
>
  <Iterate.Array path="/myList">
    <Field.Boolean
      label="Show content for item no. {itemNo}"
      variant="checkbox"
      itemPath="/toggleValue"
    />
    <Iterate.Visibility pathTrue="/toggleValue" animate>
      <TestElement>
        <Iterate.ItemNo>
          {'Hide and show me item no. {itemNo}'}
        </Iterate.ItemNo>
      </TestElement>
    </Iterate.Visibility>
  </Iterate.Array>
</Form.Handler>
`});function l(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return o||d(`Examples`,!1),c||d(`Examples.BasicExample`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Basic example`}),`
`,(0,s.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};