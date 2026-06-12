import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{a as n,t as r}from"./HelpButton-B8IG5rB3.js";import{r as i}from"./ToggleButton-T4E3Coih.js";import{a}from"./Selection-5ph0VyAS.js";import{K as o,m as s}from"./index-CsG353ar.js";import{t as c}from"./ComponentBox-Cb1rLw_D.js";var l=e(t()),u=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group`,stableName:`RadioExampleDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio.Group
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
`}),d=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group-vertical`,stableName:`RadioExampleVerticalGroup`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio.Group
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
`}),f=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group-label-above`,stableName:`RadioExampleLabelAbove`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio.Group
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
`}),p=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group-status`,stableName:`RadioExampleGroupStatus`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio.Group
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
`}),m=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group-plain`,stableName:`RadioExampleWithoutGroup`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:a,Radio:i},children:`<FieldBlock
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
`}),h=()=>(0,l.jsx)(c,{"data-visual-test":`radio-sizes`,stableName:`RadioExampleSizes`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`
<Radio size="medium" label="Medium" right="large" checked />
<Radio size="large" label="Large" checked />

`}),g=()=>(0,l.jsx)(c,{"data-visual-test":`radio-group-disabled`,stableName:`RadioExampleDisabled`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio.Group
  label="Disabled Group"
  disabled
  labelPosition="left"
  name="MyGroup"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio label="Third" value="third" checked />
</Radio.Group>
`}),_=()=>(0,l.jsx)(c,{stableName:`RadioExampleSuffix`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i,HelpButton:r,Modal:n},children:`<Radio.Group label="With suffixes" labelPosition="left">
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
`});function v(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{"data-visual-test":`radio-default`,stableName:`RadioVisibleWhenVisualTests`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio label="Single Radio" />
`}),(0,l.jsx)(c,{"data-visual-test":`radio-checked`,stableName:`RadioVisibleWhenVisualTests_2`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio
  label="Checked Radio"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`})]})}var y=()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{"data-visual-test":`radio-error-unchecked`,stableName:`RadioExampleError`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio label="Unchecked" status="error" />
`}),(0,l.jsx)(c,{"data-visual-test":`radio-error-checked`,stableName:`RadioExampleError_2`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio label="Checked" status="error" checked />
`})]}),b=()=>(0,l.jsx)(x,{children:(0,l.jsx)(c,{"data-visual-test":`radio-bounding`,stableName:`RadioBoundingArea`,sourceImports:[`import styled from '@emotion/styled'`,`import { Radio, HelpButton } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Radio:i},children:`<Radio label="Radio button" checked />
`})}),x=s.div`
  .dnb-radio__input {
    opacity: 0.5;
  }
`;function S(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return n||w(`VisibleWhenVisualTest`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Radio group`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Vertical aligned Radio group`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Radio group with label above`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Radio group with status messages`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Plain Radio group`}),`
`,(0,l.jsxs)(t.p,{children:[`Without `,(0,l.jsx)(t.code,{children:`<Radio.Group>`}),`. It is recommended to use the `,(0,l.jsx)(t.code,{children:`<Radio.Group>`}),` if you are using `,(0,l.jsx)(t.strong,{children:`React`}),`.`]}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,l.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,l.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,l.jsx)(h,{}),`
`,(0,l.jsx)(t.h3,{children:`Disabled Radio Group`}),`
`,(0,l.jsxs)(t.p,{children:[`With `,(0,l.jsx)(t.code,{children:`labelPosition`}),` set to left.`]}),`
`,(0,l.jsx)(g,{}),`
`,(0,l.jsx)(t.h3,{children:`Radio Buttons with a suffix`}),`
`,(0,l.jsx)(_,{}),`
`,(0,l.jsxs)(n,{children:[(0,l.jsx)(y,{}),(0,l.jsx)(v,{}),(0,l.jsx)(b,{})]})]})}function C(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};