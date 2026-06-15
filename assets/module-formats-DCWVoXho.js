import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`ESM and transpiling`}),`
`,(0,r.jsxs)(t.p,{children:[`To support every modern front end environment, the `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` supports different transpiled module formats:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`ESM`}),` transpiled `,(0,r.jsx)(t.a,{href:`/uilib/usage/#supported-browsers-and-platforms`,children:`for broad browser compatibility`}),` (`,(0,r.jsx)(t.strong,{children:`default`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`CJS`}),` transpiled `,(0,r.jsx)(t.a,{href:`/uilib/usage/#supported-browsers-and-platforms`,children:`for broad browser compatibility`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`ES`}),` with modern JavaScript syntax`]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Bundles`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`ESM`}),` bundle with modern JavaScript syntax`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`UMD`}),` bundle with modern JavaScript syntax`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Default module format`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` uses `,(0,r.jsx)(t.strong,{children:`ESM`}),` as the default module format:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// Imports only the code needed for the button
import { Button } from '@dnb/eufemia' // ESM transpiled for broad browser compatibility
import { Button } from '@dnb/eufemia/es' // Modern JavaScript syntax version
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Because the package is published with `,(0,r.jsx)(t.code,{children:`"type": "module"`}),`, Node.js treats its `,(0,r.jsx)(t.code,{children:`.js`}),` files as ES modules by default. This means you should use `,(0,r.jsx)(t.code,{children:`import`}),`/`,(0,r.jsx)(t.code,{children:`export`}),` syntax, and `,(0,r.jsx)(t.code,{children:`require()`}),` will not work unless you target the `,(0,r.jsx)(t.code,{children:`/cjs`}),` build.`]}),`
`,(0,r.jsx)(t.h2,{children:`CommonJS (CJS)`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.a,{href:`https://nodejs.org/`,children:`Node.js`}),` may use `,(0,r.jsx)(t.a,{href:`https://requirejs.org`,children:`RequireJS`}),` and has `,(0,r.jsx)(t.a,{href:`https://requirejs.org/docs/commonjs.html`,children:`CommonJS`}),` as their default module format, depending on your version and flags.`]}),`
`,(0,r.jsx)(t.h3,{children:`SSR`}),`
`,(0,r.jsxs)(t.p,{children:[`In case you are using the `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` in an environment that can't use ESM, you can import or require everything from the `,(0,r.jsx)(t.code,{children:`/cjs`}),` subfolder:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// Components
import { Button } from '@dnb/eufemia/cjs'
const { Button } = require('@dnb/eufemia/cjs/components')
const Button = require('@dnb/eufemia/cjs/components/Button')

// Styles
import '@dnb/eufemia/cjs/style'
require('@dnb/eufemia/cjs/style')
`})}),`
`,(0,r.jsx)(t.h4,{children:`Jest/Vitest and ESM (Node testing environments)`}),`
`,(0,r.jsxs)(t.p,{children:[`Older Jest versions still use CommonJS as the default module format. If you use the default `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` imports, then you get a mismatch between ES module and CommonJS formats. To ensure that Jest transforms your code into CJS, you can use the following Jest configuration `,(0,r.jsx)(t.code,{children:`--moduleNameMapper`})]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`jest --moduleNameMapper '{"@dnb/eufemia(.*)":"@dnb/eufemia/cjs$1"}'
`})}),`
`,(0,r.jsxs)(t.p,{children:[`or in a `,(0,r.jsx)(t.code,{children:`jest.config.js`}),` or `,(0,r.jsx)(t.code,{children:`jest.preset.js`}),` file:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`  module.exports = {
    ...
    moduleNameMapper: { '@dnb/eufemia(.*)': '@dnb/eufemia/cjs$1' }
  }
`})}),`
`,(0,r.jsxs)(t.p,{children:[`If you use `,(0,r.jsx)(t.a,{href:`https://vitest.dev/`,children:`Vitest`}),`, configure the alias in `,(0,r.jsx)(t.code,{children:`vitest.config.ts`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`export default defineConfig({
  resolve: {
    alias: { '@dnb/eufemia': '@dnb/eufemia/cjs' },
  },
})
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};