import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{t as n}from"./spacing-table-5q8HRCuE.js";import{h as r,m as i,n as a,p as o,r as s,t as c}from"./Examples-CR981i5s.js";import l from"./demos-aMwrNC8n2.js";var u=e();function d(e){let l={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return a||p(`Examples`,!1),c||p(`Examples.Components`,!0),s||p(`Examples.FourDirections`,!0),o||p(`Examples.SameResult1`,!0),i||p(`Examples.SameResult2`,!0),r||p(`Examples.Shorthand`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.h2,{children:`Import`}),`
`,(0,u.jsx)(l.pre,{children:(0,u.jsx)(l.code,{className:`language-tsx`,children:`import { Space } from '@dnb/eufemia'
`})}),`
`,(0,u.jsx)(l.h2,{children:`Description`}),`
`,(0,u.jsxs)(l.p,{children:[`The Space component provides `,(0,u.jsx)(l.code,{children:`margins`}),` within the `,(0,u.jsx)(l.a,{href:`/uilib/usage/layout/spacing#spacing-helpers`,children:`provided spacing patterns`}),`.`]}),`
`,(0,u.jsx)(l.h2,{children:`Relevant links`}),`
`,(0,u.jsxs)(l.ul,{children:[`
`,(0,u.jsx)(l.li,{children:(0,u.jsx)(l.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/space`,children:`Source code`})}),`
`,(0,u.jsx)(l.li,{children:(0,u.jsx)(l.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/space`,children:`Docs code`})}),`
`]}),`
`,(0,u.jsx)(l.p,{children:`The reason this exists is to make your syntax as clean as possible. This way, you see directly in words what the spacing is for every affected component.`}),`
`,(0,u.jsx)(l.h3,{children:`Spacing Table`}),`
`,(0,u.jsx)(n,{}),`
`,(0,u.jsx)(l.h3,{children:`Value Format`}),`
`,(0,u.jsx)(l.p,{children:`There are a couple of different ways you can define the spacing types and values:`}),`
`,(0,u.jsxs)(l.ul,{children:[`
`,(0,u.jsxs)(l.li,{children:[(0,u.jsx)(l.strong,{children:`Types:`}),` `,(0,u.jsx)(l.code,{children:`small small x-small`}),` (combine types up to `,(0,u.jsx)(l.em,{children:`10rem`}),`)`]}),`
`,(0,u.jsxs)(l.li,{children:[(0,u.jsx)(l.strong,{children:`number:`}),` `,(0,u.jsx)(l.code,{children:`2.5`}),` (equivalent to `,(0,u.jsx)(l.code,{children:`rem`}),`)`]}),`
`,(0,u.jsxs)(l.li,{children:[(0,u.jsx)(l.strong,{children:`string(rem):`}),` `,(0,u.jsx)(l.code,{children:`2.5rem`})]}),`
`,(0,u.jsxs)(l.li,{children:[(0,u.jsx)(l.strong,{children:`string(px):`}),` `,(0,u.jsx)(l.code,{children:`40px`}),` (gets converted to `,(0,u.jsx)(l.code,{children:`rem`}),`)`]}),`
`,(0,u.jsxs)(l.li,{children:[(0,u.jsx)(l.strong,{children:`boolean:`}),` `,(0,u.jsx)(l.code,{children:`true`}),` (equivalent to `,(0,u.jsx)(l.code,{children:`small`}),`), `,(0,u.jsx)(l.code,{children:`false`}),` (equivalent to `,(0,u.jsx)(l.code,{children:`zero`}),`)`]}),`
`]}),`
`,(0,u.jsxs)(l.p,{children:[`To get a spacing of e.g. `,(0,u.jsx)(l.strong,{children:`2.5rem`}),` (40px), you may combine types `,(0,u.jsx)(l.code,{children:`large`}),` and `,(0,u.jsx)(l.code,{children:`x-small`}),`.`]}),`
`,(0,u.jsx)(o,{}),`
`,(0,u.jsx)(l.p,{children:`With React, you can also use an object with the different directions:`}),`
`,(0,u.jsx)(i,{}),`
`,(0,u.jsx)(l.h3,{children:`Components and Spacing`}),`
`,(0,u.jsxs)(l.p,{children:[`Every component supports the spacing patterns, so it's possible to send in the `,(0,u.jsx)(l.code,{children:`top`}),`, `,(0,u.jsx)(l.code,{children:`right`}),`, `,(0,u.jsx)(l.code,{children:`bottom`}),`, `,(0,u.jsx)(l.code,{children:`left`}),` and `,(0,u.jsx)(l.code,{children:`space`}),` properties directly, like:`]}),`
`,(0,u.jsx)(c,{}),`
`,(0,u.jsx)(l.h3,{children:`Spacing shorthands`}),`
`,(0,u.jsx)(l.p,{children:`A shorthand for getting 1rem (most used) is to simply send in a boolean set as true. No given value in JSX means true, so you only need the property key:`}),`
`,(0,u.jsx)(r,{}),`
`,(0,u.jsxs)(l.p,{children:[`In order to set all four directions at once, you can provide a string as the `,(0,u.jsx)(l.code,{children:`space`}),` value:`]}),`
`,(0,u.jsx)(s,{}),`
`,(0,u.jsx)(l.h3,{children:`Does it not work as expected?`}),`
`,(0,u.jsxs)(l.p,{children:[`Is `,(0,u.jsx)(l.code,{children:`margin`}),` not giving the expected spacing? That may be due to `,(0,u.jsx)(l.strong,{children:`Margin Collapsing`}),`. Margins collapse in the following situations:`]}),`
`,(0,u.jsxs)(l.ul,{children:[`
`,(0,u.jsx)(l.li,{children:`Adjacent siblings`}),`
`,(0,u.jsx)(l.li,{children:`Completely empty boxes`}),`
`,(0,u.jsx)(l.li,{children:`Parent and first or last child element`}),`
`]}),`
`,(0,u.jsxs)(l.p,{children:[`The best solution is to only use one direction of margins, e.g. `,(0,u.jsx)(l.code,{children:`bottom`}),`. Or you can set the `,(0,u.jsx)(l.a,{href:`/uilib/layout/space/properties`,children:`collapse property`}),` to `,(0,u.jsx)(l.code,{children:`false`}),`.`]}),`
`,(0,u.jsx)(l.h3,{children:`Margin collapsing`}),`
`,(0,u.jsxs)(l.p,{children:[`In order to help handle unwanted margin collapsing in typography elements, see `,(0,u.jsx)(l.a,{href:`/uilib/elements/heading#example-of-margin-collapsing`,children:`this example`}),`.`]}),`
`,(0,u.jsx)(l.h3,{children:`Conditional Reset`}),`
`,(0,u.jsxs)(l.p,{children:[`For resetting spacing (`,(0,u.jsx)(l.code,{children:`margin: 0`}),`) only when no spacing is defined, you can make use of `,(0,u.jsx)(l.code,{children:`dnb-space__reset`}),`.`]}),`
`,(0,u.jsx)(l.h3,{children:`Style and Spacing`}),`
`,(0,u.jsxs)(l.p,{children:[`Every Eufemia component that supports spacing props uses CSS custom properties (e.g. `,(0,u.jsx)(l.code,{children:`--margin-t-s`}),`) on the `,(0,u.jsx)(l.code,{children:`style`}),` attribute to drive responsive margins. When you pass a `,(0,u.jsx)(l.code,{children:`style`}),` prop to a component, your styles and the spacing styles are merged together — spacing properties take precedence.`]}),`
`,(0,u.jsx)(l.p,{children:`This means you can safely combine your own styles with spacing:`}),`
`,(0,u.jsx)(l.pre,{children:(0,u.jsx)(l.code,{className:`language-tsx`,children:`<Space style={{ color: 'var(--color-sea-green)' }} top="medium">
  ...
</Space>
`})}),`
`,(0,u.jsxs)(l.p,{children:[`If you work with raw DOM elements and set styles via `,(0,u.jsx)(l.code,{children:`setAttribute('style', ...)`}),`, make sure you preserve any existing style values when adding new ones, so the spacing custom properties are not lost.`]}),`
`,(0,u.jsx)(l.pre,{children:(0,u.jsx)(l.code,{className:`language-js`,children:`const existing = element.getAttribute('style')
const merged = existing
  ? \`\${existing.replace(/;?\\s*$/, '')}; \${style}\`
  : style
element.setAttribute('style', merged)
`})})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function m(e){return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{}),`
`,(0,u.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,u.jsx)(n,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}export{h as default};