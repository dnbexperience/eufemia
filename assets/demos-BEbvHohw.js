import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{a as n,t as r}from"./HelpButton-C7xeEDxM.js";import{K as i,S as a}from"./index-ppRu2ktv.js";import{t as o}from"./ComponentBox-R2c6Bo76.js";var s=e(t()),c=()=>(0,s.jsx)(o,{"data-visual-test":`switch-default`,stableName:`SwitchExampleDefault`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a},children:`<Switch label="Switch" onChange={console.log} />
`}),l=()=>(0,s.jsx)(o,{"data-visual-test":`switch-checked`,stableName:`SwitchExampleChecked`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a},children:`<Switch
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),u=()=>(0,s.jsx)(o,{"data-visual-test":`switch-error`,stableName:`SwitchExampleErrorMessage`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a},children:`<Switch label="Switch" checked status="Error message" />
`}),d=()=>(0,s.jsx)(o,{stableName:`SwitchExampleSuffix`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a,HelpButton:r,Modal:n},children:`<Switch
  label="Switch"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),f=()=>(0,s.jsx)(o,{"data-visual-test":`switch-sizes`,stableName:`SwitchExampleSizes`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a},children:`
<Switch size="medium" label="Medium" right="large" checked />
<Switch size="large" label="Large" right="large" checked />
<Switch size="large" label="Large" />

`}),p=()=>(0,s.jsx)(o,{"data-visual-test":`switch-disabled`,stableName:`SwitchExampleDisabled`,sourceImports:[`import { Switch, HelpButton } from '@dnb/eufemia'`],__buildScope:{Switch:a},children:`<Switch checked disabled label="Disabled" />
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Unchecked Switch`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Checked Switch`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Checked Switch with error message`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Switch with suffix`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Switch in different sizes`}),`
`,(0,s.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,s.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Switch in disabled state`}),`
`,(0,s.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}export{h as default};