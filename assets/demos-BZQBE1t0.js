import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./FormLabel-DGaBW_Yl.js";import{s as i}from"./ToggleButton-BtQrsiHY.js";import{S as a,W as o}from"./index-D7e1avVt.js";import{t as s}from"./ComponentBox-CE7bpcJy.js";var c=e({Default:()=>u,Horizontal:()=>d,LinkedLabel:()=>p,NoForId:()=>f}),l=t(n()),u=()=>(0,l.jsx)(s,{"data-visual-test":`form-label-default`,stableName:`Default`,sourceImports:[`import { FormLabel, Checkbox, Switch } from '@dnb/eufemia'`],__buildScope:{FormLabel:r,Checkbox:i},children:`
<FormLabel forId="alone-1">Default vertical FormLabel</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />

`}),d=()=>(0,l.jsx)(s,{"data-visual-test":`form-label-horizontal`,stableName:`Horizontal`,sourceImports:[`import { FormLabel, Checkbox, Switch } from '@dnb/eufemia'`],__buildScope:{FormLabel:r,Checkbox:i},children:`
<FormLabel forId="alone-2" vertical={false}>
  Horizontal FormLabel
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />

`}),f=()=>(0,l.jsx)(s,{stableName:`NoForId`,sourceImports:[`import { FormLabel, Checkbox, Switch } from '@dnb/eufemia'`],__buildScope:{FormLabel:r,Checkbox:i},children:`
<FormLabel element="span">Without forId (select me)</FormLabel>
<Checkbox label="Checkbox" />

`}),p=()=>(0,l.jsx)(s,{stableName:`LinkedLabel`,sourceImports:[`import { FormLabel, Checkbox, Switch } from '@dnb/eufemia'`],__buildScope:{FormLabel:r,Switch:a},children:`<form>
  <div>
    <div>
      <FormLabel forId="switch-1" text="Form Label (click me):" />
    </div>
    <div>
      <Switch id="switch-1" value="Value of switch" />
    </div>
  </div>
</form>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,...o(),...e.components};return c||g(`Examples`,!1),u||g(`Examples.Default`,!0),d||g(`Examples.Horizontal`,!0),p||g(`Examples.LinkedLabel`,!0),f||g(`Examples.NoForId`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Default form-label`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Horizontal form-label`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Form-label without a `,(0,l.jsx)(t.code,{children:`forId`})]}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Linked label (pattern)`}),`
`,(0,l.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};