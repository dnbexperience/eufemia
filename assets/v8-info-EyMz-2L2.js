import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`v8`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#migration`,children:`Migration`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#changes`,children:`Changes`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Migration`}),`
`,(0,n.jsxs)(r.p,{children:[`v8 contains a couple of `,(0,n.jsx)(r.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Find `,(0,n.jsx)(r.code,{children:`black-30`}),` and replace it with `,(0,n.jsx)(r.code,{children:`black-20`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Removed the undocumented icons package `,(0,n.jsx)(r.code,{children:`dnb-ui-icons-archive`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Find these icons and replace them:`}),`
`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`search`}),` to `,(0,n.jsx)(r.code,{children:`loupe`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`settings`}),` to `,(0,n.jsx)(r.code,{children:`cog`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`print`}),` to `,(0,n.jsx)(r.code,{children:`printer`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`pencil`}),` to `,(0,n.jsx)(r.code,{children:`edit`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`view_off`}),` to `,(0,n.jsx)(r.code,{children:`hide`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`file`}),` to `,(0,n.jsx)(r.code,{children:`document`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`file_add`}),` to `,(0,n.jsx)(r.code,{children:`document_add`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`contract`}),` to `,(0,n.jsx)(r.code,{children:`document_contract`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`link_out`}),` to `,(0,n.jsx)(r.code,{children:`launch`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`logout`}),` to `,(0,n.jsx)(r.code,{children:`log_out`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`login`}),` to `,(0,n.jsx)(r.code,{children:`log_in`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`without_bankid`}),` to `,(0,n.jsx)(r.code,{children:`pin_code`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`bankid_on_mobile`}),` to `,(0,n.jsx)(r.code,{children:`bankid_mobile`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`bankid_with_qr`}),` to `,(0,n.jsx)(r.code,{children:`bankid_qr`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`check_alt_01`}),` removed (use e.g. `,(0,n.jsx)(r.code,{children:`check`}),`)`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Changes`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Potential Breaking:`}),` If you have used a CSS var (custom property) (e.g. `,(0,n.jsx)(r.code,{children:`var(--input-text-color)`}),`) to change a components `,(0,n.jsx)(r.strong,{children:`color`}),` – then you would have to use the CSS color vars directly on the element (`,(0,n.jsx)(r.code,{children:`var(--color-sea-green)`}),`).`]}),`
`,(0,n.jsxs)(r.li,{children:[`The `,(0,n.jsx)(r.code,{children:`figure`}),` HTML got included in the CSS reset with a `,(0,n.jsx)(r.code,{children:`margin: 0`}),`.`]}),`
`,(0,n.jsx)(r.li,{children:`Add TypeScript type declarations for component PropTypes.`}),`
`,(0,n.jsxs)(r.li,{children:[`Add pure `,(0,n.jsx)(r.code,{children:`trigger`}),` property to `,(0,n.jsx)(r.a,{href:`/uilib/components/modal`,children:`Modal & Drawer`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Install`}),`
`,(0,n.jsx)(r.p,{children:`To upgrade to v8 with NPM, use:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@8
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`December, 15. 2020`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};