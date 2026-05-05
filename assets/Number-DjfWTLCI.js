import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-qcEeaiPw.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Number`}),` is the base component for receiving user input where the target data is of type `,(0,r.jsx)(n.code,{children:`number`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Before using this component, ensure there is not a more specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Number`,children:`Value.Number`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number path="/myNumber" />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Number`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Number`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`When to use and not to use`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Number`}),` only allows the user to enter numbers (negative and positive) and decimal numbers.`]}),`
`,(0,r.jsx)(n.p,{children:`If a number has the type of number and cannot start with a zero, this field may be considered.`}),`
`,(0,r.jsxs)(n.p,{children:[`However, for a customer number, you should rather use `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Field.String`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Internally, it is used by e.g. `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Browser autofill`}),`
`,(0,r.jsxs)(n.p,{children:[`Check out the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String/#browser-autofill`,children:`Field.String`}),` docs about autocomplete.`]}),`
`,(0,r.jsx)(n.h2,{children:`Step controls`}),`
`,(0,r.jsxs)(n.p,{children:[`When using `,(0,r.jsx)(n.code,{children:`showStepControls`}),`, the Number component provides buttons for decrementing and incrementing the input value, where the value of de/increment is determined by the `,(0,r.jsx)(n.code,{children:`step`}),` property.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It can also be used with `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The component does not include focusable buttons, aligning with accessibility considerations for keyboard-only users, who can utilize arrow keys for navigation, like the `,(0,r.jsx)(n.code,{children:`incrementable`}),` `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number`,children:`number input`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`One of the reasons to make the buttons not focusable is to prevent keyboard-only users from having to tab through all the extra buttons during navigation.`}),`
`,(0,r.jsxs)(n.p,{children:[`Due to technical constraints, the `,(0,r.jsx)(n.code,{children:`Field.Number`}),` component will be announced as a `,(0,r.jsx)(n.code,{children:`stepper`}),` field but will have the same instructions read out by a screen reader like VoiceOver on how to change the value.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};