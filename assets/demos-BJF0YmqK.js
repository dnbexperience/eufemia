import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-default`,stableName:`ToggleButtonUnchecked`,children:`<ToggleButton label="Label" text="Toggle Me" />
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-checked`,stableName:`ToggleButtonChecked`,children:`<ToggleButton
  label="Label"
  text="Checked ToggleButton"
  checked
  onChange={({ checked }) => {
    console.log('onChange', checked)
  }}
/>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-group-default`,stableName:`ToggleButtonDefault`,children:`<ToggleButton.Group
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-group-multiselect`,stableName:`ToggleButtonMultiselect`,children:`<ToggleButton.Group
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
`}),l=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-group-vertical`,stableName:`ToggleButtonVertical`,children:`<ToggleButton.Group
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
`}),u=()=>(0,i.jsx)(n,{stableName:`ToggleButtonStatus`,children:`<ToggleButton.Group
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
`}),d=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-group-status`,stableName:`ToggleButtonStatusMessages`,children:`<ToggleButton.Group
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
`}),f=()=>(0,i.jsx)(n,{"data-visual-test":`toggle-button-group-disabled`,stableName:`ToggleButtonDisabledGroup`,children:`<ToggleButton.Group
  label="Disabled Group"
  disabled
  value="first"
  variant="checkbox"
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" checked />
</ToggleButton.Group>
`}),p=()=>(0,i.jsx)(n,{stableName:`ToggleButtonSuffix`,children:`<ToggleButton.Group
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
`}),m=()=>(0,i.jsx)(n,{stableName:`ToggleButtonIconOnly`,children:`<ToggleButton.Group label="Icons only">
  <ToggleButton icon="bell" value="first" checked />
  <ToggleButton icon="loupe" value="second" />
  <ToggleButton icon="calendar" value="third" />
</ToggleButton.Group>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Unchecked ToggleButton`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Checked ToggleButton`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Default ToggleButton group`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Multi-select ToggleButton group`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsxs)(t.h3,{children:[`Vertical aligned ToggleButton group with `,(0,i.jsx)(t.code,{children:`checkbox`}),` variant and `,(0,i.jsx)(t.code,{children:`multiselect`})]}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsxs)(t.h3,{children:[`ToggleButton group as `,(0,i.jsx)(t.code,{children:`multiselect`}),` with a status message`]}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsxs)(t.h3,{children:[`ToggleButton with status messages and a group variant as `,(0,i.jsx)(t.code,{children:`radio`})]}),`
`,(0,i.jsx)(d,{}),`
`,(0,i.jsx)(t.h3,{children:`Disabled ToggleButton group`}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsx)(t.h3,{children:`ToggleButtons with a suffix`}),`
`,(0,i.jsx)(p,{}),`
`,(0,i.jsx)(t.h3,{children:`ToggleButtons with icons only`}),`
`,(0,i.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}export{g as default};