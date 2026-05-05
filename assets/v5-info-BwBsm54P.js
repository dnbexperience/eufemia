import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`v5`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#migration`,children:`Migration`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#typography-preparations`,children:`Typography preparations`}),` `,(0,n.jsx)(r.strong,{children:`(feature)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#number-component`,children:`Number component`}),` `,(0,n.jsx)(r.strong,{children:`(feature)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#color-changes`,children:`Color changes`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#icon-changes`,children:`Icon changes`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#esm-module-format`,children:`ESM module format`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#umd-changes`,children:`UMD changes`}),` `,(0,n.jsx)(r.strong,{children:`(major change)`})]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#install`,children:`How to Install`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Migration`}),`
`,(0,n.jsx)(r.p,{children:`v5 contains a couple of breaking changes. As a migration process, you can simply search your application for:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`find `,(0,n.jsx)(r.code,{children:`save_alt_01`}),` and replace if with `,(0,n.jsx)(r.code,{children:`save`})]}),`
`,(0,n.jsxs)(r.li,{children:[`find `,(0,n.jsx)(r.code,{children:`--color-cherry-red`}),` or `,(0,n.jsx)(r.code,{children:`--color-cherry-red-8`}),` and replace it with `,(0,n.jsx)(r.code,{children:`--color-fire-red`}),` and `,(0,n.jsx)(r.code,{children:`--color-fire-red-8`})]}),`
`,(0,n.jsxs)(r.li,{children:[`find `,(0,n.jsx)(r.code,{children:`dnb-ui-lib-icons.min.js`}),` and replace it with `,(0,n.jsx)(r.code,{children:`dnb-ui-icons.min.js`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Typography preparations`}),`
`,(0,n.jsxs)(r.p,{children:[`Soon we will have our own `,(0,n.jsx)(r.em,{children:`DNB font`}),`. This will have impact on both, `,(0,n.jsx)(r.code,{children:`font-family`}),`, `,(0,n.jsx)(r.code,{children:`font-size`}),`, `,(0,n.jsx)(r.code,{children:`font-weight`}),` and `,(0,n.jsx)(r.code,{children:`line-height`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`To get prepared for these changes, you can today already (since `,(0,n.jsx)(r.code,{children:`v4.24`}),`) use the now exposed properties for both:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/uilib/typography/font-size`,children:`font-size`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`/uilib/typography/line-height`,children:`line-heigh`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`From before we had `,(0,n.jsx)(r.a,{href:`/uilib/typography/font-weight`,children:`font-weight`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Read more on how to make CSS vars (Custom Properties) `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/styling/polyfill`,children:`work on IE`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`The benefits?`}),`
`,(0,n.jsx)(r.p,{children:`If you are using only properties to change actively your application typography, then a future update with changes will "automatically" happen, so you don't need to make manual code changes later.`}),`
`,(0,n.jsx)(r.h3,{children:`Properties as JS`}),`
`,(0,n.jsxs)(r.p,{children:[`You can now also import all the main properties as a `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/styling/polyfill#css-in-js`,children:`JavaScript Object`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import properties from 'dnb-ui-lib/style/properties
`})}),`
`,(0,n.jsx)(r.h2,{children:`Number component`}),`
`,(0,n.jsxs)(r.p,{children:[`The new `,(0,n.jsx)(r.a,{href:`/uilib/components/number`,children:`Number component`}),` is a ready to use DNB number formatter. Use it where over you have to display a number, a currency value, phone number, etc.`]}),`
`,(0,n.jsx)(r.p,{children:`Good reasons for why we have this is to:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`uniform the formation of numbers for all DNB applications.`}),`
`,(0,n.jsx)(r.li,{children:`and make numbers accessible to screen readers.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Color changes`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.em,{children:`Cherry Red`}),` will got replaced by `,(0,n.jsx)(r.em,{children:`Fire Red`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.em,{children:`Cherry Red 8%`}),` will got replaced by `,(0,n.jsx)(r.em,{children:`Fire Red 8%`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`You may check your application code and `,(0,n.jsx)(r.strong,{children:`replace`}),` `,(0,n.jsx)(r.code,{children:`cherry-red`}),` with `,(0,n.jsx)(r.code,{children:`fire-red`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`/* New */
color: var(--color-fire-red);
color: var(--color-fire-red-8);

/* Deprecated */
color: var(--color-cherry-red);
color: var(--color-cherry-red-8);
`})}),`
`,(0,n.jsx)(r.h2,{children:`Icon changes`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`/* New */
import { download } from 'dnb-ui-lib/icons/secondary'

/* Removed */
import { error } from 'dnb-ui-lib/icons/primary'
import { save_alt_01 } from 'dnb-ui-lib/icons/secondary'
`})}),`
`,(0,n.jsx)(r.h2,{children:`ESM module format`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`dnb-ui-lib`}),` uses now `,(0,n.jsx)(r.code,{children:`ESM`}),` as the default module format. But every component is still compiled down to ES5.`]}),`
`,(0,n.jsx)(r.h3,{children:`Do I have to make changes?`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Mostly likely no`}),`. The majority of applications / projects does not to have to make changes.`]}),`
`,(0,n.jsxs)(r.p,{children:[`If you are in `,(0,n.jsx)(r.strong,{children:`Node.js`}),` (SSR) land, `,(0,n.jsx)(r.a,{href:`/uilib/usage/first-steps/module-formats#commonjs-cjs`,children:`read more about CJS`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`What is ESM good for?`}),`
`,(0,n.jsxs)(r.p,{children:[`Your project is most likely already using `,(0,n.jsx)(r.code,{children:`ESM`}),` (import / export). Now that the `,(0,n.jsx)(r.code,{children:`dnb-ui-lib`}),` uses `,(0,n.jsx)(r.code,{children:`ESM`}),`, `,(0,n.jsx)(r.a,{href:`/uilib/usage/first-steps/module-formats`,children:`tree shaking`}),` is much easier to handle and most likely be handled out of the box by your application bundler of choice (e.g. `,(0,n.jsx)(r.a,{href:`https://webpack.js.org`,children:`webpack`}),` (`,(0,n.jsx)(r.a,{href:`https://github.com/facebook/create-react-app`,children:`create-react-app`}),`), `,(0,n.jsx)(r.a,{href:`https://rollupjs.org/guide/en/`,children:`rollup.js`}),` and `,(0,n.jsx)(r.a,{href:`https://parceljs.org`,children:`parcel.js`}),`).`]}),`
`,(0,n.jsx)(r.h2,{children:`UMD changes`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`UMD`}),` package for icons `,(0,n.jsx)(r.code,{children:`dnb-ui-lib-icons.min.js`}),` got a new naming:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`dnb-ui-icons.min.js`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Install`}),`
`,(0,n.jsx)(r.p,{children:`To upgrade to v5 with NPM, use:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@5
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`October, 30. 2019`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};