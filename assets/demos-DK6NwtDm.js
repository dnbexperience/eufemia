import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i}from"./index-CMgyXmp3.js";e();var a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group`,children:`<Radio.Group
  label="Radio Group"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
  value="first"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" />
</Radio.Group>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group-vertical`,children:`<Radio.Group
  label="Vertical Group"
  layoutDirection="column"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" checked />
</Radio.Group>
`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group-label-above`,children:`<Radio.Group
  vertical
  label="Vertical Group"
  layoutDirection="column"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" checked />
</Radio.Group>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group-status`,children:`<Radio.Group
  label="Radio Group with status"
  layoutDirection="column"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
>
  <Radio label="First" value="first" status="error" />
  <Radio label="Second" value="second" status="Error message" />
  <Radio
    label="Third"
    value="third"
    checked
    status="Info message"
    statusState="information"
  />
</Radio.Group>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group-plain`,children:`<FieldBlock
  label="Plain Radio group"
  layout="horizontal"
  labelHeight="small"
>
  <Radio
    value="first"
    label="First"
    group="MyRadioGroup"
    onChange={({ value, checked }) => {
      console.log('onChange', value, checked)
    }}
    right
  />
  <Radio
    value="second"
    label="Second"
    group="MyRadioGroup"
    onChange={({ value, checked }) => {
      console.log('onChange', value, checked)
    }}
    right
  />
  <Radio
    checked
    value="third"
    label="Third"
    group="MyRadioGroup"
    onChange={({ value, checked }) => {
      console.log('onChange', value, checked)
    }}
    right
  />
</FieldBlock>
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`radio-sizes`,children:`
<Radio size="medium" label="Medium" right="large" checked />
<Radio size="large" label="Large" checked />

`}),f=()=>(0,a.jsx)(n,{"data-visual-test":`radio-group-disabled`,children:`<Radio.Group
  label="Disabled Group"
  disabled
  labelPosition="left"
  name="MyGroup"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" checked />
</Radio.Group>
`}),p=()=>(0,a.jsx)(n,{children:`<Radio.Group label="With suffixes" labelPosition="left">
  <Radio label="First" value="first" />
  <Radio
    label="Second"
    value="second"
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />
  <Radio
    label="Third"
    value="third"
    status="Error message"
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    checked
  />
</Radio.Group>
`});function m(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n,{"data-visual-test":`radio-default`,children:`<Radio label="Single Radio" />
`}),(0,a.jsx)(n,{"data-visual-test":`radio-checked`,children:`<Radio
  label="Checked Radio"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`})]})}var h=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n,{"data-visual-test":`radio-error-unchecked`,children:`<Radio label="Unchecked" status="error" />
`}),(0,a.jsx)(n,{"data-visual-test":`radio-error-checked`,children:`<Radio label="Checked" status="error" checked />
`})]}),g=()=>(0,a.jsx)(_,{children:(0,a.jsx)(n,{"data-visual-test":`radio-bounding`,children:`<Radio label="Radio button" checked />
`})}),_=i.div`
  .dnb-radio__input {
    opacity: 0.5;
  }
`;function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||b(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Radio group`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Vertical aligned Radio group`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Radio group with label above`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Radio group with status messages`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Plain Radio group`}),`
`,(0,a.jsxs)(t.p,{children:[`Without `,(0,a.jsx)(t.code,{children:`<Radio.Group>`}),`. It is recommended to use the `,(0,a.jsx)(t.code,{children:`<Radio.Group>`}),` if you are using `,(0,a.jsx)(t.strong,{children:`React`}),`.`]}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,a.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,a.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled Radio Group`}),`
`,(0,a.jsxs)(t.p,{children:[`With `,(0,a.jsx)(t.code,{children:`labelPosition`}),` set to left.`]}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Radio Buttons with a suffix`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(h,{}),(0,a.jsx)(m,{}),(0,a.jsx)(g,{})]})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};