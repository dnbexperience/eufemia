import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./TestElement-DZzGdrQR.js";import{t as i}from"./Form-B9l6EvGx.js";import{t as a}from"./Field-DHicZJEj.js";import{t as o}from"./Iterate-B2rVv1xi.js";import{K as s}from"./index-CsG353ar.js";import{t as c}from"./ComponentBox-Cb1rLw_D.js";var l=e({BasicExample:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{scope:{TestElement:r},stableName:`BasicExample`,sourceImports:[`import { Field, Form, Iterate, TestElement } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Iterate:o,Field:a},children:`<Form.Handler
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