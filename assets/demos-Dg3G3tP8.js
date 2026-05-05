import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i}from"./index-CMgyXmp3.js";e();var a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-default`,children:`<Checkbox label="Checkbox" onChange={(e) => console.log(e)} />
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-checked`,children:`<Checkbox
  label="Label"
  labelPosition="left"
  checked
  onChange={({ checked }) => console.log(checked)}
/>
`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-error`,children:`<Checkbox label="Checkbox" checked status="Error message" />
`}),l=()=>(0,a.jsx)(n,{children:`<Checkbox
  label="Checkbox"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-sizes`,children:`
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />

`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-disabled`,children:`<Checkbox checked disabled />
`}),f=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n,{"data-visual-test":`checkbox-error-unchecked`,children:`<Checkbox label="Unchecked" status="error" />
`}),(0,a.jsx)(n,{"data-visual-test":`checkbox-error-checked`,children:`<Checkbox label="Checked" status="error" checked />
`})]}),p=()=>(0,a.jsx)(_,{children:(0,a.jsx)(n,{"data-visual-test":`checkbox-bounding`,children:`<Checkbox label="Checkbox" checked />
`})}),m=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-indeterminate`,children:`<Checkbox label="Checkbox" indeterminate />
`}),h=()=>(0,a.jsx)(n,{"data-visual-test":`checkbox-indeterminate-large`,children:`<Checkbox label="Checkbox" indeterminate size="large" />
`}),g=()=>(0,a.jsx)(n,{children:`<Checkbox
  label="Checkbox"
  onClick={(event) => {
    event.preventDefault()
  }}
  onChange={({ checked }) => console.log('onChange', checked)}
/>
`}),_=i.div`
  .dnb-checkbox__input {
    opacity: 0.5;
  }
`;function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||b(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Unchecked Checkbox (default state)`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Checked Checkbox, left label position`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Checked Checkbox with error message`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Checkbox with suffix`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`With different sizes`}),`
`,(0,a.jsxs)(t.p,{children:[`As for now, there are two sizes. `,(0,a.jsx)(t.code,{children:`medium`}),` is the default size.`]}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Prevent changing the state of the checkbox`}),`
`,(0,a.jsxs)(t.p,{children:[`You can prevent the state of the checkbox from changing by calling `,(0,a.jsx)(t.code,{children:`preventDefault`}),` on the `,(0,a.jsx)(t.code,{children:`onClick`}),` event.`]}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled checkbox`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,a.jsx)(t.p,{children:`The checkbox offers a fully controlled indeterminate state.`}),`
`,(0,a.jsxs)(t.p,{children:[`Here is an indeterminate state `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate`,children:`working example`}),`.`]}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(f,{}),(0,a.jsx)(p,{})]})]})}function y(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};