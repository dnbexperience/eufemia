import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BooleanValueOff:()=>g,BooleanValueOn:()=>h,Disabled:()=>d,Info:()=>f,NumberValueOff:()=>v,NumberValueOn:()=>_,TextOff:()=>u,TextOn:()=>l,ValueOff:()=>c,ValueOn:()=>s,VariantButton:()=>b,VariantButtons:()=>S,VariantButtonsWithHelp:()=>C,VariantButtonsWithoutLabel:()=>w,VariantCheckboxButton:()=>x,VariantRadio:()=>T,VariantRadioWithHelp:()=>E,VariantRadioWithoutLabel:()=>D,VariantSwitch:()=>y,Warning:()=>p,WithError:()=>m}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`ValueOn`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  value="checked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`ValueOff`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  value="unchecked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`TextOn`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  textOn="Text on"
  textOff="Text off"
  variant="checkbox"
  value="checked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`TextOff`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  textOn="Text on"
  textOff="Text off"
  variant="checkbox"
  value="unchecked"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`Info`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="Useful information (?)"
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`Warning`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.Toggle
  valueOn="checked"
  valueOff="unchecked"
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`BooleanValueOn`,children:`<Field.Toggle
  valueOn={true}
  valueOff={false}
  variant="checkbox"
  label="Boolean value"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`BooleanValueOff`,children:`<Field.Toggle
  valueOn={true}
  valueOff={false}
  variant="checkbox"
  label="Boolean value"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,o.jsx)(r,{stableName:`NumberValueOn`,children:`<Field.Toggle
  valueOn={100}
  valueOff={0}
  variant="checkbox"
  label="Number value"
  value={100}
  onChange={(value) => console.log('onChange', value)}
/>
`}),v=()=>(0,o.jsx)(r,{stableName:`NumberValueOff`,children:`<Field.Toggle
  valueOn={100}
  valueOff={0}
  variant="checkbox"
  label="Number value"
  value={0}
  onChange={(value) => console.log('onChange', value)}
/>
`}),y=()=>(0,o.jsx)(r,{stableName:`VariantSwitch`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="switch"
  label="Switch variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),b=()=>(0,o.jsx)(r,{stableName:`VariantButton`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="button"
  label="Toggle button variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),x=()=>(0,o.jsx)(r,{stableName:`VariantCheckboxButton`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="checkbox-button"
  label="Toggle checkbox variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),S=()=>(0,o.jsx)(r,{stableName:`VariantButtons`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  label="Buttons variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),C=()=>(0,o.jsx)(r,{"data-visual-test":`toggle-variant-buttons-with-help`,stableName:`VariantButtonsWithHelp`,children:`<Field.Toggle
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
`}),w=()=>(0,o.jsx)(r,{"data-visual-test":`toggle-variant-buttons-without-label`,stableName:`VariantButtonsWithoutLabel`,children:`
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="buttons"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>

`}),T=()=>(0,o.jsx)(r,{stableName:`VariantRadio`,children:`<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  label="Radio variant"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>
`}),E=()=>(0,o.jsx)(r,{"data-visual-test":`toggle-variant-radio-with-help`,stableName:`VariantRadioWithHelp`,children:`<Field.Toggle
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
`}),D=()=>(0,o.jsx)(r,{"data-visual-test":`toggle-variant-radio-without-label`,stableName:`VariantRadioWithoutLabel`,children:`
Text above the toggle:
<Field.Toggle
  valueOn="on"
  valueOff="off"
  variant="radio"
  value="on"
  onChange={(value) => console.log('onChange', value)}
/>

`});function O(e){let t={h2:`h2`,h3:`h3`,h4:`h4`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||A(`Examples`,!1),g||A(`Examples.BooleanValueOff`,!0),h||A(`Examples.BooleanValueOn`,!0),d||A(`Examples.Disabled`,!0),f||A(`Examples.Info`,!0),v||A(`Examples.NumberValueOff`,!0),_||A(`Examples.NumberValueOn`,!0),u||A(`Examples.TextOff`,!0),l||A(`Examples.TextOn`,!0),c||A(`Examples.ValueOff`,!0),s||A(`Examples.ValueOn`,!0),b||A(`Examples.VariantButton`,!0),S||A(`Examples.VariantButtons`,!0),C||A(`Examples.VariantButtonsWithHelp`,!0),w||A(`Examples.VariantButtonsWithoutLabel`,!0),x||A(`Examples.VariantCheckboxButton`,!0),T||A(`Examples.VariantRadio`,!0),E||A(`Examples.VariantRadioWithHelp`,!0),D||A(`Examples.VariantRadioWithoutLabel`,!0),y||A(`Examples.VariantSwitch`,!0),p||A(`Examples.Warning`,!0),m||A(`Examples.WithError`,!0),n||A(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Value On`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Value Off`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Text On`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Text Off`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Info`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Warning`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Value types`}),`
`,(0,o.jsx)(t.h4,{children:`Boolean value - On state`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h4,{children:`Boolean value - Off state`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h4,{children:`Number value - On state`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h4,{children:`Number value - Off state`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`Variants`}),`
`,(0,o.jsx)(t.h4,{children:`Switch`}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h4,{children:`Button`}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons`}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons with help`}),`
`,(0,o.jsx)(C,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio`}),`
`,(0,o.jsx)(T,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio with help`}),`
`,(0,o.jsx)(E,{}),`
`,(0,o.jsxs)(n,{children:[(0,o.jsx)(w,{}),(0,o.jsx)(D,{})]}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox button`}),`
`,(0,o.jsx)(x,{})]})}function k(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};