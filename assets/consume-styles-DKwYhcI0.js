import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Importing the CSS`}),`
`,(0,n.jsxs)(r.p,{children:[`To include the packages `,(0,n.jsx)(r.code,{children:`dnb-ui-core`}),`, `,(0,n.jsx)(r.code,{children:`ui-theme-basis`}),` and `,(0,n.jsx)(r.code,{children:`ui-theme-components`}),` in a `,(0,n.jsx)(r.a,{href:`https://nodejs.org`,children:`Node.js`}),` based environment (given you have a CSS loader in place), do this:`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Style package structure:`}),` The theme package `,(0,n.jsx)(r.code,{children:`ui-theme-components`}),` includes both `,(0,n.jsx)(r.a,{href:`/uilib/components`,children:`component`}),` and `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms`,children:`Eufemia Forms`}),` styles (Field, Value, Form layout, Wizard, etc.).`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:"// This includes the `dnb-ui-core`, `ui-theme-components` and `ui-theme-basis`\nimport '@dnb/eufemia/style'\n"})}),`
`,(0,n.jsx)(r.h2,{children:`Select a theme`}),`
`,(0,n.jsx)(r.p,{children:`The above import is a shorthand for the DNB main theme. It is equivalent to the following import:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// This is identical to \`import '@dnb/eufemia/style'\`
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,n.jsx)(r.p,{children:`To import another theme, replace the second import:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// This imports the sbanken theme instead
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/sbanken'
`})}),`
`,(0,n.jsx)(r.h2,{children:`Gatsby Plugin`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/gatsby-plugin-eufemia-theme-handler`,children:`gatsby-plugin-eufemia-theme-handler`}),` plugin makes it easy to add the needed styles and provides also a runtime style switch mechanism.`]}),`
`,(0,n.jsx)(r.h2,{children:`Importing styles from within JavaScript`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-components.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'
`})}),`
`,(0,n.jsx)(r.h2,{children:`Importing styles from within CSS`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`@import url('@dnb/eufemia/style/dnb-ui-core.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-components.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css');
`})}),`
`,(0,n.jsx)(r.h2,{children:`Legacy import`}),`
`,(0,n.jsxs)(r.p,{children:[`The legacy import `,(0,n.jsx)(r.code,{children:`import '@dnb/eufemia/style/basis'`}),` scopes global css so it does not affect the whole page. But requires that
you place a wrapper element with class `,(0,n.jsx)(r.code,{children:`.dnb-core-style`}),` around all Eufemia elements. And may causes some css specificity issues.`]}),`
`,(0,n.jsxs)(r.p,{children:[`If possible, it should be replaced with `,(0,n.jsx)(r.code,{children:`import '@dnb/eufemia/style/core'`}),` that attaches the same css to the `,(0,n.jsx)(r.code,{children:`body`}),` tag instead.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Read more about `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/styling#how-to-deal-with-existing-styles`,children:`how to deal with existing styles`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import '@dnb/eufemia/style/basis' // replaced by '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,n.jsx)(r.h2,{children:`Single Component only`}),`
`,(0,n.jsx)(r.p,{children:`It is possible to import a single CSS Style of a single component at once:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// Imports the core css for the theme
import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'

// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style/dnb-button.min.css'
import '@dnb/eufemia/components/button/style/themes/dnb-button-theme-ui.min.css'
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};