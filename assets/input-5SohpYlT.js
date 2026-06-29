import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{t as r}from"./when-to-use-forms-LK79e8dK.js";import{m as i}from"./Examples-CeAJuRAW.js";import a,{n as o,t as s}from"./demos-CMA42py9.js";var c=e(t());function l(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:a}=t;return o||d(`Examples`,!1),s||d(`Examples.CurrencyField`,!0),a||d(`RelatedComponents`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Import`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Input } from '@dnb/eufemia'
`})}),`
`,(0,c.jsx)(t.h2,{children:`Description`}),`
`,(0,c.jsxs)(t.p,{children:[`The Input component is an umbrella component for all inputs that share the same style as the classic `,(0,c.jsx)(t.code,{children:`text`}),` input field.`]}),`
`,(0,c.jsx)(t.h2,{children:`When to use Input vs Eufemia Forms`}),`
`,(0,c.jsx)(r,{}),`
`,(0,c.jsxs)(t.p,{children:[`The Eufemia Forms equivalent of `,(0,c.jsx)(t.code,{children:`Input`}),` is `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Field.String`}),` for text values, while `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Number/`,children:`Field.Number`}),` and `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),` handle numbers and amounts.`]}),`
`,(0,c.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1495`,children:`Figma`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/input`,children:`Source code`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/input`,children:`Docs code`})}),`
`]}),`
`,(0,c.jsx)(t.h3,{children:`Formatted input fields (masked values)`}),`
`,(0,c.jsxs)(t.p,{children:[`You may consider using `,(0,c.jsx)(t.a,{href:`/uilib/components/input-masked/`,children:`InputMasked`}),` for formatted strings and `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/`,children:`Eufemia Forms`}),` fields like `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Number/`,children:`Field.Number`}),` and `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),` for formatted numbers:`]}),`
`,(0,c.jsx)(s,{}),`
`,(0,c.jsx)(t.h3,{children:`Step controls (increment and decrement)`}),`
`,(0,c.jsxs)(t.p,{children:[`For a number input with stepper buttons to increment and decrement the value (plus/minus, number spinner), use `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Number/#step-controls`,children:`Field.Number`}),` (or `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`) with the `,(0,c.jsx)(t.code,{children:`showStepControls`}),` property.`]}),`
`,(0,c.jsx)(t.h3,{children:`Browser autofill styling`}),`
`,(0,c.jsx)(t.p,{children:`When users insert values using autofill in their browser, the browser applies its own background and text colors that override Eufemia's styling.`}),`
`,(0,c.jsxs)(t.p,{children:[`Different browsers use different color schemes. However, Eufemia does not currently overwrite the `,(0,c.jsx)(t.code,{children:`:autofill`}),` background color. We only ensure the border (outline) is styled correctly in all states.`]}),`
`,(0,c.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,c.jsxs)(t.p,{children:[`Please avoid using the `,(0,c.jsx)(t.code,{children:`maxlength`}),` attribute when possible, as it may reduce accessibility. You can instead use the `,(0,c.jsx)(t.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` component.`]}),`
`,(0,c.jsxs)(t.p,{children:[`You may also consider using a multiline input with a `,(0,c.jsx)(t.code,{children:`characterCounter`}),`:`]}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsx)(a,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function f(e){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u,{}),`
`,(0,c.jsx)(a,{})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}export{p as default};