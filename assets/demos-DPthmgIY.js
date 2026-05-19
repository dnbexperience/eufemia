import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({ButtonDisabled:()=>v,ButtonError:()=>y,ButtonFalse:()=>g,ButtonRequired:()=>_,ButtonTrue:()=>h,ButtonsDisabled:()=>k,ButtonsError:()=>A,ButtonsFalse:()=>E,ButtonsRequired:()=>O,ButtonsTrue:()=>T,ButtonsUndefined:()=>D,CheckboxButtonDisabled:()=>C,CheckboxButtonError:()=>w,CheckboxButtonFalse:()=>x,CheckboxButtonRequired:()=>S,CheckboxButtonTrue:()=>b,CheckboxDisabled:()=>d,CheckboxError:()=>p,CheckboxFalse:()=>l,CheckboxPreventDefault:()=>f,CheckboxRequired:()=>u,CheckboxTrue:()=>c,Default:()=>s,RadioDisabled:()=>I,RadioError:()=>L,RadioFalse:()=>N,RadioRequired:()=>F,RadioTrue:()=>M,RadioUndefined:()=>P,VariantButtonsWithHelp:()=>j,VariantCheckboxWithHelp:()=>m,VariantRadioWithHelp:()=>R,VariantSwitchWithHelp:()=>z}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Default`,children:`<Field.Boolean onChange={(value) => console.log('onChange', value)} />
`}),c=()=>(0,o.jsx)(r,{stableName:`CheckboxTrue`,children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`CheckboxFalse`,children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`CheckboxRequired`,children:`<Field.Boolean
  variant="checkbox"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`CheckboxDisabled`,children:`<Field.Boolean
  variant="checkbox"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`CheckboxPreventDefault`,children:`<Field.Boolean
  variant="checkbox"
  label="I will never change the state"
  onClick={(value, { event }) => {
    event.preventDefault()
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`CheckboxError`,children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`VariantCheckboxWithHelp`,children:`<Field.Boolean
  variant="checkbox"
  label="Checkbox variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`ButtonTrue`,children:`<Field.Boolean
  variant="button"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`ButtonFalse`,children:`<Field.Boolean
  variant="button"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,o.jsx)(r,{stableName:`ButtonRequired`,children:`<Field.Boolean
  variant="button"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),v=()=>(0,o.jsx)(r,{stableName:`ButtonDisabled`,children:`<Field.Boolean
  variant="button"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),y=()=>(0,o.jsx)(r,{stableName:`ButtonError`,children:`<Field.Boolean
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),b=()=>(0,o.jsx)(r,{stableName:`CheckboxButtonTrue`,children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),x=()=>(0,o.jsx)(r,{stableName:`CheckboxButtonFalse`,children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),S=()=>(0,o.jsx)(r,{stableName:`CheckboxButtonRequired`,children:`<Field.Boolean
  variant="checkbox-button"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),C=()=>(0,o.jsx)(r,{stableName:`CheckboxButtonDisabled`,children:`<Field.Boolean
  variant="checkbox-button"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),w=()=>(0,o.jsx)(r,{stableName:`CheckboxButtonError`,children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),T=()=>(0,o.jsx)(r,{stableName:`ButtonsTrue`,children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),E=()=>(0,o.jsx)(r,{stableName:`ButtonsFalse`,children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),D=()=>(0,o.jsx)(r,{stableName:`ButtonsUndefined`,children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),O=()=>(0,o.jsx)(r,{stableName:`ButtonsRequired`,children:`<Field.Boolean
  variant="buttons"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),k=()=>(0,o.jsx)(r,{stableName:`ButtonsDisabled`,children:`<Field.Boolean
  variant="buttons"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),A=()=>(0,o.jsx)(r,{stableName:`ButtonsError`,children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),j=()=>(0,o.jsx)(r,{stableName:`VariantButtonsWithHelp`,children:`<Field.Boolean
  variant="buttons"
  label="Buttons variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),M=()=>(0,o.jsx)(r,{stableName:`RadioTrue`,children:`<Field.Boolean
  variant="radio"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),N=()=>(0,o.jsx)(r,{stableName:`RadioFalse`,children:`<Field.Boolean
  variant="radio"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),P=()=>(0,o.jsx)(r,{stableName:`RadioUndefined`,children:`<Field.Boolean
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),F=()=>(0,o.jsx)(r,{stableName:`RadioRequired`,children:`<Field.Boolean
  variant="radio"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),I=()=>(0,o.jsx)(r,{stableName:`RadioDisabled`,children:`<Field.Boolean
  variant="radio"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),L=()=>(0,o.jsx)(r,{stableName:`RadioError`,children:`<Field.Boolean
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),R=()=>(0,o.jsx)(r,{stableName:`VariantRadioWithHelp`,children:`<Field.Boolean
  variant="radio"
  label="Radio variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),z=()=>(0,o.jsx)(r,{stableName:`VariantSwitchWithHelp`,children:`<Field.Boolean
  variant="switch"
  label="Switch variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`});function B(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...i(),...e.components};return a||H(`Examples`,!1),v||H(`Examples.ButtonDisabled`,!0),y||H(`Examples.ButtonError`,!0),g||H(`Examples.ButtonFalse`,!0),_||H(`Examples.ButtonRequired`,!0),h||H(`Examples.ButtonTrue`,!0),k||H(`Examples.ButtonsDisabled`,!0),A||H(`Examples.ButtonsError`,!0),E||H(`Examples.ButtonsFalse`,!0),O||H(`Examples.ButtonsRequired`,!0),T||H(`Examples.ButtonsTrue`,!0),D||H(`Examples.ButtonsUndefined`,!0),C||H(`Examples.CheckboxButtonDisabled`,!0),w||H(`Examples.CheckboxButtonError`,!0),x||H(`Examples.CheckboxButtonFalse`,!0),S||H(`Examples.CheckboxButtonRequired`,!0),b||H(`Examples.CheckboxButtonTrue`,!0),d||H(`Examples.CheckboxDisabled`,!0),p||H(`Examples.CheckboxError`,!0),l||H(`Examples.CheckboxFalse`,!0),f||H(`Examples.CheckboxPreventDefault`,!0),u||H(`Examples.CheckboxRequired`,!0),c||H(`Examples.CheckboxTrue`,!0),s||H(`Examples.Default`,!0),I||H(`Examples.RadioDisabled`,!0),L||H(`Examples.RadioError`,!0),N||H(`Examples.RadioFalse`,!0),F||H(`Examples.RadioRequired`,!0),M||H(`Examples.RadioTrue`,!0),P||H(`Examples.RadioUndefined`,!0),j||H(`Examples.VariantButtonsWithHelp`,!0),m||H(`Examples.VariantCheckboxWithHelp`,!0),R||H(`Examples.VariantRadioWithHelp`,!0),z||H(`Examples.VariantSwitchWithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`No label or value`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox`}),`
`,(0,o.jsx)(t.h4,{children:`Value true`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h4,{children:`Value false`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox - Required`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox - Disabled`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox - prevent changing the state of the checkbox`}),`
`,(0,o.jsxs)(t.p,{children:[`You can prevent the state of the checkbox from changing by calling `,(0,o.jsx)(t.code,{children:`preventDefault`}),` on the `,(0,o.jsx)(t.code,{children:`onClick`}),` event.`]}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox - Error`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox - With Help`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Button`}),`
`,(0,o.jsx)(t.h4,{children:`Value true`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h4,{children:`Button - Value false`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h4,{children:`Button - Required`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h4,{children:`Button - Disabled`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h4,{children:`Button - Error`}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox button`}),`
`,(0,o.jsx)(t.h4,{children:`Value true`}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox button - Value false`}),`
`,(0,o.jsx)(x,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox button - Required`}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox button - Disabled`}),`
`,(0,o.jsx)(C,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox button - Error`}),`
`,(0,o.jsx)(w,{}),`
`,(0,o.jsx)(t.h3,{children:`Buttons`}),`
`,(0,o.jsx)(t.h4,{children:`Value true`}),`
`,(0,o.jsx)(T,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons - Value false`}),`
`,(0,o.jsx)(E,{}),`
`,(0,o.jsx)(t.h4,{children:`Button - Value undefined (no option selected)`}),`
`,(0,o.jsx)(D,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons - Required`}),`
`,(0,o.jsx)(O,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons - With Help`}),`
`,(0,o.jsx)(j,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons - Disabled`}),`
`,(0,o.jsx)(k,{}),`
`,(0,o.jsx)(t.h4,{children:`Buttons - Error`}),`
`,(0,o.jsx)(A,{}),`
`,(0,o.jsx)(t.h3,{children:`Radio`}),`
`,(0,o.jsx)(t.h4,{children:`Value true`}),`
`,(0,o.jsx)(M,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - Value false`}),`
`,(0,o.jsx)(N,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - Value undefined (no option selected)`}),`
`,(0,o.jsx)(P,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - Required`}),`
`,(0,o.jsx)(F,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - With Help`}),`
`,(0,o.jsx)(R,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - Disabled`}),`
`,(0,o.jsx)(I,{}),`
`,(0,o.jsx)(t.h4,{children:`Radio - Error`}),`
`,(0,o.jsx)(L,{}),`
`,(0,o.jsx)(t.h3,{children:`Switch`}),`
`,(0,o.jsx)(t.h4,{children:`Switch - With Help`}),`
`,(0,o.jsx)(z,{})]})}function V(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(B,{...e})}):B(e)}function H(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{V as default};