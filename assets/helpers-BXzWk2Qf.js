import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Helpers`}),`
`,(0,n.jsx)(r.h3,{children:`formatCardNumber`}),`
`,(0,n.jsxs)(r.p,{children:[`Formats card number.
Will by default limit the number of characters in the card number to be of 8 characters.
Can be specified by using the `,(0,n.jsx)(r.code,{children:`digits`}),` param.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card'
// or import { formatCardNumber } from '@dnb/eufemia/extensions/payment-card/PaymentCard'

formatCardNumber(cardNumber: string, digits*: number) // returns string

formatCardNumber('************1337') // returns **** 1337
formatCardNumber('************1337', 5) // returns * 1337
`})}),`
`,(0,n.jsx)(r.h4,{children:`* Optional values (defaults)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`length = `,(0,n.jsx)(r.em,{children:`8`})]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};