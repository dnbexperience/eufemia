import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{t as i}from"./Form-913YPZs6.js";import{t as a}from"./Value-C2hl5_67.js";import{W as o}from"./index-D7e1avVt.js";import{t as s}from"./ComponentBox-CE7bpcJy.js";var c=e({Inline:()=>p,Placeholder:()=>f,PostalAddress:()=>u,StreetAddress:()=>d}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`PostalAddress`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Address.Postal value="Postboks 55 Falkum 3705 Skien" />
`}),d=()=>(0,l.jsx)(s,{stableName:`StreetAddress`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Address.Street value="Dronning Eufemias gate 30" />
`}),f=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Address.Street placeholder="Custom placeholder" />
`}),p=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,P:r,Value:a},children:`<Form.Handler
  defaultData={{
    streetAddress: 'Dronning Eufemias gate 30',
    postalAddress: 'Postboks 55 Falkum 3705 Skien',
  }}
>
  <P>
    This is before the component{' '}
    <Value.Address.Street path="/streetAddress" inline />{' '}
    <Value.Address.Postal path="/postalAddress" inline /> This is after the
    component
  </P>
</Form.Handler>
`});function m(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||g(`Examples`,!1),p||g(`Examples.Inline`,!0),f||g(`Examples.Placeholder`,!0),u||g(`Examples.PostalAddress`,!0),d||g(`Examples.StreetAddress`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Postal address`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Street address`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};