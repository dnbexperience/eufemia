import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Default:()=>s,Horizontal:()=>c,LinkedLabel:()=>u,NoForId:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`form-label-default`,stableName:`Default`,children:`
<FormLabel forId="alone-1">Default vertical FormLabel</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />

`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`form-label-horizontal`,stableName:`Horizontal`,children:`
<FormLabel forId="alone-2" vertical={false}>
  Horizontal FormLabel
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />

`}),l=()=>(0,o.jsx)(r,{stableName:`NoForId`,children:`
<FormLabel element="span">Without forId (select me)</FormLabel>
<Checkbox label="Checkbox" />

`}),u=()=>(0,o.jsx)(r,{stableName:`LinkedLabel`,children:`<form>
  <div>
    <div>
      <FormLabel forId="switch-1" text="Form Label (click me):" />
    </div>
    <div>
      <Switch id="switch-1" value="Value of switch" />
    </div>
  </div>
</form>
`});function d(e){let t={code:`code`,h2:`h2`,h3:`h3`,...i(),...e.components};return a||p(`Examples`,!1),s||p(`Examples.Default`,!0),c||p(`Examples.Horizontal`,!0),u||p(`Examples.LinkedLabel`,!0),l||p(`Examples.NoForId`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Default form-label`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal form-label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Form-label without a `,(0,o.jsx)(t.code,{children:`forId`})]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Linked label (pattern)`}),`
`,(0,o.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};