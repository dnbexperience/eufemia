import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-DtVKLSL-.js";import{t as i}from"./Value-DvCb56Kz.js";import{W as a}from"./index-BCXtuv-b.js";import{t as o}from"./ComponentBox-B2X8809Z.js";var s=e({Empty:()=>l,Inline:()=>h,InlineAndLabel:()=>g,Label:()=>p,LabelAndValue:()=>m,Placeholder:()=>u,WithSuffix:()=>f,WithValue:()=>d}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency showEmpty />
`}),u=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency placeholder="The value was not filled in" />
`}),d=()=>(0,c.jsx)(o,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency value={150} />
`}),f=()=>(0,c.jsx)(o,{stableName:`WithSuffix`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency value={150} suffix=" - my suffix" />
`}),p=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency label="Label text" showEmpty />
`}),m=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Currency label="Label text" value={60000000} />
`}),h=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component <Value.Currency value={25000} inline /> This
  is after the component
</P>
`}),g=()=>(0,c.jsx)(o,{stableName:`InlineAndLabel`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component{' '}
  <Value.Currency label="Label text" value={25000} inline /> This is after
  the component
</P>
`});function _(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||y(`Examples`,!1),l||y(`Examples.Empty`,!0),h||y(`Examples.Inline`,!0),g||y(`Examples.InlineAndLabel`,!0),p||y(`Examples.Label`,!0),m||y(`Examples.LabelAndValue`,!0),u||y(`Examples.Placeholder`,!0),f||y(`Examples.WithSuffix`,!0),d||y(`Examples.WithValue`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Empty`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Value`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Suffix`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline and label`}),`
`,(0,c.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};