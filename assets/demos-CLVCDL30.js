import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{$ as r,U as i,W as a}from"./Anchor-BqZ7Pm7_.js";import{t as o}from"./P-D0SeNBSG.js";import{mt as s}from"./Selection-5ph0VyAS.js";import{K as c}from"./index-CsG353ar.js";import{t as l}from"./ComponentBox-Cb1rLw_D.js";var u=t(n());function d({off:e,children:t}){return e?(0,u.jsx)(r,{formElement:{translate:`no`},children:(0,u.jsx)(a,{translate:`no`,children:t})}):(0,u.jsx)(u.Fragment,{children:t})}var f=e({BrowserTranslateExample:()=>m,PortalRootExample:()=>p}),p=()=>(0,u.jsx)(l,{stableName:`PortalRootExample`,sourceImports:[`import { P, PortalRoot, Dropdown } from '@dnb/eufemia'`,`import { BrowserTranslate } from '@dnb/eufemia/shared'`],__buildScope:{PortalRoot:i,P:o},children:`
<PortalRoot>
  <div
    style={{
      position: 'fixed',
      top: '16rem',
      right: '1rem',
      width: '8rem',
      height: '8rem',
      placeContent: 'center',
      textAlign: 'center',
      backgroundColor: 'red',
      zIndex: 4000,
    }}
  >
    <P>My content</P>
  </div>
</PortalRoot>
<P>Do you see the red box?</P>

`}),m=()=>(0,u.jsx)(l,{scope:{BrowserTranslate:d},stableName:`BrowserTranslateExample`,sourceImports:[`import { P, PortalRoot, Dropdown } from '@dnb/eufemia'`,`import { BrowserTranslate } from '@dnb/eufemia/shared'`],__buildScope:{Dropdown:s},children:`<BrowserTranslate off>
  <Dropdown
    label="Velg farge"
    data={['Rød', 'Blå', 'Grønn', 'Gul', 'Hvit', 'Svart']}
  />
</BrowserTranslate>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...c(),...e.components};return f||_(`Examples`,!1),m||_(`Examples.BrowserTranslateExample`,!0),p||_(`Examples.PortalRootExample`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`PortalRoot`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`BrowserTranslate`}),`
`,(0,u.jsxs)(t.p,{children:[`The `,(0,u.jsx)(t.code,{children:`BrowserTranslate`}),` helper prevents browser translation tools (e.g. Google Translate) from modifying form component content. It sets `,(0,u.jsx)(t.code,{children:`translate="no"`}),` on both the component itself and any portal-rendered content like dropdown lists.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { BrowserTranslate } from '@dnb/eufemia/shared'
`})}),`
`,(0,u.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};