import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Import styles`}),`
`,(0,n.jsx)(r.p,{children:`In order to apply the Sbanken styles, you need to both define;`}),`
`,(0,n.jsx)(r.p,{children:`the CSS package:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-diff`,children:`import '@dnb/eufemia/style/core' // or /basis, when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/sbanken'
`})}),`
`,(0,n.jsx)(r.p,{children:`and the Theme:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme name="sbanken">
    <App />
  </Theme>
)
`})}),`
`,(0,n.jsx)(r.h2,{children:`Runtime theme swap`}),`
`,(0,n.jsx)(r.p,{children:`However, the above solution will not work for changing the theme in runtime.`}),`
`,(0,n.jsx)(r.p,{children:`Changing theme during runtime, without pre-loading all CSS styles and fonts together, requires a more sophisticated solution.`}),`
`,(0,n.jsxs)(r.p,{children:[`When using Gatsby, you can use this plugin `,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/gatsby-plugin-eufemia-theme-handler`,children:`gatsby-plugin-eufemia-theme-handler`}),` to change theme during runtime.`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};