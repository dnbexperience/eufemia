import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";var r=e(t());function i(e){let t={code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Helpers`}),`
`,(0,r.jsx)(t.h3,{children:`formatCardNumber`}),`
`,(0,r.jsxs)(t.p,{children:[`Formats card number.
Will by default limit the number of characters in the card number to be of 8 characters.
Can be specified by using the `,(0,r.jsx)(t.code,{children:`digits`}),` param.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card'
// or import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card/PaymentCard'

formatCardNumber(cardNumber: string, digits*: number) // returns string

formatCardNumber('************1337') // returns **** 1337
formatCardNumber('************1337', 5) // returns * 1337
`})}),`
`,(0,r.jsx)(t.h4,{children:`* Optional values (defaults)`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`length = `,(0,r.jsx)(t.em,{children:`8`})]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};