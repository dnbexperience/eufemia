import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{t as r}from"./ComponentBox-Cb1rLw_D.js";import{n as i}from"./VippsWalletButton-DuM8FPBW.js";var a=e(t()),o=()=>(0,a.jsx)(r,{scope:{VippsWalletButton:i},stableName:`VippsWalletButtonExample`,sourceImports:[`import VippsWalletButton from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`],children:`<VippsWalletButton
  onClick={() => {
    console.log('VippsWalletButton clicked')
  }}
  data-visual-test="vipps-wallet-button"
/>
`}),s=()=>(0,a.jsx)(r,{scope:{VippsWalletButton:i},stableName:`VippsWalletButtonPendingExample`,sourceImports:[`import VippsWalletButton from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`],children:`<VippsWalletButton
  pending
  onClick={() => {
    console.log('VippsWalletButton clicked')
  }}
  data-visual-test="vipps-wallet-button-pending"
/>
`});function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`VippsWalletButton`}),`
`,(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import VippsWalletButton from '@dnb/eufemia/extensions/vipps-wallet-button'
import '@dnb/eufemia/extensions/vipps-wallet-button/style'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsx)(t.p,{children:`A branded Vipps wallet call-to-action button extension.`}),`
`,(0,a.jsxs)(t.p,{children:[`It uses a primary `,(0,a.jsx)(t.a,{href:`/uilib/components/button/`,children:`Button`}),` under the hood.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/vipps-wallet-button`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/vipps-wallet-button.mdx`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Demo`}),`
`,(0,a.jsx)(t.h3,{children:`Default`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`With SubmitIndicator`}),`
`,(0,a.jsxs)(t.p,{children:[`Example with property `,(0,a.jsx)(t.code,{children:`pending`}),` set to `,(0,a.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h2,{children:`Translations`}),`
`,(0,a.jsxs)(t.p,{children:[`The label text is translated internally and follows `,(0,a.jsx)(t.code,{children:`Provider`}),` locale.`]}),`
`,(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:(0,a.jsx)(t.strong,{children:`nb-NO`})}),(0,a.jsx)(t.th,{children:(0,a.jsx)(t.strong,{children:`en-GB`})}),(0,a.jsx)(t.th,{children:(0,a.jsx)(t.strong,{children:`sv-SE`})}),(0,a.jsx)(t.th,{children:(0,a.jsx)(t.strong,{children:`da-DK`})})]})}),(0,a.jsx)(t.tbody,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Legg til i`}),(0,a.jsx)(t.td,{children:`Add to`}),(0,a.jsx)(t.td,{children:`Lägg till i`}),(0,a.jsx)(t.td,{children:`Tilføj til`})]})})]})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};