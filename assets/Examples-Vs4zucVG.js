import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{t as i}from"./Value-C2hl5_67.js";import{t as a}from"./ComponentBox-CE7bpcJy.js";var o=e({Empty:()=>c,Inline:()=>p,Label:()=>d,LabelAndValue:()=>f,Placeholder:()=>l,WithHelp:()=>m,WithValue:()=>u}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String showEmpty />
`}),l=()=>(0,s.jsx)(a,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String placeholder="The value was not filled in" />
`}),u=()=>(0,s.jsx)(a,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String value="Text value" />
`}),d=()=>(0,s.jsx)(a,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String label="Label text" showEmpty />
`}),f=()=>(0,s.jsx)(a,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String label="Label text" value="Text value" />
`}),p=()=>(0,s.jsx)(a,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component <Value.String value="Text value" inline />{' '}
  This is after the component
</P>
`}),m=()=>(0,s.jsx)(a,{stableName:`WithHelp`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.String
  label="Label text"
  value="Value text"
  help={{
    title: 'Help title',
    content: 'Help content.',
  }}
/>
`});export{f as a,u as c,d as i,o as n,l as o,p as r,m as s,c as t};