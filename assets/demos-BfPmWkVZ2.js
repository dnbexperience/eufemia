import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{v as r}from"./forms-D54jfDKN.js";import{t as i}from"./P-CVKBz4XO.js";import{U as a}from"./index-BsJ3GLEw.js";import{t as o}from"./ComponentBox-sLMgHvLi.js";var s=e({Inline:()=>f,LabelAndValue:()=>l,WithLocale:()=>d,WithSeconds:()=>u}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Time label="Label text" value="14:30" />
`}),u=()=>(0,c.jsx)(o,{stableName:`WithSeconds`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Time label="Label text" value="14:30:45" />
`}),d=()=>(0,c.jsx)(o,{stableName:`WithLocale`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`
<Value.Time label="en-US" value="14:30" locale="en-US" />
<Value.Time label="nb-NO" value="14:30" locale="nb-NO" />
<Value.Time label="de-DE" value="14:30" locale="de-DE" />

`}),f=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:i,Value:r},children:`<P>
  This is before the component{' '}
  <Value.Time label="Label text" value="14:30" inline /> This is after the
  component
</P>
`});function p(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||h(`Examples`,!1),f||h(`Examples.Inline`,!0),l||h(`Examples.LabelAndValue`,!0),d||h(`Examples.WithLocale`,!0),u||h(`Examples.WithSeconds`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`With seconds`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`With locale`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};