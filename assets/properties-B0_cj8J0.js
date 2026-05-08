import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n}from"./PropertiesTable-NQTsOnC6.js";import{n as r,r as i}from"./InputMaskedDocs-DCzz9MxB.js";var a=e();function o(e){let o={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h2,{children:`Properties`}),`
`,(0,a.jsx)(n,{props:i}),`
`,(0,a.jsx)(o.h2,{children:`Number mask properties`}),`
`,(0,a.jsx)(o.p,{children:`The number mask is used for all kinds of number based masks, like:`}),`
`,(0,a.jsx)(o.p,{children:(0,a.jsx)(o.strong,{children:`Locale based masks:`})}),`
`,(0,a.jsxs)(o.ul,{children:[`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.code,{children:`asNumber`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.code,{children:`asCurrency`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.code,{children:`asPercent`})}),`
`]}),`
`,(0,a.jsx)(o.p,{children:(0,a.jsx)(o.strong,{children:`Static masks:`})}),`
`,(0,a.jsxs)(o.ul,{children:[`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.code,{children:`numberMask`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.code,{children:`currencyMask`})}),`
`]}),`
`,(0,a.jsxs)(o.p,{children:[`You can `,(0,a.jsx)(o.code,{children:`maskOptions`}),` to manipulate the options.`]}),`
`,(0,a.jsx)(o.p,{children:`Defaults to Norwegian number format.`}),`
`,(0,a.jsx)(n,{props:r}),`
`,(0,a.jsx)(o.h3,{children:`Custom number mask usage`}),`
`,(0,a.jsxs)(o.p,{children:[`The number mask is included and can be set with the `,(0,a.jsx)(o.code,{children:`numberMask`}),` property.`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-jsx`,children:`
// 1. Use the desired configurations
const numberMask = {
  prefix: '',
  suffix: ',- kr'
}

// 2. Then pass 'numberMask' to the InputMasked component as the numberMask
<InputMasked numberMask={numberMask} ... />
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};