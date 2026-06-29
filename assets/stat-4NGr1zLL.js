import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./demos-BwVLMH10.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Stat } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat`}),` contains components for prominent values with a label, where typography and visual emphasis are part of the component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Available components`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Root`}),` renders a definition list (`,(0,i.jsx)(t.code,{children:`dl`}),`).`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Label`}),` renders descriptive text with dedicated typography and color for metric context (`,(0,i.jsx)(t.code,{children:`dt`}),`).`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Content`}),` renders the main value as a definition description (`,(0,i.jsx)(t.code,{children:`dd`}),`).`]}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Number`}),` is the base value formatter built on the `,(0,i.jsx)(t.a,{href:`/uilib/components/number-format/`,children:`NumberFormat`}),` formatting logic.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Currency`}),` and `,(0,i.jsx)(t.code,{children:`Stat.Percent`}),` are convenience wrappers around `,(0,i.jsx)(t.code,{children:`Stat.Number`}),`.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`It adds typography-specific properties such as `,(0,i.jsx)(t.code,{children:`fontSize`}),`, `,(0,i.jsx)(t.code,{children:`fontWeight`}),` and `,(0,i.jsx)(t.code,{children:`colorizeBySign`}),`, along with `,(0,i.jsx)(t.code,{children:`mainSize`}),` and `,(0,i.jsx)(t.code,{children:`auxiliarySize`}),` as well as `,(0,i.jsx)(t.code,{children:`mainWeight`}),` and `,(0,i.jsx)(t.code,{children:`auxiliaryWeight`}),` that can be used to customize the visual emphasis of the different parts of the value (currency symbol or percent sign).`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Trend`}),` renders explicit `,(0,i.jsx)(t.code,{children:`+`}),` / `,(0,i.jsx)(t.code,{children:`-`}),` indicators with red/green background states and screen-reader text.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Rating`}),` renders a star rating (defaults to 5 stars) and colorizes stars based on `,(0,i.jsx)(t.code,{children:`value`}),`. The `,(0,i.jsx)(t.code,{children:`max`}),` prop is clamped to `,(0,i.jsx)(t.code,{children:`20`}),` to prevent excessive DOM output; a console warning is emitted when the limit is exceeded.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Info`}),` renders supporting text with a smaller, muted style.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Inline`}),` is a horizontal layout container for grouping content elements like `,(0,i.jsx)(t.code,{children:`Stat.Trend`}),` and `,(0,i.jsx)(t.code,{children:`Stat.Info`}),` side by side with consistent spacing and alignment.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Text`}),` renders custom content and supports properties such as `,(0,i.jsx)(t.code,{children:`fontSize`}),`, `,(0,i.jsx)(t.code,{children:`fontWeight`}),`, and `,(0,i.jsx)(t.code,{children:`colorizeBySign`}),`.`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Stat.Root`}),` provides semantic definition-list markup (`,(0,i.jsx)(t.code,{children:`dl`}),`), where `,(0,i.jsx)(t.code,{children:`Stat.Label`}),` is rendered as `,(0,i.jsx)(t.code,{children:`dt`}),` and `,(0,i.jsx)(t.code,{children:`Stat.Content`}),` as `,(0,i.jsx)(t.code,{children:`dd`}),`.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`If the label also acts as a section heading, use a heading element inside `,(0,i.jsx)(t.code,{children:`Stat.Label`}),` (for example `,(0,i.jsx)(t.code,{children:`H3`}),`) to preserve a meaningful heading outline.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`srLabel`}),` to prepend context in the screen-reader text only, for example turning `,(0,i.jsx)(t.code,{children:`1,234 kr`}),` into `,(0,i.jsx)(t.code,{children:`Revenue 1,234 kr`}),` for screen readers.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`When e.g. `,(0,i.jsx)(t.code,{children:`signDisplay="always"`}),` is used, the sign is rendered as a separate visual element with CSS spacing, while the accessible text stays based on the formatted number string.`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[`All Stat variants keep dedicated accessibility handling. `,(0,i.jsx)(t.code,{children:`Currency`}),`, `,(0,i.jsx)(t.code,{children:`Percent`}),`, and `,(0,i.jsx)(t.code,{children:`Trend`}),` use a dedicated screen-reader value (`,(0,i.jsx)(t.code,{children:`.dnb-sr-only`}),`) based on the formatted content. `,(0,i.jsx)(t.code,{children:`Rating`}),` uses an accessible label (`,(0,i.jsx)(t.code,{children:`role="img"`}),` + `,(0,i.jsx)(t.code,{children:`aria-label`}),`) that includes value and max.`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/stat`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/stat`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};