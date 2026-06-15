import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-Sh0ySaTM.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Number`}),` is the base component for receiving user input where the target data is of type `,(0,i.jsx)(t.code,{children:`number`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Before using this component, ensure there is not a more specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Number`,children:`Value.Number`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number path="/myNumber" />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Number`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Number`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`When to use and not to use`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Number`}),` only allows the user to enter numbers (negative and positive) and decimal numbers.`]}),`
`,(0,i.jsx)(t.p,{children:`If a number has the type of number and cannot start with a zero, this field may be considered.`}),`
`,(0,i.jsxs)(t.p,{children:[`However, for a customer number, you should rather use `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Field.String`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Internally, it is used by e.g. `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Browser autofill`}),`
`,(0,i.jsxs)(t.p,{children:[`Check out the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/#browser-autofill`,children:`Field.String`}),` docs about autocomplete.`]}),`
`,(0,i.jsx)(t.h2,{children:`Step controls`}),`
`,(0,i.jsxs)(t.p,{children:[`When using `,(0,i.jsx)(t.code,{children:`showStepControls`}),`, the Number component provides buttons for decrementing and incrementing the input value, where the value of de/increment is determined by the `,(0,i.jsx)(t.code,{children:`step`}),` property.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It can also be used with `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`The component does not include focusable buttons, aligning with accessibility considerations for keyboard-only users, who can utilize arrow keys for navigation, like the `,(0,i.jsx)(t.code,{children:`incrementable`}),` `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number`,children:`number input`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`One of the reasons to make the buttons not focusable is to prevent keyboard-only users from having to tab through all the extra buttons during navigation.`}),`
`,(0,i.jsxs)(t.p,{children:[`Due to technical constraints, the `,(0,i.jsx)(t.code,{children:`Field.Number`}),` component will be announced as a `,(0,i.jsx)(t.code,{children:`stepper`}),` field but will have the same instructions read out by a screen reader like VoiceOver on how to change the value.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};