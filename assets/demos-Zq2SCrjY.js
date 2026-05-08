import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({Default:()=>o,Horizontal:()=>s,LinkedLabel:()=>l,NoForId:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`form-label-default`,children:`
<FormLabel forId="alone-1">Default vertical FormLabel</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />

`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`form-label-horizontal`,children:`
<FormLabel forId="alone-2" vertical={false}>
  Horizontal FormLabel
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />

`}),c=()=>(0,a.jsx)(n,{children:`
<FormLabel element="span">Without forId (select me)</FormLabel>
<Checkbox label="Checkbox" />

`}),l=()=>(0,a.jsx)(n,{children:`<form>
  <div>
    <div>
      <FormLabel forId="switch-1" text="Form Label (click me):" />
    </div>
    <div>
      <Switch id="switch-1" value="Value of switch" />
    </div>
  </div>
</form>
`});function u(e){let t={code:`code`,h2:`h2`,h3:`h3`,...r(),...e.components};return i||f(`Examples`,!1),o||f(`Examples.Default`,!0),s||f(`Examples.Horizontal`,!0),l||f(`Examples.LinkedLabel`,!0),c||f(`Examples.NoForId`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default form-label`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Horizontal form-label`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Form-label without a `,(0,a.jsx)(t.code,{children:`forId`})]}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Linked label (pattern)`}),`
`,(0,a.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};