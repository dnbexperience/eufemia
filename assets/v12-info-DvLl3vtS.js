import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v12`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#v12`,children:`v12`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#migration`,children:`Migration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`Install`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#component-changes`,children:`Component changes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#accordion`,children:`Accordion`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#modal-dialog-and-drawer`,children:`Modal, Dialog and Drawer`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#infocard`,children:`InfoCard`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#popover`,children:`Popover`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Migration`}),`
`,(0,r.jsxs)(t.p,{children:[`v12 of @dnb/eufemia contains `,(0,r.jsx)(t.em,{children:`breaking changes`}),`. As a migration process, you can simply search and replace:`]}),`
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to @dnb/eufemia v12 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i @dnb/eufemia@12
# or
$ yarn add @dnb/eufemia@12
`})}),`
`,(0,r.jsx)(t.h2,{children:`Component changes`}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/accordion/`,children:`Accordion`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`id`}),` with `,(0,r.jsx)(t.code,{children:`connectedTo`}),` on `,(0,r.jsx)(t.code,{children:`Accordion.Content`}),` when connecting to a standalone tertiary button.`]}),`
`]}),`
`,(0,r.jsxs)(t.h3,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/modal/`,children:`Modal`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/components/dialog/`,children:`Dialog`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/drawer/`,children:`Drawer`})]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`closeButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`closeButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Drawer closeButtonAttributes={{ text: 'Custom text' }} />
+<Drawer closeButtonProps={{ text: 'Custom text' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`triggerAttributes`}),` with `,(0,r.jsx)(t.code,{children:`triggerProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Dialog triggerAttributes={{ text: 'Open', variant: 'primary' }} />
+<Dialog triggerProps={{ text: 'Open', variant: 'primary' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`ModalTriggerAttributes`}),` type has been removed. Use `,(0,r.jsx)(t.code,{children:`ButtonProps`}),` from `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),` instead.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/info-card/`,children:`InfoCard`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`closeButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`closeButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<InfoCard closeButtonAttributes={{ href: '/path' }} />
+<InfoCard closeButtonProps={{ href: '/path' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`acceptButtonAttributes`}),` with `,(0,r.jsx)(t.code,{children:`acceptButtonProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<InfoCard acceptButtonAttributes={{ href: '/path' }} />
+<InfoCard acceptButtonProps={{ href: '/path' }} />
`})}),`
`,(0,r.jsx)(t.h3,{children:(0,r.jsx)(t.a,{href:`/uilib/components/popover/`,children:`Popover`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Replace `,(0,r.jsx)(t.code,{children:`triggerAttributes`}),` with `,(0,r.jsx)(t.code,{children:`triggerProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`-<Popover triggerAttributes={{ 'aria-haspopup': 'menu' }} />
+<Popover triggerProps={{ 'aria-haspopup': 'menu' }} />
`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`The `,(0,r.jsx)(t.code,{children:`PopoverTriggerAttributes`}),` type has been removed. Use `,(0,r.jsx)(t.code,{children:`triggerProps`}),` instead.`]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};