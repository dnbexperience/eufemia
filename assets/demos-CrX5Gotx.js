import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{g as r,w as i}from"./forms-CFi5-4x5.js";import{U as a}from"./index-kfZVC31v.js";import{t as o}from"./ComponentBox-qLaLt9T0.js";var s=e({Default:()=>l}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Default`,sourceImports:[`import { Form, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:r,Form:i},children:`<Iterate.Array value={['foo', 'bar']}>
  <Form.SubHeading>
    <Iterate.ItemNo>{'Item no. {itemNo}'}</Iterate.ItemNo>
  </Form.SubHeading>
</Iterate.Array>
`});function u(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.Default`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Default`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};