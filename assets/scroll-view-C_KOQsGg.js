import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-DHCu7dhB.js";import r,{t as i}from"./demos-BC_-0hxw.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||c(`RelatedComponents`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { ScrollView } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(t.p,{children:`The previous fragment import remains available for backwards compatibility, but is deprecated and will be removed in v13:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`// Deprecated
import { ScrollView } from '@dnb/eufemia/fragments'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`ScrollView`}),` creates a general-purpose horizontal or vertical scrolling area. It renders a `,(0,a.jsx)(t.code,{children:`div`}),`, supports native `,(0,a.jsx)(t.code,{children:`div`}),` attributes and `,(0,a.jsx)(t.a,{href:`/uilib/layout/space/properties`,children:`spacing properties`}),`, and integrates with Eufemia components that need to identify their nearest scrolling container.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Use it when content must scroll independently from the page, for example when a region has a constrained width or height. Set the constraint through `,(0,a.jsx)(t.code,{children:`style`}),`, `,(0,a.jsx)(t.code,{children:`className`}),`, or a surrounding layout.`]}),`
`,(0,a.jsx)(t.p,{children:`For component-specific behavior, prefer the specialized variants:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`Use `,(0,a.jsx)(t.a,{href:`/uilib/components/table/`,children:(0,a.jsx)(t.code,{children:`Table.ScrollView`})}),` around tables.`]}),`
`,(0,a.jsxs)(t.li,{children:[`Use `,(0,a.jsx)(t.a,{href:`/uilib/components/list/`,children:(0,a.jsx)(t.code,{children:`List.ScrollView`})}),` around lists, including when using `,(0,a.jsx)(t.code,{children:`maxVisibleListItems`}),`.`]}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`Dialog`}),` and `,(0,a.jsx)(t.code,{children:`Drawer`}),` already use `,(0,a.jsx)(t.code,{children:`ScrollView`}),` internally, so they normally do not need another one around their content.`]}),`
`,(0,a.jsx)(i,{}),`
`,(0,a.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,a.jsxs)(t.p,{children:[`A scrollable region must be reachable by keyboard when it contains no other focusable elements. Use `,(0,a.jsx)(t.code,{children:`interactive="auto"`}),` to add it to the tab order only while it overflows. Use `,(0,a.jsx)(t.code,{children:`interactive={true}`}),` when it must always be keyboard-focusable.`]}),`
`,(0,a.jsxs)(t.p,{children:[`When the region needs an accessible name, provide `,(0,a.jsx)(t.code,{children:`aria-label`}),` or `,(0,a.jsx)(t.code,{children:`aria-labelledby`}),`. Avoid unnecessary nested scrolling areas because they can make keyboard and touch navigation difficult.`]}),`
`,(0,a.jsx)(t.h2,{children:`Scrollbar gutter`}),`
`,(0,a.jsxs)(t.p,{children:[`Use `,(0,a.jsx)(t.code,{children:`scrollbarGutter="stable"`}),` to reserve space for the scrollbar, preventing horizontal layout shifts when content dynamically changes between overflowing and non-overflowing states.`]}),`
`,(0,a.jsxs)(t.p,{children:[`This maps to `,(0,a.jsx)(t.code,{children:`scrollbar-gutter: stable`}),`. It has no visible effect on systems using overlay scrollbars, such as the default configuration on macOS and iOS. `,(0,a.jsx)(t.code,{children:`Dialog`}),` and `,(0,a.jsx)(t.code,{children:`Drawer`}),` enable it automatically by default.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/scroll-view`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/scroll-view`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(r,{})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(r,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};