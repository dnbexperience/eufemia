import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-DLPIqIPy.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { ProgressIndicator } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The ProgressIndicator component shows a visual indicator during loading or processing states. Use it whenever the user has to wait for more than `,(0,i.jsx)(t.em,{children:`150ms`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It supports three types: `,(0,i.jsx)(t.code,{children:`circular`}),` (default), `,(0,i.jsx)(t.code,{children:`linear`}),`, and `,(0,i.jsx)(t.code,{children:`countdown`}),`. Each type can display either a `,(0,i.jsx)(t.strong,{children:`determinate`}),` state (with a known progress value) or an `,(0,i.jsx)(t.strong,{children:`indeterminate`}),` state (when the duration is unknown).`]}),`
`,(0,i.jsx)(t.p,{children:`This component is also known as: Indicator (Activity-Indicator), Loader (Pre-loader), Spinner.`}),`
`,(0,i.jsx)(t.h3,{children:`Determinate vs indeterminate`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Determinate`}),`: Use when the progress percentage is known (e.g. file uploads, multi-step processes). Set the `,(0,i.jsx)(t.code,{children:`progress`}),` prop to a value between `,(0,i.jsx)(t.code,{children:`0`}),` and `,(0,i.jsx)(t.code,{children:`100`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Indeterminate`}),`: Use when the duration is unknown (e.g. fetching data, waiting for a response). Omit the `,(0,i.jsx)(t.code,{children:`progress`}),` prop to show a continuous animation.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Types`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`circular`})}),` (default): A spinning ring. Works well inline or centered in a container. Supports label placement inside, horizontally, or vertically.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`linear`})}),`: A horizontal bar. Suited for wider layouts or when vertical space is limited. Common at the top of a page or section.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`countdown`})}),`: A circular variant that animates counterclockwise, useful for timers or session expiry indicators.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`show`}),` prop to control when the indicator appears and disappears. When `,(0,i.jsx)(t.code,{children:`show`}),` transitions to `,(0,i.jsx)(t.code,{children:`false`}),`, the indicator animates out and fires the `,(0,i.jsx)(t.code,{children:`onComplete`}),` callback once the exit animation finishes.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The component uses `,(0,i.jsx)(t.code,{children:`role="progressbar"`}),` with `,(0,i.jsx)(t.code,{children:`aria-valuenow`}),` for determinate states, giving screen readers the current progress.`]}),`
`,(0,i.jsxs)(t.li,{children:[`For indeterminate states, `,(0,i.jsx)(t.code,{children:`role="alert"`}),` is used to announce that loading is in progress.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Use the `,(0,i.jsx)(t.code,{children:`title`}),` prop to provide a descriptive accessible label (e.g. `,(0,i.jsx)(t.code,{children:`"Loading account details"`}),`).`]}),`
`,(0,i.jsxs)(t.li,{children:[`The `,(0,i.jsx)(t.code,{children:`showDefaultLabel`}),` prop adds a visible "In progress..." label, which also helps screen reader users understand the context.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`When to use`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Processing or loading states lasting more than 150ms.`}),`
`,(0,i.jsx)(t.li,{children:`File uploads, data fetching, or form submissions where the user needs feedback.`}),`
`,(0,i.jsxs)(t.li,{children:[`Timers or countdowns using the `,(0,i.jsx)(t.code,{children:`countdown`}),` type.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`When not to use`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`For full-page or section-level loading states, consider the `,(0,i.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` component instead.`]}),`
`,(0,i.jsx)(t.li,{children:`For processes lasting less than 150ms — no loading indicator is needed.`}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=21616-18893`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/progress-indicator`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/progress-indicator`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};