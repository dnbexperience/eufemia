import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({BooleanValueOff:()=>h,BooleanValueOn:()=>m,Disabled:()=>u,Info:()=>d,NumberValueOff:()=>_,NumberValueOn:()=>g,TextOff:()=>l,TextOn:()=>c,ValueOff:()=>s,ValueOn:()=>o,VariantButton:()=>y,VariantButtons:()=>x,VariantButtonsWithHelp:()=>S,VariantButtonsWithoutLabel:()=>C,VariantCheckboxButton:()=>b,VariantRadio:()=>w,VariantRadioWithHelp:()=>T,VariantRadioWithoutLabel:()=>E,VariantSwitch:()=>v,Warning:()=>f,WithError:()=>p}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  value="checked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  value="unchecked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  textOn="Text on"
  textOff="Text off"
  variant="checkbox"
  value="checked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  textOn="Text on"
  textOff="Text off"
  variant="checkbox"
  value="unchecked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="Useful information (?)"
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn={true}
  valueOff={false}
  variant="checkbox"
  label="Boolean value"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn={true}
  valueOff={false}
  variant="checkbox"
  label="Boolean value"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn={100}
  valueOff={0}
  variant="checkbox"
  label="Number value"
  value={100}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn={100}
  valueOff={0}
  variant="checkbox"
  label="Number value"
  value={0}
  onChange={(value) => console.log('onChange', value)}
/>
`}),v=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="switch"
  label="Switch variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),y=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="button"
  label="Toggle button variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),b=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="checkbox-button"
  label="Toggle checkbox variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),x=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  label="Buttons variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),S=()=>(0,a.jsx)(n,{"data-visual-test":`toggle-variant-buttons-with-help`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  label="Buttons variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),C=()=>(0,a.jsx)(n,{"data-visual-test":`toggle-variant-buttons-without-label`,children:`
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>

`}),w=()=>(0,a.jsx)(n,{children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  label="Radio variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),T=()=>(0,a.jsx)(n,{"data-visual-test":`toggle-variant-radio-with-help`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  label="Radio variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),E=()=>(0,a.jsx)(n,{"data-visual-test":`toggle-variant-radio-without-label`,children:`
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>

`});function D(e){let t={h2:`h2`,h3:`h3`,h4:`h4`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||k(`Examples`,!1),h||k(`Examples.BooleanValueOff`,!0),m||k(`Examples.BooleanValueOn`,!0),u||k(`Examples.Disabled`,!0),d||k(`Examples.Info`,!0),_||k(`Examples.NumberValueOff`,!0),g||k(`Examples.NumberValueOn`,!0),l||k(`Examples.TextOff`,!0),c||k(`Examples.TextOn`,!0),s||k(`Examples.ValueOff`,!0),o||k(`Examples.ValueOn`,!0),y||k(`Examples.VariantButton`,!0),x||k(`Examples.VariantButtons`,!0),S||k(`Examples.VariantButtonsWithHelp`,!0),C||k(`Examples.VariantButtonsWithoutLabel`,!0),b||k(`Examples.VariantCheckboxButton`,!0),w||k(`Examples.VariantRadio`,!0),T||k(`Examples.VariantRadioWithHelp`,!0),E||k(`Examples.VariantRadioWithoutLabel`,!0),v||k(`Examples.VariantSwitch`,!0),f||k(`Examples.Warning`,!0),p||k(`Examples.WithError`,!0),n||k(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Value On`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Value Off`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Text On`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Text Off`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Info`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Warning`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Value types`}),`
`,(0,a.jsx)(t.h4,{children:`Boolean value - On state`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h4,{children:`Boolean value - Off state`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h4,{children:`Number value - On state`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h4,{children:`Number value - Off state`}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(t.h3,{children:`Variants`}),`
`,(0,a.jsx)(t.h4,{children:`Switch`}),`
`,(0,a.jsx)(v,{}),`
`,(0,a.jsx)(t.h4,{children:`Button`}),`
`,(0,a.jsx)(y,{}),`
`,(0,a.jsx)(t.h4,{children:`Buttons`}),`
`,(0,a.jsx)(x,{}),`
`,(0,a.jsx)(t.h4,{children:`Buttons with help`}),`
`,(0,a.jsx)(S,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio`}),`
`,(0,a.jsx)(w,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio with help`}),`
`,(0,a.jsx)(T,{}),`
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(C,{}),(0,a.jsx)(E,{})]}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox button`}),`
`,(0,a.jsx)(b,{})]})}function O(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};