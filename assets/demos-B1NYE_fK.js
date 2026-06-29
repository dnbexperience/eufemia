import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{t as r}from"./ComponentBox-sLMgHvLi.js";import{n as i}from"./VippsWalletButton-BheefXlp.js";var a=e(t()),o=()=>(0,a.jsx)(r,{scope:{VippsWalletButton:i},stableName:`VippsWalletButtonExample`,sourceImports:[`import VippsWalletButton from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`],children:`<VippsWalletButton
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
`});function c(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`With SubmitIndicator`}),`
`,(0,a.jsxs)(t.p,{children:[`Example with property `,(0,a.jsx)(t.code,{children:`pending`}),` set to `,(0,a.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};