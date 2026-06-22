import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import{n as r}from"./PropertiesTable-CoZ69GOv.js";import{n as i,r as a}from"./InputMaskedDocs-C2IW9rbe.js";var o=e(t());function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Properties`}),`
`,(0,o.jsx)(r,{props:a}),`
`,(0,o.jsx)(t.h2,{children:`Number mask properties`}),`
`,(0,o.jsx)(t.p,{children:`The number mask is used for all kinds of number based masks, like:`}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Locale based masks:`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`asNumber`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`asCurrency`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`asPercent`})}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Static masks:`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`numberMask`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`currencyMask`})}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.code,{children:`maskOptions`}),` to manipulate the options.`]}),`
`,(0,o.jsx)(t.p,{children:`Defaults to Norwegian number format.`}),`
`,(0,o.jsx)(r,{props:i}),`
`,(0,o.jsx)(t.h3,{children:`Custom number mask usage`}),`
`,(0,o.jsxs)(t.p,{children:[`The number mask is included and can be set with the `,(0,o.jsx)(t.code,{children:`numberMask`}),` property.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`
// 1. Use the desired configurations
const numberMask = {
  prefix: '',
  suffix: ',- kr'
}

// 2. Then pass 'numberMask' to the InputMasked component as the numberMask
<InputMasked numberMask={numberMask} ... />
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};