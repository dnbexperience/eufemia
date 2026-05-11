import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{t as r}from"./TestElement-cTsZrWus.js";import{Lr as i}from"./index-DVm0MbGb.js";var a=e({BasicExample:()=>s}),o=t(),s=()=>(0,o.jsx)(n,{scope:{TestElement:r},children:`<Form.Handler
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
`});function c(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.BasicExample`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Basic example`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};