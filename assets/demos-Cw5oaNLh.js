import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-geTEYZ7b.js";import{Rr as n}from"./index-CMgyXmp3.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-default`,children:`<ToggleButton label="Label" text="Toggle Me" />
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-checked`,children:`<ToggleButton
  label="Label"
  text="Checked ToggleButton"
  checked
  onChange={({ checked }) => {
    console.log('onChange', checked)
  }}
/>
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-group-default`,children:`<ToggleButton.Group
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
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-group-multiselect`,children:`<ToggleButton.Group
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
`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-group-vertical`,children:`<ToggleButton.Group
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
`}),l=()=>(0,r.jsx)(t,{children:`<ToggleButton.Group
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
`}),u=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-group-status`,children:`<ToggleButton.Group
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
`}),d=()=>(0,r.jsx)(t,{"data-visual-test":`toggle-button-group-disabled`,children:`<ToggleButton.Group
  label="Disabled Group"
  disabled
  value="first"
  variant="checkbox"
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton text="Third" value="third" checked />
</ToggleButton.Group>
`}),f=()=>(0,r.jsx)(t,{children:`<ToggleButton.Group
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
`}),p=()=>(0,r.jsx)(t,{children:`<ToggleButton.Group label="Icons only">
  <ToggleButton icon="bell" value="first" checked />
  <ToggleButton icon="loupe" value="second" />
  <ToggleButton icon="calendar" value="third" />
</ToggleButton.Group>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Unchecked ToggleButton`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Checked ToggleButton`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Default ToggleButton group`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Multi-select ToggleButton group`}),`
`,(0,r.jsx)(s,{}),`
`,(0,r.jsxs)(t.h3,{children:[`Vertical aligned ToggleButton group with `,(0,r.jsx)(t.code,{children:`checkbox`}),` variant and `,(0,r.jsx)(t.code,{children:`multiselect`})]}),`
`,(0,r.jsx)(c,{}),`
`,(0,r.jsxs)(t.h3,{children:[`ToggleButton group as `,(0,r.jsx)(t.code,{children:`multiselect`}),` with a status message`]}),`
`,(0,r.jsx)(l,{}),`
`,(0,r.jsxs)(t.h3,{children:[`ToggleButton with status messages and a group variant as `,(0,r.jsx)(t.code,{children:`radio`})]}),`
`,(0,r.jsx)(u,{}),`
`,(0,r.jsx)(t.h3,{children:`Disabled ToggleButton group`}),`
`,(0,r.jsx)(d,{}),`
`,(0,r.jsx)(t.h3,{children:`ToggleButtons with a suffix`}),`
`,(0,r.jsx)(f,{}),`
`,(0,r.jsx)(t.h3,{children:`ToggleButtons with icons only`}),`
`,(0,r.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(m,{...e})}):m(e)}export{h as default};