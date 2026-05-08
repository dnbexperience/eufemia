import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BbIVyQoH.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Stat } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat`}),` contains components for prominent values with a label, where typography and visual emphasis are part of the component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Available components`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Root`}),` renders a definition list (`,(0,r.jsx)(n.code,{children:`dl`}),`).`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Label`}),` renders descriptive text with dedicated typography and color for metric context (`,(0,r.jsx)(n.code,{children:`dt`}),`).`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Content`}),` renders the main value as a definition description (`,(0,r.jsx)(n.code,{children:`dd`}),`).`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Number`}),` is the base value formatter built on the `,(0,r.jsx)(n.a,{href:`/uilib/components/number-format/`,children:`NumberFormat`}),` formatting logic.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Currency`}),` and `,(0,r.jsx)(n.code,{children:`Stat.Percent`}),` are convenience wrappers around `,(0,r.jsx)(n.code,{children:`Stat.Number`}),`.`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`It adds typography-specific properties such as `,(0,r.jsx)(n.code,{children:`fontSize`}),`, `,(0,r.jsx)(n.code,{children:`fontWeight`}),` and `,(0,r.jsx)(n.code,{children:`colorizeBySign`}),`, along with `,(0,r.jsx)(n.code,{children:`mainSize`}),` and `,(0,r.jsx)(n.code,{children:`auxiliarySize`}),` as well as `,(0,r.jsx)(n.code,{children:`mainWeight`}),` and `,(0,r.jsx)(n.code,{children:`auxiliaryWeight`}),` that can be used to customize the visual emphasis of the different parts of the value (currency symbol or percent sign).`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Trend`}),` renders explicit `,(0,r.jsx)(n.code,{children:`+`}),` / `,(0,r.jsx)(n.code,{children:`-`}),` indicators with red/green background states and screen-reader text.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Rating`}),` renders a star rating (defaults to 5 stars) and colorizes stars based on `,(0,r.jsx)(n.code,{children:`value`}),`. The `,(0,r.jsx)(n.code,{children:`max`}),` prop is clamped to `,(0,r.jsx)(n.code,{children:`20`}),` to prevent excessive DOM output; a console warning is emitted when the limit is exceeded.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Info`}),` renders supporting text with a smaller, muted style.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Inline`}),` is a horizontal layout container for grouping content elements like `,(0,r.jsx)(n.code,{children:`Stat.Trend`}),` and `,(0,r.jsx)(n.code,{children:`Stat.Info`}),` side by side with consistent spacing and alignment.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Text`}),` renders custom content and supports properties such as `,(0,r.jsx)(n.code,{children:`fontSize`}),`, `,(0,r.jsx)(n.code,{children:`fontWeight`}),`, and `,(0,r.jsx)(n.code,{children:`colorizeBySign`}),`.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Stat.Root`}),` provides semantic definition-list markup (`,(0,r.jsx)(n.code,{children:`dl`}),`), where `,(0,r.jsx)(n.code,{children:`Stat.Label`}),` is rendered as `,(0,r.jsx)(n.code,{children:`dt`}),` and `,(0,r.jsx)(n.code,{children:`Stat.Content`}),` as `,(0,r.jsx)(n.code,{children:`dd`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`If the label also acts as a section heading, use a heading element inside `,(0,r.jsx)(n.code,{children:`Stat.Label`}),` (for example `,(0,r.jsx)(n.code,{children:`H3`}),`) to preserve a meaningful heading outline.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`srLabel`}),` to prepend context in the screen-reader text only, for example turning `,(0,r.jsx)(n.code,{children:`1,234 kr`}),` into `,(0,r.jsx)(n.code,{children:`Revenue 1,234 kr`}),` for screen readers.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`When e.g. `,(0,r.jsx)(n.code,{children:`signDisplay="always"`}),` is used, the sign is rendered as a separate visual element with CSS spacing, while the accessible text stays based on the formatted number string.`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[`All Stat variants keep dedicated accessibility handling. `,(0,r.jsx)(n.code,{children:`Currency`}),`, `,(0,r.jsx)(n.code,{children:`Percent`}),`, and `,(0,r.jsx)(n.code,{children:`Trend`}),` use a dedicated screen-reader value (`,(0,r.jsx)(n.code,{children:`.dnb-sr-only`}),`) based on the formatted content. `,(0,r.jsx)(n.code,{children:`Rating`}),` uses an accessible label (`,(0,r.jsx)(n.code,{children:`role="img"`}),` + `,(0,r.jsx)(n.code,{children:`aria-label`}),`) that includes value and max.`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/stat`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/stat`,children:`Docs code`})}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};