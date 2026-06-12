import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{a as n,t as r}from"./HelpButton-B8IG5rB3.js";import{s as i}from"./ToggleButton-T4E3Coih.js";import{K as a,m as o}from"./index-CsG353ar.js";import{t as s}from"./ComponentBox-Cb1rLw_D.js";var c=e(t()),l=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-default`,stableName:`CheckboxUnchecked`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checkbox" onChange={(e) => console.log(e)} />
`}),u=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-checked`,stableName:`CheckboxChecked`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),d=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-error`,stableName:`CheckboxWithError`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checkbox" checked status="Error message" />
`}),f=()=>(0,c.jsx)(s,{stableName:`CheckboxSuffix`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i,HelpButton:r,Modal:n},children:`<Checkbox
  label="Checkbox"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),p=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-sizes`,stableName:`CheckboxDifferentSizes`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />

`}),m=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-disabled`,stableName:`CheckboxDisabled`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox checked disabled />
`}),h=()=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s,{"data-visual-test":`checkbox-error-unchecked`,stableName:`CheckboxWithErrorStates`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Unchecked" status="error" />
`}),(0,c.jsx)(s,{"data-visual-test":`checkbox-error-checked`,stableName:`CheckboxWithErrorStates_2`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checked" status="error" checked />
`})]}),g=()=>(0,c.jsx)(b,{children:(0,c.jsx)(s,{"data-visual-test":`checkbox-bounding`,stableName:`CheckboxBoundingArea`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checkbox" checked />
`})}),_=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-indeterminate`,stableName:`CheckboxIndeterminate`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checkbox" indeterminate />
`}),v=()=>(0,c.jsx)(s,{"data-visual-test":`checkbox-indeterminate-large`,stableName:`CheckboxIndeterminateLarge`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox label="Checkbox" indeterminate size="large" />
`}),y=()=>(0,c.jsx)(s,{stableName:`CheckboxPreventDefault`,sourceImports:[`import styled from '@emotion/styled'`,`import { Checkbox, HelpButton } from '@dnb/eufemia'`],__buildScope:{Checkbox:i},children:`<Checkbox
  label="Checkbox"
  onClick={(event) => {
    event.preventDefault()
  }}
  onChange={({ checked }) => console.log('onChange', checked)}
/>
`}),b=o.div`
  .dnb-checkbox__input {
    opacity: 0.5;
  }
`;function x(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return n||C(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Unchecked Checkbox (default state)`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Checked Checkbox, left label position`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Checked Checkbox with error message`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Checkbox with suffix`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,c.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,c.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Prevent changing the state of the checkbox`}),`
`,(0,c.jsxs)(t.p,{children:[`You can prevent the state of the checkbox from changing by calling `,(0,c.jsx)(t.code,{children:`preventDefault`}),` on the `,(0,c.jsx)(t.code,{children:`onClick`}),` event.`]}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsx)(t.h3,{children:`Disabled checkbox`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,c.jsx)(t.p,{children:`The checkbox offers a fully controlled indeterminate state.`}),`
`,(0,c.jsxs)(t.p,{children:[`Here is an indeterminate state `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate`,children:`working example`}),`.`]}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsxs)(n,{children:[(0,c.jsx)(h,{}),(0,c.jsx)(g,{})]})]})}function S(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};