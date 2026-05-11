import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n}from"./index-DVm0MbGb.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`switch-default`,children:`<Switch label="Switch" onChange={console.log} />
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`switch-checked`,children:`<Switch
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`switch-error`,children:`<Switch label="Switch" checked status="Error message" />
`}),s=()=>(0,r.jsx)(t,{children:`<Switch
  label="Switch"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`switch-sizes`,children:`
<Switch size="medium" label="Medium" right="large" checked />
<Switch size="large" label="Large" right="large" checked />
<Switch size="large" label="Large" />

`}),l=()=>(0,r.jsx)(t,{"data-visual-test":`switch-disabled`,children:`<Switch checked disabled label="Disabled" />
`});function u(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Unchecked Switch`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Checked Switch`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Checked Switch with error message`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Switch with suffix`}),`
`,(0,r.jsx)(s,{}),`
`,(0,r.jsx)(t.h3,{children:`Switch in different sizes`}),`
`,(0,r.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,r.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,r.jsx)(c,{}),`
`,(0,r.jsx)(t.h3,{children:`Switch in disabled state`}),`
`,(0,r.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}export{d as default};