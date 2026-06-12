import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-D0SeNBSG.js";import{t as i}from"./Form-B9l6EvGx.js";import{t as a}from"./Value-whMgauSk.js";import{K as o}from"./index-CsG353ar.js";import{t as s}from"./ComponentBox-Cb1rLw_D.js";var c=e({CompanyName:()=>f,Composition:()=>m,FirstName:()=>u,Inline:()=>h,LastName:()=>d,Placeholder:()=>p}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`FirstName`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Name.First value="Nora" />
`}),d=()=>(0,l.jsx)(s,{stableName:`LastName`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Name.Last value="Mørk" />
`}),f=()=>(0,l.jsx)(s,{stableName:`CompanyName`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Name.Company value="DNB" />
`}),p=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Name.Last placeholder="Custom placeholder" />
`}),m=()=>(0,l.jsx)(s,{stableName:`Composition`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Composition>
  <Value.Name.First value="Nora" />
  <Value.Name.Last value="Mørk" />
</Value.Composition>
`}),h=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,P:r,Value:a},children:`<Form.Handler
  defaultData={{
    firstName: 'Nora',
    lastName: 'Mørk',
  }}
>
  <P>
    This is before the component{' '}
    <Value.Name.First path="/firstName" inline />{' '}
    <Value.Name.Last path="/lastName" inline /> This is after the component
  </P>
</Form.Handler>
`});function g(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||v(`Examples`,!1),f||v(`Examples.CompanyName`,!0),m||v(`Examples.Composition`,!0),u||v(`Examples.FirstName`,!0),h||v(`Examples.Inline`,!0),d||v(`Examples.LastName`,!0),p||v(`Examples.Placeholder`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`First name`}),`
`,(0,l.jsx)(u,{value:`Nora`}),`
`,(0,l.jsx)(t.h3,{children:`Last name`}),`
`,(0,l.jsx)(d,{value:`Mørk`}),`
`,(0,l.jsx)(t.h3,{children:`Company name`}),`
`,(0,l.jsx)(f,{value:`DNB`}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Value composition`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};