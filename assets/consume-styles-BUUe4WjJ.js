import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Importing the CSS`}),`
`,(0,r.jsxs)(t.p,{children:[`To include the packages `,(0,r.jsx)(t.code,{children:`dnb-ui-core`}),`, `,(0,r.jsx)(t.code,{children:`ui-theme-basis`}),` and `,(0,r.jsx)(t.code,{children:`ui-theme-components`}),` in a `,(0,r.jsx)(t.a,{href:`https://nodejs.org`,children:`Node.js`}),` based environment (given you have a CSS loader in place), do this:`]}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Style package structure:`}),` The theme package `,(0,r.jsx)(t.code,{children:`ui-theme-components`}),` includes both `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`component`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Eufemia Forms`}),` styles (Field, Value, Form layout, Wizard, etc.).`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:"// This includes the `dnb-ui-core`, `ui-theme-components` and `ui-theme-basis`\nimport '@dnb/eufemia/style'\n"})}),`
`,(0,r.jsx)(t.h2,{children:`Select a theme`}),`
`,(0,r.jsx)(t.p,{children:`The above import is a shorthand for the DNB main theme. It is equivalent to the following import:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// This is identical to \`import '@dnb/eufemia/style'\`
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,r.jsx)(t.p,{children:`To import another theme, replace the second import:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// This imports the sbanken theme instead
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/sbanken'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Runtime theme switching`}),`
`,(0,r.jsx)(t.p,{children:`If your application needs to switch theme at runtime, preload the relevant theme CSS files and update the active theme through your application state.`}),`
`,(0,r.jsx)(t.h2,{children:`Importing styles from within JavaScript`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-components.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Importing styles from within CSS`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`@import url('@dnb/eufemia/style/dnb-ui-core.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-components.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css');
`})}),`
`,(0,r.jsx)(t.h2,{children:`Legacy import`}),`
`,(0,r.jsxs)(t.p,{children:[`The legacy import `,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style/basis'`}),` scopes global css so it does not affect the whole page. But requires that
you place a wrapper element with class `,(0,r.jsx)(t.code,{children:`.dnb-core-style`}),` around all Eufemia elements. And may causes some css specificity issues.`]}),`
`,(0,r.jsxs)(t.p,{children:[`If possible, it should be replaced with `,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style/core'`}),` that attaches the same css to the `,(0,r.jsx)(t.code,{children:`body`}),` tag instead.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling#how-to-deal-with-existing-styles`,children:`how to deal with existing styles`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import '@dnb/eufemia/style/basis' // replaced by '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Single Component only`}),`
`,(0,r.jsx)(t.p,{children:`It is possible to import a single CSS Style of a single component at once:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// Imports the core css for the theme
import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'

// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style/dnb-button.min.css'
import '@dnb/eufemia/components/button/style/themes/dnb-button-theme-ui.min.css'
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};