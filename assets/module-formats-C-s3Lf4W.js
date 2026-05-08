import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`ESM and transpiling`}),`
`,(0,n.jsxs)(r.p,{children:[`To support every modern front end environment, the `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` supports different transpiled module formats:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`ESM`}),` transpiled `,(0,n.jsx)(r.a,{href:`/uilib/usage/#supported-browsers-and-platforms`,children:`for broad browser compatibility`}),` (`,(0,n.jsx)(r.strong,{children:`default`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`CJS`}),` transpiled `,(0,n.jsx)(r.a,{href:`/uilib/usage/#supported-browsers-and-platforms`,children:`for broad browser compatibility`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`ES`}),` with modern JavaScript syntax`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Bundles`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`ESM`}),` bundle with modern JavaScript syntax`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`UMD`}),` bundle with modern JavaScript syntax`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Default module format`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` uses `,(0,n.jsx)(r.strong,{children:`ESM`}),` as the default module format:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// Imports only the code needed for the button
import { Button } from '@dnb/eufemia' // ESM transpiled for broad browser compatibility
import { Button } from '@dnb/eufemia/es' // Modern JavaScript syntax version
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Because the package is published with `,(0,n.jsx)(r.code,{children:`"type": "module"`}),`, Node.js treats its `,(0,n.jsx)(r.code,{children:`.js`}),` files as ES modules by default. This means you should use `,(0,n.jsx)(r.code,{children:`import`}),`/`,(0,n.jsx)(r.code,{children:`export`}),` syntax, and `,(0,n.jsx)(r.code,{children:`require()`}),` will not work unless you target the `,(0,n.jsx)(r.code,{children:`/cjs`}),` build.`]}),`
`,(0,n.jsx)(r.h2,{children:`CommonJS (CJS)`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.a,{href:`https://nodejs.org/`,children:`Node.js`}),` may use `,(0,n.jsx)(r.a,{href:`https://requirejs.org`,children:`RequireJS`}),` and has `,(0,n.jsx)(r.a,{href:`https://requirejs.org/docs/commonjs.html`,children:`CommonJS`}),` as their default module format, depending on your version and flags.`]}),`
`,(0,n.jsx)(r.h3,{children:`SSR`}),`
`,(0,n.jsxs)(r.p,{children:[`In case you are using the `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` in an environment that can't use ESM, you can import or require everything from the `,(0,n.jsx)(r.code,{children:`/cjs`}),` subfolder:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`// Components
import { Button } from '@dnb/eufemia/cjs'
const { Button } = require('@dnb/eufemia/cjs/components')
const Button = require('@dnb/eufemia/cjs/components/Button')

// Styles
import '@dnb/eufemia/cjs/style'
require('@dnb/eufemia/cjs/style')
`})}),`
`,(0,n.jsx)(r.h4,{children:`Jest/Vitest and ESM (Node testing environments)`}),`
`,(0,n.jsxs)(r.p,{children:[`Older Jest versions still use CommonJS as the default module format. If you use the default `,(0,n.jsx)(r.code,{children:`@dnb/eufemia`}),` imports, then you get a mismatch between ES module and CommonJS formats. To ensure that Jest transforms your code into CJS, you can use the following Jest configuration `,(0,n.jsx)(r.code,{children:`--moduleNameMapper`})]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`jest --moduleNameMapper '{"@dnb/eufemia(.*)":"@dnb/eufemia/cjs$1"}'
`})}),`
`,(0,n.jsxs)(r.p,{children:[`or in a `,(0,n.jsx)(r.code,{children:`jest.config.js`}),` or `,(0,n.jsx)(r.code,{children:`jest.preset.js`}),` file:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`  module.exports = {
    ...
    moduleNameMapper: { '@dnb/eufemia(.*)': '@dnb/eufemia/cjs$1' }
  }
`})}),`
`,(0,n.jsxs)(r.p,{children:[`If you use `,(0,n.jsx)(r.a,{href:`https://vitest.dev/`,children:`Vitest`}),`, configure the alias in `,(0,n.jsx)(r.code,{children:`vitest.config.ts`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`export default defineConfig({
  resolve: {
    alias: { '@dnb/eufemia': '@dnb/eufemia/cjs' },
  },
})
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};