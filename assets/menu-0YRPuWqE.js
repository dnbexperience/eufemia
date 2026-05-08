import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-DC-86fRZ.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Menu } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`Menu provides an accessible dropdown menu for actions and navigation with a composable, tree-shakeable API.`}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`Menu.Root`}),` as the wrapper, `,(0,r.jsx)(n.code,{children:`Menu.Button`}),` for the trigger, `,(0,r.jsx)(n.code,{children:`Menu.List`}),` for the list container, `,(0,r.jsx)(n.code,{children:`Menu.Action`}),` for individual items, and `,(0,r.jsx)(n.code,{children:`Menu.Divider`}),` for visual separators.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Menu.Button`}),` supports all `,(0,r.jsx)(n.a,{href:`/uilib/components/button/properties`,children:`Button`}),` props (e.g. `,(0,r.jsx)(n.code,{children:`text`}),`, `,(0,r.jsx)(n.code,{children:`icon`}),`, `,(0,r.jsx)(n.code,{children:`variant`}),`, `,(0,r.jsx)(n.code,{children:`size`}),`, `,(0,r.jsx)(n.code,{children:`disabled`}),`), so you can customise the trigger the same way you would with a regular Button.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Nested menus are supported by nesting another `,(0,r.jsx)(n.code,{children:`Menu.Root`}),` inside `,(0,r.jsx)(n.code,{children:`Menu.List`}),` — use a `,(0,r.jsx)(n.code,{children:`Menu.Action`}),` as the direct child of the nested `,(0,r.jsx)(n.code,{children:`Menu.Root`}),` to serve as the sub-menu trigger.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For inline expandable groups, use `,(0,r.jsx)(n.code,{children:`Menu.Accordion`}),` instead of a nested `,(0,r.jsx)(n.code,{children:`Menu.Root`}),`. It reveals child items with a height animation inside the current menu, rather than opening a separate popover.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/menu`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/menu`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`The menu uses ARIA `,(0,r.jsx)(n.code,{children:`role="menu"`}),` and `,(0,r.jsx)(n.code,{children:`role="menuitem"`}),` semantics.`]}),`
`,(0,r.jsxs)(n.li,{children:[`The trigger receives `,(0,r.jsx)(n.code,{children:`aria-haspopup="menu"`}),` and `,(0,r.jsx)(n.code,{children:`aria-expanded`}),` attributes automatically.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Keyboard navigation follows the `,(0,r.jsx)(n.a,{href:`https://www.w3.org/WAI/ARIA/apd/patterns/menu/`,children:`WAI-ARIA Menu Pattern`}),`:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Arrow Up/Down`}),`: Move focus between items (wraps around).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Home/End`}),`: Jump to first/last item.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Enter/Space`}),`: Activate the focused item.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Escape`}),`: Close the menu.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Tab`}),`: Close the menu and move focus naturally.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Arrow Right`}),`: Open a sub-menu (when the item has one).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Arrow Left`}),`: Close a sub-menu and return to the parent.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.li,{children:`Type-ahead: pressing a letter key jumps to the first matching item.`}),`
`,(0,r.jsx)(n.li,{children:`Focus is moved to the menu container when it opens. Arrow keys then move focus to individual items. Focus returns to the trigger when the menu closes.`}),`
`,(0,r.jsxs)(n.li,{children:[`Disabled items receive `,(0,r.jsx)(n.code,{children:`aria-disabled`}),` and are skipped during keyboard navigation.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Dividers use `,(0,r.jsx)(n.code,{children:`role="separator"`}),`.`]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};