import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";var r=e(t());function i(e){let t={code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Import styles`}),`
`,(0,r.jsx)(t.p,{children:`In order to apply the Sbanken styles, you need to both define;`}),`
`,(0,r.jsx)(t.p,{children:`the CSS package:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`import '@dnb/eufemia/style/core' // or /basis, when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/sbanken'
`})}),`
`,(0,r.jsx)(t.p,{children:`and the Theme:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme name="sbanken">
    <App />
  </Theme>
)
`})}),`
`,(0,r.jsx)(t.h2,{children:`Runtime theme swap`}),`
`,(0,r.jsx)(t.p,{children:`However, the above solution will not work for changing the theme in runtime.`}),`
`,(0,r.jsx)(t.p,{children:`Changing theme during runtime, without pre-loading all CSS styles and fonts together, requires a more sophisticated solution.`}),`
`,(0,r.jsx)(t.p,{children:`The Eufemia Portal handles this by preloading the available theme assets and updating the active theme at runtime.`})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};