import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-dxSawEiH.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Menu } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`Menu provides an accessible dropdown menu for actions and navigation with a composable, tree-shakeable API.`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`Menu.Root`}),` as the wrapper, `,(0,i.jsx)(t.code,{children:`Menu.Button`}),` for the trigger, `,(0,i.jsx)(t.code,{children:`Menu.List`}),` for the list container, `,(0,i.jsx)(t.code,{children:`Menu.Action`}),` for individual items, and `,(0,i.jsx)(t.code,{children:`Menu.Divider`}),` for visual separators.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Menu.Button`}),` supports all `,(0,i.jsx)(t.a,{href:`/uilib/components/button/properties`,children:`Button`}),` props (e.g. `,(0,i.jsx)(t.code,{children:`text`}),`, `,(0,i.jsx)(t.code,{children:`icon`}),`, `,(0,i.jsx)(t.code,{children:`variant`}),`, `,(0,i.jsx)(t.code,{children:`size`}),`, `,(0,i.jsx)(t.code,{children:`disabled`}),`), so you can customise the trigger the same way you would with a regular Button.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Nested menus are supported by nesting another `,(0,i.jsx)(t.code,{children:`Menu.Root`}),` inside `,(0,i.jsx)(t.code,{children:`Menu.List`}),` — use a `,(0,i.jsx)(t.code,{children:`Menu.Action`}),` as the direct child of the nested `,(0,i.jsx)(t.code,{children:`Menu.Root`}),` to serve as the sub-menu trigger.`]}),`
`,(0,i.jsxs)(t.p,{children:[`For inline expandable groups, use `,(0,i.jsx)(t.code,{children:`Menu.Accordion`}),` instead of a nested `,(0,i.jsx)(t.code,{children:`Menu.Root`}),`. It reveals child items with a height animation inside the current menu, rather than opening a separate popover.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/menu`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/menu`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The menu uses ARIA `,(0,i.jsx)(t.code,{children:`role="menu"`}),` and `,(0,i.jsx)(t.code,{children:`role="menuitem"`}),` semantics.`]}),`
`,(0,i.jsxs)(t.li,{children:[`The trigger receives `,(0,i.jsx)(t.code,{children:`aria-haspopup="menu"`}),` and `,(0,i.jsx)(t.code,{children:`aria-expanded`}),` attributes automatically.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Keyboard navigation follows the `,(0,i.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apd/patterns/menu/`,children:`WAI-ARIA Menu Pattern`}),`:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Arrow Up/Down`}),`: Move focus between items (wraps around).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Home/End`}),`: Jump to first/last item.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Enter/Space`}),`: Activate the focused item.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Escape`}),`: Close the menu.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Tab`}),`: Close the menu and move focus naturally.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Arrow Right`}),`: Open a sub-menu (when the item has one).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Arrow Left`}),`: Close a sub-menu and return to the parent.`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.li,{children:`Type-ahead: pressing a letter key jumps to the first matching item.`}),`
`,(0,i.jsx)(t.li,{children:`Focus is moved to the menu container when it opens. Arrow keys then move focus to individual items. Focus returns to the trigger when the menu closes.`}),`
`,(0,i.jsxs)(t.li,{children:[`Disabled items receive `,(0,i.jsx)(t.code,{children:`aria-disabled`}),` and are skipped during keyboard navigation.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Dividers use `,(0,i.jsx)(t.code,{children:`role="separator"`}),`.`]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};