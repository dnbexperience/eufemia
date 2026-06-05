import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Field-neGd0eKd.js";import{K as i}from"./index-Bx3ttow-.js";import{t as a}from"./ComponentBox-CG7uqrFy.js";var o=e({ButtonDisabled:()=>y,ButtonError:()=>b,ButtonFalse:()=>_,ButtonRequired:()=>v,ButtonTrue:()=>g,ButtonsDisabled:()=>A,ButtonsError:()=>j,ButtonsFalse:()=>D,ButtonsRequired:()=>k,ButtonsTrue:()=>E,ButtonsUndefined:()=>O,CheckboxButtonDisabled:()=>w,CheckboxButtonError:()=>T,CheckboxButtonFalse:()=>S,CheckboxButtonRequired:()=>C,CheckboxButtonTrue:()=>x,CheckboxDisabled:()=>f,CheckboxError:()=>m,CheckboxFalse:()=>u,CheckboxPreventDefault:()=>p,CheckboxRequired:()=>d,CheckboxTrue:()=>l,Default:()=>c,RadioDisabled:()=>L,RadioError:()=>R,RadioFalse:()=>P,RadioRequired:()=>I,RadioTrue:()=>N,RadioUndefined:()=>F,VariantButtonsWithHelp:()=>M,VariantCheckboxWithHelp:()=>h,VariantRadioWithHelp:()=>z,VariantSwitchWithHelp:()=>B}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Default`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean onChange={(value) => console.log('onChange', value)} />
`}),l=()=>(0,s.jsx)(a,{stableName:`CheckboxTrue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,s.jsx)(a,{stableName:`CheckboxFalse`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(a,{stableName:`CheckboxRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),f=()=>(0,s.jsx)(a,{stableName:`CheckboxDisabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,s.jsx)(a,{stableName:`CheckboxPreventDefault`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="I will never change the state"
  onClick={(value, { event }) => {
    event.preventDefault()
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,s.jsx)(a,{stableName:`CheckboxError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,s.jsx)(a,{stableName:`VariantCheckboxWithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox"
  label="Checkbox variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),g=()=>(0,s.jsx)(a,{stableName:`ButtonTrue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="button"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),_=()=>(0,s.jsx)(a,{stableName:`ButtonFalse`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="button"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),v=()=>(0,s.jsx)(a,{stableName:`ButtonRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="button"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),y=()=>(0,s.jsx)(a,{stableName:`ButtonDisabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="button"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),b=()=>(0,s.jsx)(a,{stableName:`ButtonError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),x=()=>(0,s.jsx)(a,{stableName:`CheckboxButtonTrue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),S=()=>(0,s.jsx)(a,{stableName:`CheckboxButtonFalse`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),C=()=>(0,s.jsx)(a,{stableName:`CheckboxButtonRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox-button"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),w=()=>(0,s.jsx)(a,{stableName:`CheckboxButtonDisabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox-button"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),T=()=>(0,s.jsx)(a,{stableName:`CheckboxButtonError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="checkbox-button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),E=()=>(0,s.jsx)(a,{stableName:`ButtonsTrue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),D=()=>(0,s.jsx)(a,{stableName:`ButtonsFalse`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),O=()=>(0,s.jsx)(a,{stableName:`ButtonsUndefined`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),k=()=>(0,s.jsx)(a,{stableName:`ButtonsRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),A=()=>(0,s.jsx)(a,{stableName:`ButtonsDisabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),j=()=>(0,s.jsx)(a,{stableName:`ButtonsError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),M=()=>(0,s.jsx)(a,{stableName:`VariantButtonsWithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="buttons"
  label="Buttons variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),N=()=>(0,s.jsx)(a,{stableName:`RadioTrue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Label text"
  value={true}
  onChange={(value) => console.log('onChange', value)}
/>
`}),P=()=>(0,s.jsx)(a,{stableName:`RadioFalse`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Label text"
  value={false}
  onChange={(value) => console.log('onChange', value)}
/>
`}),F=()=>(0,s.jsx)(a,{stableName:`RadioUndefined`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),I=()=>(0,s.jsx)(a,{stableName:`RadioRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Set to be required initially"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
  required
/>
`}),L=()=>(0,s.jsx)(a,{stableName:`RadioDisabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="I am disabled"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),R=()=>(0,s.jsx)(a,{stableName:`RadioError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),z=()=>(0,s.jsx)(a,{stableName:`VariantRadioWithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="radio"
  label="Radio variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`}),B=()=>(0,s.jsx)(a,{stableName:`VariantSwitchWithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Boolean
  variant="switch"
  label="Switch variant"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
/>
`});function V(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...i(),...e.components};return o||U(`Examples`,!1),y||U(`Examples.ButtonDisabled`,!0),b||U(`Examples.ButtonError`,!0),_||U(`Examples.ButtonFalse`,!0),v||U(`Examples.ButtonRequired`,!0),g||U(`Examples.ButtonTrue`,!0),A||U(`Examples.ButtonsDisabled`,!0),j||U(`Examples.ButtonsError`,!0),D||U(`Examples.ButtonsFalse`,!0),k||U(`Examples.ButtonsRequired`,!0),E||U(`Examples.ButtonsTrue`,!0),O||U(`Examples.ButtonsUndefined`,!0),w||U(`Examples.CheckboxButtonDisabled`,!0),T||U(`Examples.CheckboxButtonError`,!0),S||U(`Examples.CheckboxButtonFalse`,!0),C||U(`Examples.CheckboxButtonRequired`,!0),x||U(`Examples.CheckboxButtonTrue`,!0),f||U(`Examples.CheckboxDisabled`,!0),m||U(`Examples.CheckboxError`,!0),u||U(`Examples.CheckboxFalse`,!0),p||U(`Examples.CheckboxPreventDefault`,!0),d||U(`Examples.CheckboxRequired`,!0),l||U(`Examples.CheckboxTrue`,!0),c||U(`Examples.Default`,!0),L||U(`Examples.RadioDisabled`,!0),R||U(`Examples.RadioError`,!0),P||U(`Examples.RadioFalse`,!0),I||U(`Examples.RadioRequired`,!0),N||U(`Examples.RadioTrue`,!0),F||U(`Examples.RadioUndefined`,!0),M||U(`Examples.VariantButtonsWithHelp`,!0),h||U(`Examples.VariantCheckboxWithHelp`,!0),z||U(`Examples.VariantRadioWithHelp`,!0),B||U(`Examples.VariantSwitchWithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`No label or value`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Checkbox`}),`
`,(0,s.jsx)(t.h4,{children:`Value true`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h4,{children:`Value false`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox - Required`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox - Disabled`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Checkbox - prevent changing the state of the checkbox`}),`
`,(0,s.jsxs)(t.p,{children:[`You can prevent the state of the checkbox from changing by calling `,(0,s.jsx)(t.code,{children:`preventDefault`}),` on the `,(0,s.jsx)(t.code,{children:`onClick`}),` event.`]}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox - Error`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Checkbox - With Help`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Button`}),`
`,(0,s.jsx)(t.h4,{children:`Value true`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h4,{children:`Button - Value false`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h4,{children:`Button - Required`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h4,{children:`Button - Disabled`}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h4,{children:`Button - Error`}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Checkbox button`}),`
`,(0,s.jsx)(t.h4,{children:`Value true`}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox button - Value false`}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox button - Required`}),`
`,(0,s.jsx)(C,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox button - Disabled`}),`
`,(0,s.jsx)(w,{}),`
`,(0,s.jsx)(t.h4,{children:`Checkbox button - Error`}),`
`,(0,s.jsx)(T,{}),`
`,(0,s.jsx)(t.h3,{children:`Buttons`}),`
`,(0,s.jsx)(t.h4,{children:`Value true`}),`
`,(0,s.jsx)(E,{}),`
`,(0,s.jsx)(t.h4,{children:`Buttons - Value false`}),`
`,(0,s.jsx)(D,{}),`
`,(0,s.jsx)(t.h4,{children:`Button - Value undefined (no option selected)`}),`
`,(0,s.jsx)(O,{}),`
`,(0,s.jsx)(t.h4,{children:`Buttons - Required`}),`
`,(0,s.jsx)(k,{}),`
`,(0,s.jsx)(t.h4,{children:`Buttons - With Help`}),`
`,(0,s.jsx)(M,{}),`
`,(0,s.jsx)(t.h4,{children:`Buttons - Disabled`}),`
`,(0,s.jsx)(A,{}),`
`,(0,s.jsx)(t.h4,{children:`Buttons - Error`}),`
`,(0,s.jsx)(j,{}),`
`,(0,s.jsx)(t.h3,{children:`Radio`}),`
`,(0,s.jsx)(t.h4,{children:`Value true`}),`
`,(0,s.jsx)(N,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - Value false`}),`
`,(0,s.jsx)(P,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - Value undefined (no option selected)`}),`
`,(0,s.jsx)(F,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - Required`}),`
`,(0,s.jsx)(I,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - With Help`}),`
`,(0,s.jsx)(z,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - Disabled`}),`
`,(0,s.jsx)(L,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio - Error`}),`
`,(0,s.jsx)(R,{}),`
`,(0,s.jsx)(t.h3,{children:`Switch`}),`
`,(0,s.jsx)(t.h4,{children:`Switch - With Help`}),`
`,(0,s.jsx)(B,{})]})}function H(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(V,{...e})}):V(e)}function U(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{H as default};