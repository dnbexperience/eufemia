import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-Du9jVnfG.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import '@dnb/eufemia/extensions/payment-card/style' // use "/style/isolated" for isolated styles
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/extensions/payment-card'

render(<PaymentCard productCode="..." />)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Alternative CSS import`}),`
`,(0,i.jsx)(t.p,{children:`Some bundler configurations (e.g. certain Webpack setups) may not resolve the JavaScript-based style import above. If the styles are not being applied, you can import the pre-built CSS file directly instead:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import '@dnb/eufemia/extensions/payment-card/style/dnb-payment-card.min.css'
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Or if you are using `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/styling/style-isolation`,children:`isolated styles`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import '@dnb/eufemia/extensions/payment-card/style/dnb-payment-card--isolated.min.css'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The PaymentCard component is a dynamically defined visual component that imitates a physical payment card. It exists as an independent extension to Eufemia.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/file/461cAN5Qc3Nks4ztZ9pjtM`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/payment-card`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/payment-card`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`How to use it:`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`First, define your desired look and design.`}),`
`,(0,i.jsx)(t.li,{children:`And import and include it in your application:`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import '@dnb/eufemia/extensions/payment-card/style'
import PaymentCard, {
  getCardData,
} from '@dnb/eufemia/extensions/payment-card'

render(<PaymentCard productCode="..." />)
`})}),`
`,(0,i.jsx)(t.p,{children:`Resources:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/file/461cAN5Qc3Nks4ztZ9pjtM`,children:`Figma design`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://confluence.tech.dnb.no/pages/viewpage.action?spaceKey=PMDT&title=Cards+mapping`,children:`Confluence specifications`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`http://team.erf01.net/sites/8974/Shared%20Documents/Kortprodukter_med_egenskaper.pdf`,children:`Kortprodukter med egenskaper`})}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};