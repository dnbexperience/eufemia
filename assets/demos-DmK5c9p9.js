import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`switch-default`,stableName:`SwitchExampleDefault`,children:`<Switch label="Switch" onChange={console.log} />
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`switch-checked`,stableName:`SwitchExampleChecked`,children:`<Switch
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`switch-error`,stableName:`SwitchExampleErrorMessage`,children:`<Switch label="Switch" checked status="Error message" />
`}),c=()=>(0,i.jsx)(n,{stableName:`SwitchExampleSuffix`,children:`<Switch
  label="Switch"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`switch-sizes`,stableName:`SwitchExampleSizes`,children:`
<Switch size="medium" label="Medium" right="large" checked />
<Switch size="large" label="Large" right="large" checked />
<Switch size="large" label="Large" />

`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`switch-disabled`,stableName:`SwitchExampleDisabled`,children:`<Switch checked disabled label="Disabled" />
`});function d(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Unchecked Switch`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Checked Switch`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Checked Switch with error message`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Switch with suffix`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`Switch in different sizes`}),`
`,(0,i.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,i.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h3,{children:`Switch in disabled state`}),`
`,(0,i.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}export{f as default};