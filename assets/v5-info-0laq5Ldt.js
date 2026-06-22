import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v5`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#typography-preparations`,children:`Typography preparations`}),` `,(0,r.jsx)(t.strong,{children:`(feature)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#number-component`,children:`Number component`}),` `,(0,r.jsx)(t.strong,{children:`(feature)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#color-changes`,children:`Color changes`}),` `,(0,r.jsx)(t.strong,{children:`(major change)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#icon-changes`,children:`Icon changes`}),` `,(0,r.jsx)(t.strong,{children:`(major change)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#esm-module-format`,children:`ESM module format`}),` `,(0,r.jsx)(t.strong,{children:`(major change)`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#umd-changes`,children:`UMD changes`}),` `,(0,r.jsx)(t.strong,{children:`(major change)`})]}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`How to Install`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsx)(t.p,{children:`v5 contains a couple of breaking changes. As a migration process, you can simply search your application for:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`save_alt_01`}),` and replace it with `,(0,r.jsx)(t.code,{children:`save`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`--color-cherry-red`}),` or `,(0,r.jsx)(t.code,{children:`--color-cherry-red-8`}),` and replace it with `,(0,r.jsx)(t.code,{children:`--color-fire-red`}),` and `,(0,r.jsx)(t.code,{children:`--color-fire-red-8`})]}),`
`,(0,r.jsxs)(t.li,{children:[`find `,(0,r.jsx)(t.code,{children:`dnb-ui-lib-icons.min.js`}),` and replace it with `,(0,r.jsx)(t.code,{children:`dnb-ui-icons.min.js`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Typography preparations`}),`
`,(0,r.jsxs)(t.p,{children:[`Soon we will have our own `,(0,r.jsx)(t.em,{children:`DNB font`}),`. This will have an impact on `,(0,r.jsx)(t.code,{children:`font-family`}),`, `,(0,r.jsx)(t.code,{children:`font-size`}),`, `,(0,r.jsx)(t.code,{children:`font-weight`}),` and `,(0,r.jsx)(t.code,{children:`line-height`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`To prepare for these changes, you can already today (since `,(0,r.jsx)(t.code,{children:`v4.24`}),`) use the now exposed properties for both:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/font-size`,children:`font-size`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`/uilib/typography/line-height`,children:`line-height`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Previously, we had `,(0,r.jsx)(t.a,{href:`/uilib/typography/font-weight`,children:`font-weight`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more on how to make CSS vars (Custom Properties) `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/polyfill`,children:`work on IE`}),`.`]}),`
`,(0,r.jsx)(t.h3,{children:`The benefits?`}),`
`,(0,r.jsx)(t.p,{children:`If you are using only properties to change actively your application typography, then a future update with changes will "automatically" happen, so you don't need to make manual code changes later.`}),`
`,(0,r.jsx)(t.h3,{children:`Properties as JS`}),`
`,(0,r.jsxs)(t.p,{children:[`You can now also import all the main properties as a `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/polyfill#css-in-js`,children:`JavaScript Object`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import properties from 'dnb-ui-lib/style/properties
`})}),`
`,(0,r.jsx)(t.h2,{children:`Number component`}),`
`,(0,r.jsxs)(t.p,{children:[`The new `,(0,r.jsx)(t.a,{href:`/uilib/components/number-format`,children:`Number component`}),` is a ready-to-use DNB number formatter. Use it wherever you have to display a number, a currency value, phone number, etc.`]}),`
`,(0,r.jsx)(t.p,{children:`Good reasons for why we have this are to:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`standardize the formatting of numbers for all DNB applications.`}),`
`,(0,r.jsx)(t.li,{children:`and make numbers accessible to screen readers.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Color changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.em,{children:`Cherry Red`}),` will be replaced by `,(0,r.jsx)(t.em,{children:`Fire Red`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.em,{children:`Cherry Red 8%`}),` will be replaced by `,(0,r.jsx)(t.em,{children:`Fire Red 8%`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`You may check your application code and `,(0,r.jsx)(t.strong,{children:`replace`}),` `,(0,r.jsx)(t.code,{children:`cherry-red`}),` with `,(0,r.jsx)(t.code,{children:`fire-red`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`/* New */
color: var(--color-fire-red);
color: var(--color-fire-red-8);

/* Deprecated */
color: var(--color-cherry-red);
color: var(--color-cherry-red-8);
`})}),`
`,(0,r.jsx)(t.h2,{children:`Icon changes`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`/* New */
import { download } from 'dnb-ui-lib/icons/secondary'

/* Removed */
import { error } from 'dnb-ui-lib/icons/primary'
import { save_alt_01 } from 'dnb-ui-lib/icons/secondary'
`})}),`
`,(0,r.jsx)(t.h2,{children:`ESM module format`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`dnb-ui-lib`}),` uses now `,(0,r.jsx)(t.code,{children:`ESM`}),` as the default module format. But every component is still compiled down to ES5.`]}),`
`,(0,r.jsx)(t.h3,{children:`Do I have to make changes?`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Most likely no`}),`. The majority of applications / projects does not have to make changes.`]}),`
`,(0,r.jsxs)(t.p,{children:[`If you are in `,(0,r.jsx)(t.strong,{children:`Node.js`}),` (SSR) land, `,(0,r.jsx)(t.a,{href:`/uilib/usage/first-steps/module-formats#commonjs-cjs`,children:`read more about CJS`}),`.`]}),`
`,(0,r.jsx)(t.h3,{children:`What is ESM good for?`}),`
`,(0,r.jsxs)(t.p,{children:[`Your project is most likely already using `,(0,r.jsx)(t.code,{children:`ESM`}),` (import / export). Now that the `,(0,r.jsx)(t.code,{children:`dnb-ui-lib`}),` uses `,(0,r.jsx)(t.code,{children:`ESM`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/usage/first-steps/module-formats`,children:`tree shaking`}),` is much easier to handle and most likely be handled out of the box by your application bundler of choice (e.g. `,(0,r.jsx)(t.a,{href:`https://webpack.js.org`,children:`webpack`}),` (`,(0,r.jsx)(t.a,{href:`https://github.com/facebook/create-react-app`,children:`create-react-app`}),`), `,(0,r.jsx)(t.a,{href:`https://rollupjs.org/guide/en/`,children:`rollup.js`}),` and `,(0,r.jsx)(t.a,{href:`https://parceljs.org`,children:`parcel.js`}),`).`]}),`
`,(0,r.jsx)(t.h2,{children:`UMD changes`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`UMD`}),` package for icons `,(0,r.jsx)(t.code,{children:`dnb-ui-lib-icons.min.js`}),` got a new naming:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`dnb-ui-icons.min.js`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to v5 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@5
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`October, 30. 2019`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};