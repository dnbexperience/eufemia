import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./ToggleButton-DoxBGtHF.js";import{t as r}from"./Button-QIkiaQEp.js";import{s as i}from"./Table-D3iIoHmL.js";import{B as a}from"./index-DdG6L_K8.js";import{t as o}from"./ComponentBox-q_23Ylzi.js";var s=e(t()),c=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-default`,stableName:`ToggleButtonUnchecked`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton label="Label" text="Toggle Me" />
`}),l=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-checked`,stableName:`ToggleButtonChecked`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton
  label="Label"
  text="Checked ToggleButton"
  checked
  onChange={({ checked }) => {
    console.log('onChange', checked)
  }}
/>
`}),u=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-group-default`,stableName:`ToggleButtonDefault`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="ToggleButton Group"
  value="first"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" />
</ToggleButton.Group>
`}),d=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-group-multiselect`,stableName:`ToggleButtonMultiselect`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="Multi-select"
  multiselect={true}
  values={['first', 'third']}
  onChange={({ values }) => {
    console.log('onChange', values)
  }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" />
</ToggleButton.Group>
`}),f=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-group-vertical`,stableName:`ToggleButtonVertical`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="Vertical Group"
  layoutDirection="column"
  multiselect={true}
  variant="checkbox"
  onChange={({ values }) => {
    console.log('onChange', values)
  }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" checked />
</ToggleButton.Group>
`}),p=()=>(0,s.jsx)(o,{stableName:`ToggleButtonStatus`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="ToggleButton Group with status"
  status="Error message"
  multiselect={true}
  onChange={({ values }) => {
    console.log('onChange', values)
  }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" checked />
  <ToggleButton text="Third" value="third" checked={true} />
</ToggleButton.Group>
`}),m=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-group-status`,stableName:`ToggleButtonStatusMessages`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="ToggleButtons with status"
  variant="radio"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
>
  <ToggleButton text="First" value="first" status="error" />
  <ToggleButton
    text="Second"
    value="second"
    checked
    status="Error message"
  />
  <ToggleButton
    text="Third"
    value="third"
    status="Info message"
    statusState="information"
  />
</ToggleButton.Group>
`}),h=()=>(0,s.jsx)(o,{"data-visual-test":`toggle-button-group-disabled`,stableName:`ToggleButtonDisabledGroup`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group
  label="Disabled Group"
  disabled
  value="first"
  variant="checkbox"
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" checked />
</ToggleButton.Group>
`}),g=()=>(0,s.jsx)(o,{stableName:`ToggleButtonSuffix`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n,HelpButton:i,Button:r},children:`<ToggleButton.Group
  label="With suffixes"
  suffix={<HelpButton title="Group suffix">Group suffix</HelpButton>}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton
    text="Second"
    value="second"
    status="Error message"
    suffix={<HelpButton title="Button suffix">Button suffix</HelpButton>}
  />
  <ToggleButton text="Third" value="third" checked />
</ToggleButton.Group>
`}),_=()=>(0,s.jsx)(o,{stableName:`ToggleButtonIconOnly`,sourceImports:[`import { ToggleButton, HelpButton } from '@dnb/eufemia'`],__buildScope:{ToggleButton:n},children:`<ToggleButton.Group label="Icons only">
  <ToggleButton icon="bell" value="first" checked />
  <ToggleButton icon="loupe" value="second" />
  <ToggleButton icon="calendar" value="third" />
</ToggleButton.Group>
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,...a(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Unchecked ToggleButton`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Checked ToggleButton`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Default ToggleButton group`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Multi-select ToggleButton group`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Vertical aligned ToggleButton group with `,(0,s.jsx)(t.code,{children:`checkbox`}),` variant and `,(0,s.jsx)(t.code,{children:`multiselect`})]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsxs)(t.h3,{children:[`ToggleButton group as `,(0,s.jsx)(t.code,{children:`multiselect`}),` with a status message`]}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsxs)(t.h3,{children:[`ToggleButton with status messages and a group variant as `,(0,s.jsx)(t.code,{children:`radio`})]}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled ToggleButton group`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`ToggleButtons with a suffix`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`ToggleButtons with icons only`}),`
`,(0,s.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(v,{...e})}):v(e)}export{y as default};