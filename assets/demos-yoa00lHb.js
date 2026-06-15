import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-C9wBv35m.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Value-OsZalonW.js";import{K as o}from"./index-ppRu2ktv.js";import{t as s}from"./ComponentBox-R2c6Bo76.js";var c=e({Empty:()=>u,Inline:()=>h,InternationalSuffix:()=>g,Label:()=>p,LabelAndValue:()=>m,Placeholder:()=>d,WithValue:()=>f}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`Empty`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PhoneNumber showEmpty />
`}),d=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PhoneNumber placeholder="The value was not filled in" />
`}),f=()=>(0,l.jsx)(s,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PhoneNumber value="+4798712345" />
`}),p=()=>(0,l.jsx)(s,{stableName:`Label`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PhoneNumber label="Label text" showEmpty />
`}),m=()=>(0,l.jsx)(s,{stableName:`LabelAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.PhoneNumber label="Label text" value="+4798712345" />
`}),h=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:a},children:`<P>
  This is before the component{' '}
  <Value.PhoneNumber value="98712345" inline /> This is after the component
</P>
`}),g=()=>(0,l.jsx)(s,{stableName:`InternationalSuffix`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:i,Value:a},children:`<Flex.Stack>
  <Value.PhoneNumber label="Label text" value="+4798712345" />
  <Value.PhoneNumber label="Label text" value="+8860998472751" />
  <Value.PhoneNumber label="Label text" value="+18686758288" />
</Flex.Stack>
`});function _(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||y(`Examples`,!1),u||y(`Examples.Empty`,!0),h||y(`Examples.Inline`,!0),g||y(`Examples.InternationalSuffix`,!0),p||y(`Examples.Label`,!0),m||y(`Examples.LabelAndValue`,!0),d||y(`Examples.Placeholder`,!0),f||y(`Examples.WithValue`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Empty`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Value`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Label`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Label and value`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(h,{}),`
`,(0,l.jsx)(t.h3,{children:`International Suffix`}),`
`,(0,l.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};