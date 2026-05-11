import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n,y as r}from"./index-DVm0MbGb.js";var i=e(),a=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group`,children:`<Radio.Group
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
`}),o=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group-vertical`,children:`<Radio.Group
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
`}),s=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group-label-above`,children:`<Radio.Group
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
`}),c=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group-status`,children:`<Radio.Group
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
`}),l=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group-plain`,children:`<FieldBlock
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
`}),u=()=>(0,i.jsx)(t,{"data-visual-test":`radio-sizes`,children:`
<Radio size="medium" label="Medium" right="large" checked />
<Radio size="large" label="Large" checked />

`}),d=()=>(0,i.jsx)(t,{"data-visual-test":`radio-group-disabled`,children:`<Radio.Group
  label="Disabled Group"
  disabled
  labelPosition="left"
  name="MyGroup"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" checked />
</Radio.Group>
`}),f=()=>(0,i.jsx)(t,{children:`<Radio.Group label="With suffixes" labelPosition="left">
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
`});function p(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t,{"data-visual-test":`radio-default`,children:`<Radio label="Single Radio" />
`}),(0,i.jsx)(t,{"data-visual-test":`radio-checked`,children:`<Radio
  label="Checked Radio"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`})]})}var m=()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t,{"data-visual-test":`radio-error-unchecked`,children:`<Radio label="Unchecked" status="error" />
`}),(0,i.jsx)(t,{"data-visual-test":`radio-error-checked`,children:`<Radio label="Checked" status="error" checked />
`})]}),h=()=>(0,i.jsx)(g,{children:(0,i.jsx)(t,{"data-visual-test":`radio-bounding`,children:`<Radio label="Radio button" checked />
`})}),g=r.div`
  .dnb-radio__input {
    opacity: 0.5;
  }
`;function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components},{VisibleWhenVisualTest:r}=t;return r||y(`VisibleWhenVisualTest`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Radio group`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Vertical aligned Radio group`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Radio group with label above`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Radio group with status messages`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`Plain Radio group`}),`
`,(0,i.jsxs)(t.p,{children:[`Without `,(0,i.jsx)(t.code,{children:`<Radio.Group>`}),`. It is recommended to use the `,(0,i.jsx)(t.code,{children:`<Radio.Group>`}),` if you are using `,(0,i.jsx)(t.strong,{children:`React`}),`.`]}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,i.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,i.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(t.h3,{children:`Disabled Radio Group`}),`
`,(0,i.jsxs)(t.p,{children:[`With `,(0,i.jsx)(t.code,{children:`labelPosition`}),` set to left.`]}),`
`,(0,i.jsx)(d,{}),`
`,(0,i.jsx)(t.h3,{children:`Radio Buttons with a suffix`}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsxs)(r,{children:[(0,i.jsx)(m,{}),(0,i.jsx)(p,{}),(0,i.jsx)(h,{})]})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};