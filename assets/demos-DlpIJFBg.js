import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n,y as r}from"./index-DVm0MbGb.js";var i=e(),a=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-default`,children:`<Checkbox label="Checkbox" onChange={(e) => console.log(e)} />
`}),o=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-checked`,children:`<Checkbox
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),s=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-error`,children:`<Checkbox label="Checkbox" checked status="Error message" />
`}),c=()=>(0,i.jsx)(t,{children:`<Checkbox
  label="Checkbox"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),l=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-sizes`,children:`
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />

`}),u=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-disabled`,children:`<Checkbox checked disabled />
`}),d=()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t,{"data-visual-test":`checkbox-error-unchecked`,children:`<Checkbox label="Unchecked" status="error" />
`}),(0,i.jsx)(t,{"data-visual-test":`checkbox-error-checked`,children:`<Checkbox label="Checked" status="error" checked />
`})]}),f=()=>(0,i.jsx)(g,{children:(0,i.jsx)(t,{"data-visual-test":`checkbox-bounding`,children:`<Checkbox label="Checkbox" checked />
`})}),p=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-indeterminate`,children:`<Checkbox label="Checkbox" indeterminate />
`}),m=()=>(0,i.jsx)(t,{"data-visual-test":`checkbox-indeterminate-large`,children:`<Checkbox label="Checkbox" indeterminate size="large" />
`}),h=()=>(0,i.jsx)(t,{children:`<Checkbox
  label="Checkbox"
  onClick={(event) => {
    event.preventDefault()
  }}
  onChange={({ checked }) => console.log('onChange', checked)}
/>
`}),g=r.div`
  .dnb-checkbox__input {
    opacity: 0.5;
  }
`;function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components},{VisibleWhenVisualTest:r}=t;return r||y(`VisibleWhenVisualTest`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Unchecked Checkbox (default state)`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Checked Checkbox, left label position`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Checked Checkbox with error message`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Checkbox with suffix`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,i.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,i.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h3,{children:`Prevent changing the state of the checkbox`}),`
`,(0,i.jsxs)(t.p,{children:[`You can prevent the state of the checkbox from changing by calling `,(0,i.jsx)(t.code,{children:`preventDefault`}),` on the `,(0,i.jsx)(t.code,{children:`onClick`}),` event.`]}),`
`,(0,i.jsx)(h,{}),`
`,(0,i.jsx)(t.h3,{children:`Disabled checkbox`}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,i.jsx)(t.p,{children:`The checkbox offers a fully controlled indeterminate state.`}),`
`,(0,i.jsxs)(t.p,{children:[`Here is an indeterminate state `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate`,children:`working example`}),`.`]}),`
`,(0,i.jsx)(p,{}),`
`,(0,i.jsx)(m,{}),`
`,(0,i.jsxs)(r,{children:[(0,i.jsx)(d,{}),(0,i.jsx)(f,{})]})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};