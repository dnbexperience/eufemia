import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{g as r,j as i,w as a}from"./forms-D54jfDKN.js";import{t as o}from"./TestElement-CJNwFdUL.js";import{U as s}from"./index-BsJ3GLEw.js";import{t as c}from"./ComponentBox-sLMgHvLi.js";var l=e({BasicExample:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{scope:{TestElement:o},stableName:`BasicExample`,sourceImports:[`import { Field, Form, Iterate, TestElement } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Iterate:r,Field:i},children:`<Form.Handler
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
`});function f(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||m(`Examples`,!1),d||m(`Examples.BasicExample`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Basic example`}),`
`,(0,u.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};