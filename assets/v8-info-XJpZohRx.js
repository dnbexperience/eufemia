import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v8`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#changes`,children:`Changes`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsxs)(t.p,{children:[`v8 contains a couple of `,(0,r.jsx)(t.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Find `,(0,r.jsx)(t.code,{children:`black-30`}),` and replace it with `,(0,r.jsx)(t.code,{children:`black-20`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed the undocumented icons package `,(0,r.jsx)(t.code,{children:`dnb-ui-icons-archive`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Find these icons and replace them:`}),`
`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`search`}),` to `,(0,r.jsx)(t.code,{children:`loupe`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`settings`}),` to `,(0,r.jsx)(t.code,{children:`cog`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`print`}),` to `,(0,r.jsx)(t.code,{children:`printer`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`pencil`}),` to `,(0,r.jsx)(t.code,{children:`edit`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`view_off`}),` to `,(0,r.jsx)(t.code,{children:`hide`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`file`}),` to `,(0,r.jsx)(t.code,{children:`document`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`file_add`}),` to `,(0,r.jsx)(t.code,{children:`document_add`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`contract`}),` to `,(0,r.jsx)(t.code,{children:`document_contract`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`link_out`}),` to `,(0,r.jsx)(t.code,{children:`launch`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`logout`}),` to `,(0,r.jsx)(t.code,{children:`log_out`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`login`}),` to `,(0,r.jsx)(t.code,{children:`log_in`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`without_bankid`}),` to `,(0,r.jsx)(t.code,{children:`pin_code`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`bankid_on_mobile`}),` to `,(0,r.jsx)(t.code,{children:`bankid_mobile`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`bankid_with_qr`}),` to `,(0,r.jsx)(t.code,{children:`bankid_qr`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`check_alt_01`}),` removed (use e.g. `,(0,r.jsx)(t.code,{children:`check`}),`)`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Changes`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Potential Breaking:`}),` If you have used a CSS var (custom property) (e.g. `,(0,r.jsx)(t.code,{children:`var(--input-text-color)`}),`) to change a components `,(0,r.jsx)(t.strong,{children:`color`}),` – then you would have to use the CSS color vars directly on the element (`,(0,r.jsx)(t.code,{children:`var(--color-sea-green)`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`figure`}),` HTML got included in the CSS reset with a `,(0,r.jsx)(t.code,{children:`margin: 0`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Add TypeScript type declarations for component PropTypes.`}),`
`,(0,r.jsxs)(t.li,{children:[`Add pure `,(0,r.jsx)(t.code,{children:`trigger`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/components/modal`,children:`Modal & Drawer`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to v8 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@8
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`December, 15. 2020`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};